import express from "express";
import { orderStats } from "../../../controllers/dashboardstats.controller/store-dashstats/order-stats.controller/order-stats.controller.js";

const router = express.Router();

// Store gets order stats
router.get("/stores/store/:storeId/dashstats/order-store-stats", orderStats);

// Admin gets order stats
// router.get("/admin/dashstats/order-stats");

export default router;
