import express from "express";
import { locationOverviewStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/location-overview-stats.controller/location-overview-stats.controller.js";
import { locationStats } from "../../../controllers/dashboardstats.controller/store-dashstats/location-stats.controller/location-stats.controller.js";

const router = express.Router();

// Store location stats
router.get("/stores/store/:storeId/dashstats/location-stats", locationStats);

// App admin location stats
router.get("/admin/dashstats/location-overview-stats", locationOverviewStats);

export default router;
