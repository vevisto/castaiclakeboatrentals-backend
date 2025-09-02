import moment from "moment";
import mongoose from "mongoose";
import Stripe from 'stripe';
import { SendResponse } from "../lib/SendReponse.js";
import { Inventory } from "../models/Inventory.model.js";
import { Boat } from "../models/boat.model.js";
import { Booking } from "../models/booking.model.js";
import { Customer } from "../models/customer.model.js";
import { sendBookingEmailWithPDF } from "../services/emails.service.js";
import { generateBookingPDF } from "../services/pdf.service.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  const bookingData = Array.isArray(req.body) ? req.body[0] : req.body;

  try {
    const {
      userId,
      boatId,
      boatType,
      rentalDate,
      amountPaid,
      depositAmount,
      inventory,
      rentTime,
      guestCount,
      isAdmin, // only available if passed
    } = bookingData;

    // ✅ Get user information first (needed for PDF and email)
    const user = await Customer.findById(userId);
    if (!user) {
      return SendResponse(res, 404, "User not found");
    }

    session.startTransaction();

    // ✅ Rule: Restrict non-admin bookings after 10PM
    if (!isAdmin) {
      const now = moment();
      const cutoffTime = moment().set({ hour: 20, minute: 0, second: 0, millisecond: 0 }); // today 10PM
      const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");

      if (now.isAfter(cutoffTime)) {
        if (
          rentalDate === tomorrow &&
          (rentTime === "full_day" || rentTime === "half_day_morning")
        ) {
          await session.abortTransaction();
          session.endSession();
          return SendResponse(
            res,
            400,
            "Full-day and half-day morning bookings cannot be made after 10 PM. To secure a morning booking later, please contact us by phone or text."
          );
        }
      }
    }

    // ✅ FIXED: Check if boat is already booked for same date & time slot (EXCLUDE cancelled bookings)
    const existingBooking = await Booking.findOne({
      boatId,
      rentalDate,
      rentTime,
      status: { $in: ['pending', 'confirmed'] } // Only check active bookings
    });

    if (existingBooking) {
      await session.abortTransaction();
      session.endSession();
      return SendResponse(res, 400, "Boat already booked for this date and time slot");
    }

    // ✅ Additional check for conflicting time slots (full day vs half day)
    const conflictingBookings = await Booking.find({
      boatId,
      rentalDate,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        ...(rentTime === 'full_day' ? [{}] : []),
        { rentTime: 'full_day' },
        { rentTime: rentTime }
      ]
    });

    if (conflictingBookings.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return SendResponse(res, 400, "Boat already booked for this date and time slot");
    }

    // ✅ Step 1: Validate inventory before proceeding
    for (const item of inventory) {
      const { productId, quantity } = item;
      if (!productId || !quantity || quantity < 1) {
        await session.abortTransaction();
        session.endSession();
        return SendResponse(res, 400, "Invalid inventory item or quantity");
      }

      const existingItem = await Inventory.findById(productId);
      if (!existingItem) {
        await session.abortTransaction();
        session.endSession();
        return SendResponse(res, 400, `Inventory item ${productId} not found`);
      }
    }

    // ✅ Step 2: Create payment intent FIRST
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountPaid * 100,
      currency: "usd",
      metadata: {
        boatId,
        userId,
        rentalDate,
        rentTime
      },
      automatic_payment_methods: { enabled: true },
    });

    // Commit transaction temporarily to release locks
    await session.commitTransaction();
    session.endSession();

    // Return payment intent to frontend for payment processing
    return SendResponse(res, 200, "Payment intent created successfully", {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
// ✅ NEW FUNCTION: Confirm booking after successful payment
export const confirmBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return SendResponse(res, 400, "Payment intent ID is required");
    }

    // ✅ Step 1: Verify payment was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return SendResponse(res, 400, "Payment was not successful");
    }

    // ✅ Step 2: Extract booking data from payment metadata
    const { boatId, userId, rentalDate, rentTime } = paymentIntent.metadata;

    // Get the original booking request data (you might want to store this temporarily)
    // For now, I'll assume you have a way to retrieve the original booking data
    // You could store it in Redis, database temp table, or pass it again in the request

    const {
      boatType,
      amountPaid,
      depositAmount,
      inventory,
      guestCount,
      isAdmin
    } = req.body.bookingData; // Assuming frontend sends this again

    session.startTransaction();

    // ✅ FIXED: Double-check boat availability (EXCLUDE cancelled bookings)
    const existingBooking = await Booking.findOne({
      boatId,
      rentalDate,
      rentTime,
      status: { $in: ['pending', 'confirmed'] } // Only check active bookings
    });

    if (existingBooking) {
      await session.abortTransaction();
      session.endSession();
      return SendResponse(res, 400, "Boat was booked by someone else during payment");
    }

    // ✅ Additional check for conflicting time slots (full day vs half day)
    const conflictingBookings = await Booking.find({
      boatId,
      rentalDate,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        // If booking full day, check for any existing booking
        ...(rentTime === 'full_day' ? [{}] : []),
        // If existing full day booking, conflict with any new booking
        { rentTime: 'full_day' },
        // If booking same half-day slot
        { rentTime: rentTime }
      ]
    });

    if (conflictingBookings.length > 0) {
      await session.abortTransaction();
      session.endSession();
      return SendResponse(res, 400, "Boat was booked by someone else during payment");
    }

    // ✅ Step 4: Deduct inventory and collect detailed inventory info for email
    const inventoryDetails = [];

    for (const item of inventory) {
      const { productId, quantity } = item;

      const existingItem = await Inventory.findById(productId).session(session);
      if (!existingItem) {
        await session.abortTransaction();
        session.endSession();
        return SendResponse(res, 400, `Inventory item ${productId} not found`);
      }

      // Store inventory details for email
      inventoryDetails.push({
        name: existingItem.name || existingItem.productName || 'Unknown Item',
        quantity: quantity,
        price: existingItem.price || 0,
        description: existingItem.description || '',
        category: existingItem.category || ''
      });

      let shortage = 0;

      if (existingItem.totalStock >= quantity) {
        existingItem.totalStock -= quantity;
      } else {
        shortage = quantity - existingItem.totalStock;
        existingItem.totalStock = 0;
        existingItem.extraStock += shortage;
      }

      await existingItem.save({ session });
    }

    // ✅ Step 5: Create booking with confirmed payment
    const booking = await Booking.create(
      [
        {
          userId,
          boatId,
          boatType,
          rentalDate,
          amountPaid: paymentIntent.amount / 100, // Convert from cents
          depositAmount,
          stripePaymentIntentId: paymentIntentId,
          paymentStatus: "paid",
          inventory,
          rentTime,
          guestCount,
          isAdmin: isAdmin || false,
        },
      ],
      { session }
    );

    // ✅ Step 6: Update boat status to booked and set rental details
    await Boat.findByIdAndUpdate(
      boatId,
      {
        $set: {
          status: "booked",
          rentDate: rentalDate,
          rentTime: rentTime
        }
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // ✅ Step 7: Send confirmation email with PDF including inventory data
    const user = await Customer.findById(userId);
    const boat = await Boat.findById(boatId).select("name");

    // Create booking data with inventory details for PDF generation
    const bookingWithInventoryDetails = {
      ...booking[0]._doc,
      inventoryDetails: inventoryDetails
    };

    const pdfPath = await generateBookingPDF(bookingWithInventoryDetails, user, boat);

    // Create detailed inventory list for email body
    const inventoryList = inventoryDetails.map(item =>
      `• ${item.name} (Qty: ${item.quantity}${item.price > 0 ? ` - $${item.price.toFixed(2)} each` : ''})`
    ).join('\n');

    const emailSubject = `Hi ${user.firstName || "Customer"}, your booking for ${boatType} on ${rentalDate} is confirmed. Thank you for choosing us!`;

    const emailBody = `Please find attached your booking receipt.

Booking Details:
- Boat: ${boatType}
- Date: ${rentalDate}
- Time: ${rentTime.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
- Guest Count: ${guestCount}

Included Equipment & Services:
${inventoryList}

We look forward to providing you with an amazing experience!`;

    await sendBookingEmailWithPDF(
      user.email,
      emailSubject,
      emailBody,
      pdfPath
    );

    return SendResponse(res, 201, "Booking created successfully", {
      booking: booking[0],
      inventoryDetails: inventoryDetails
    });

  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(err);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelNote } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return SendResponse(res, 404, "Booking not found");
    }

    if (booking.status === "cancelled") {
      return SendResponse(res, 400, "Booking already cancelled");
    }

    // ✅ Cancel booking
    booking.status = "cancelled";
    booking.cancelNote = cancelNote || "Booking cancelled";

    await booking.save();

    // ✅ Restore inventory if needed
    if (booking.inventory && booking.inventory.length > 0) {
      for (let item of booking.inventory) {
        const inventory = await Inventory.findById(item.productId);
        if (inventory) {
          inventory.quantity += item.quantity;
          await inventory.save();
        }
      }
    }
    await Boat.findByIdAndUpdate(booking.boatId, { $set: { status: "idle" } });
    SendResponse(res, 200, "Booking cancelled successfully", booking);
  } catch (err) {
    console.error(err);
    SendResponse(res, 500, false, "Error cancelling booking", err.message);
  }
};




