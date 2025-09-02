import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  cancelBooking,
  createCustomer,
  checkBoatAvailability,
  getAllCustomers,
  getAllBookingOnlyDate,
  getBookingById,
  confirmBooking
} from "../controller/booking.controller.js";
import { stripeWebhook } from "../controller/stripe.webhook.controller.js";
import { refundDeposit } from "../controller/refund.controller.js";
import bodyParser from 'body-parser';
const router = express.Router();

router.post(
  '/booking/stripe/webhook',
  bodyParser.raw({ type: 'application/json' }),
  stripeWebhook
);
router.post("/booking", createBooking);
router.post("/booking/confirm", confirmBooking);


router.post('/booking/refund', refundDeposit);


router.patch("/booking/cancel/:id", cancelBooking);
router.get("/booking/:id", getBookingById)
router.get("/booking", getAllBookings);
router.get("/user/:customerId", getBookingsByCustomer);
router.post("/customer", createCustomer);
router.get("/customer", getAllCustomers);
router.get("/check-availability", checkBoatAvailability);
router.get("/booking/date", getAllBookingOnlyDate);

export default router;
