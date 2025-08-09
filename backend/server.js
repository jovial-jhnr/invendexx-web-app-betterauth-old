import express from "express";
import cors from "cors";
import { Paystack } from "@paystack/paystack-sdk";
import payhook from "./api/webhook/payhook.js";
// import signUp from "./routes/signUp.js";
// import signOut from "./routes/signOut.js";
import dotenv from "dotenv";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth.js";
// import sessionRoutes from "./routes/sessionRoutes.js";
import paystackPayment from "./payments/paystackPayment.js";
import userRoutes from "./routes/users/userRoutes.js";
import createUser from "./routes/users/createUsers.js";
import customerRoute from "./routes/customers/customerRoute.js";
import featureflagRoute from "./routes/feature-flags/featureflagRoute.js";
import productRoutes from "./routes/products/productRoutes.js";
import locationRoute from "./routes/locations/locationRoute.js";
import orderRoutes from "./routes/orders/orderRoutes.js";
import storeRoutes from "./routes/stores/storeRoutes.js";
import businessRoute from "./routes/business/businessRoute.js";
import bankDetailsRoute from "./routes/bankdetails/bankDetailsRoute.js";
import subscriptionStatus from "./routes/subscriptions/subscriptionStatus.js";
// Stats import for the app and store
import mainDashstatsRoute from "./routes/dashboardstats/main-dashstats-route/mainDashstatsRoute.js";
import businessStatsRoute from "./routes/dashboardstats/business-stats-route/businessStatsRoute.js";
import locationStatsRoute from "./routes/dashboardstats/location-stats-route/locationStatsRoute.js";
import orderStatsRoute from "./routes/dashboardstats/order-stats-route/orderStatsRoute.js";

// .env file path to load stuff
dotenv.config();

// Default app route.
const app = express();

// Disable the X-Powered-By header
app.disable("x-powered-by");

// The connection between the frontend and the backend.
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Endpoint route for the authentication, must be above the express.json.
app.all("/api/auth/{*any}", toNodeHandler(auth));

// JSON is parsed as it comes from the frontend.
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Initialized Paystack Instances.
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

// The entry point into the backend server.
app.get("/", (req, res) => {
  res.json({
    status: "true",
    message: "Youre not supposed to be here...,but since you are here",
    data: "Just go back to the frontend",
    note: "Jovial_Jhnr,developer, Jovial Technologies 2025",
  });
});

// User activities route.
app.use("", userRoutes);

// Customer endpoint in app.
app.use("", customerRoute);

// Admin user creation enpoint
app.use("/api", createUser);

// Business Account endpoint
app.use(businessRoute);

// Store route endpoint for store things.
app.use(storeRoutes);

// Product service Endpoint
app.use("/api", productRoutes);

// Orders service Endpoint
app.use("/api", orderRoutes);

// Location endpoint for location settings.
app.use(locationRoute);

// Store Subscription Status endpoint.
app.use("", subscriptionStatus);

// Payments Endpoint for Paystack
app.use("/api/paystack", paystackPayment);

// Endpint to handle bank details savings
app.use("/api", bankDetailsRoute);

// Feature flags endpoint for the web app
app.use(featureflagRoute);

// Webhook endpoint  for Paystack
app.use("/api/webhook", payhook);

// Stats sections

app.use(mainDashstatsRoute);

// Business Stats
app.use(businessStatsRoute);

// Orders store stats
app.use(orderStatsRoute);

// Location route
app.use(locationStatsRoute);

// SignOut Endpoint
// app.use("/api", signOut);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
