import { SendResponse } from "../lib/SendReponse.js";
import { Booking } from "../models/booking.model.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

export const refundDeposit = async (req, res) => {
  try {
    const { bookingId, refundAmount, refundRemarks } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking || !booking.stripePaymentIntentId) {
      return res.status(404).json({ success: false, message: 'Booking/payment not found' });
    }

    await stripe.refunds.create({
      payment_intent: booking.stripePaymentIntentId,
      amount: Math.round(refundAmount * 100),
    });

    booking.refundAmount = refundAmount;
    booking.refundRemarks = refundRemarks;
    booking.refundStatus =  "refunded";
    // booking.refundStatus = refundAmount < booking.depositAmount ? 'partial_refunded' : 'refunded';
    booking.isOnGoing = false;
    await booking.save();

    SendResponse(res, 200, 'Deposit refunded successfully', booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