export const checkBoatAvailability = async (req, res) => {
  try {
    const { date, rentTime = "full_day", isAdmin = false } = req.query;

    if (!date || !rentTime) {
      return SendResponse(res, 200, "Date and rentTime are required");
    }

    if (!isAdmin) {
      const now = moment();
      const cutoffTime = moment().set({ hour: 22, minute: 0, second: 0, millisecond: 0 }); // today 10 PM
      const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");

      if (now.isAfter(cutoffTime)) {
        if (date === tomorrow && (rentTime === "full_day" || rentTime === "half_day_morning")) {
          return SendResponse(res, 200, "Full-day and half-day morning bookings cannot be made after 10 PM. To secure a morning booking later, please contact us by phone or text.");
        }
      }
    }

    // ✅ FIXED: Only get ACTIVE bookings (not cancelled ones)
    const bookings = await Booking.find({
      rentalDate: date,
      status: { $in: ['pending', 'confirmed'] } // Exclude cancelled bookings
    });

    // Step 2: Get all boats
    const allBoats = await Boat.find();

    // Step 3: Check each boat's availability
    const result = allBoats.map(boat => {
      const boatBookings = bookings.filter(
        b => b.boatId?.toString() === boat._id.toString()
      );

      let isAvailable = true;

      for (let b of boatBookings) {
        if (rentTime === "full_day") {
          isAvailable = false;
          break;
        }
        if (b.rentTime === "full_day") {
          isAvailable = false;
          break;
        }
        if (
          (rentTime === "half_day_morning" && b.rentTime === "half_day_morning") ||
          (rentTime === "half_day_evening" && b.rentTime === "half_day_evening")
        ) {
          isAvailable = false;
          break;
        }
      }

      return {
        boatName: boat.name,
        boatCategory: boat.category || "N/A",
        rentTime: isAvailable ? rentTime : boatBookings[0]?.rentTime,
        status: isAvailable ? "available" : "booked",
        images: boat.images || [],
        boatArea: boat.boatArea || "N/A",
        boatEngine: boat.boatEngine || "N/A",
        fullDayPrice: boat.fullDayPrice || "N/A",
        halfDayPrice: boat.halfDayPrice || "N/A",
        perfectFor: boat.perfectFor || "N/A",
        _id: boat._id
      };
    });

    // Step 4: Filter available boats
    const availableBoats = result.filter(boat => boat.status === "available");

    if (availableBoats.length === 0) {
      return SendResponse(res, 201, "No boats available for this time. Please select another date");
    }

    SendResponse(res, 200, "Available boats fetched successfully", availableBoats);
  } catch (err) {
    console.error(err);
    SendResponse(res, 500, false, "Error checking availability", err.message);
  }
};



