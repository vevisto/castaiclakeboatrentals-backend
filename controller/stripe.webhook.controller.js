import Stripe from 'stripe';
import { Booking } from '../models/booking.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, // make sure `req.rawBody` is set by bodyParser.raw
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object;

        await Booking.findOneAndUpdate(
          { stripePaymentIntentId: pi.id },
          {
            paymentStatus: 'paid',
            status: 'confirmed', // ✅ also mark booking as confirmed
          }
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object;

        await Booking.findOneAndUpdate(
          { stripePaymentIntentId: pi.id },
          {
            paymentStatus: 'failed',
            status: 'cancelled', // ❌ cancel the booking on failed payment
          }
        );
        break;
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('❌ Error handling webhook:', err);
    res.status(500).send('Internal Error');
  }
};
