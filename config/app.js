import cors from "cors";
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import adminRoutes from "../routes/admin.routes.js";
import 'dotenv/config';
import userRoutes from '../routes/user.routes.js';
import articleRoutes from '../routes/article.routes.js';
import boatRoutes from '../routes/boat.routes.js';
import contactRoutes from '../routes/contact.routes.js';
import bookingRoutes from '../routes/booking.routes.js';
// import Stripe from "stripe";
import inventoryRoutes from '../routes/inventory.routes.js';
import contractDocumentRoutes from '../routes/contractDocument.routes.js';
import boatCategoryRoutes from '../routes/boatCategory.routes.js';
import waitingRoutes from '../routes/waiting.routes.js';
import checkoutRoutes from '../routes/checkout.routes.js';
import checkinRoutes from '../routes/checkin.routes.js';
import categoryRoutes from '../routes/category.routes.js'
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, "..", 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount } = req.body; // Amount in cents

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', "PUT"]
}));

app.get('/', (req, res) => {
  res.send('Backend server is running');
});
const routes = [
  adminRoutes,
  userRoutes,
  articleRoutes,
  boatRoutes,
  inventoryRoutes,
  contactRoutes,
  bookingRoutes,
  contractDocumentRoutes,
  boatCategoryRoutes,
  checkoutRoutes,
  checkinRoutes,
  waitingRoutes,
  categoryRoutes
];


routes.forEach(route => app.use('/api', route));
export default app;