export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    SendResponse(res, 201, 'Customer created successfully', customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    SendResponse(res, 500, false, null, 'Internal server error');
  }
};



// ✅ GET All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("boatId")
      .populate({
        path: "inventory.productId",
        populate: [
          { path: "category" },
          { path: "productType" }
        ]
      })
      .populate("checkInDetails")
      .populate("checkOutDetails")
      .sort({ createdAt: -1 });

    SendResponse(res, 200, "All bookings fetched successfully", bookings);
  } catch (err) {
    console.log(err);
    SendResponse(res, 500, "Error fetching bookings", err.message);
  }
};




export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("userId").populate("boatId");
    SendResponse(res, 200, "Booking fetched successfully", booking);
  } catch (err) {
    SendResponse(res, 500, false, "Error fetching booking", err.message);
  }
}

export const getAllBookingOnlyDate = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .select("rentalDate")
    SendResponse(res, 200, "All bookings fetched successfully", bookings);
  } catch (err) {
    SendResponse(res, 500, false, "Error fetching bookings", err.message);
  }
}

// ✅ GET Bookings by Customer
export const getBookingsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const bookings = await Booking.find({ userId: customerId }).populate("boatId");
    SendResponse(res, 200, true, "Bookings fetched successfully", bookings);
  } catch (err) {
    SendResponse(res, 500, false, "Error fetching user's bookings", err.message);
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    const customerIds = customers.map(c => c._id);

    const bookings = await Booking.find({ userId: { $in: customerIds } })
      .populate('boatId')
      .populate('inventory.productId')
      .sort({ createdAt: -1 });

    const customersWithBookings = customers.map(customer => ({
      ...customer.toObject(),
      bookings: bookings.filter(b => b.userId.toString() === customer._id.toString())
    }));

    SendResponse(res, 200, "Customers with bookings fetched successfully", customersWithBookings);
  } catch (err) {
    SendResponse(res, 500, false, "Error fetching customers with bookings", err.message);
  }
};
