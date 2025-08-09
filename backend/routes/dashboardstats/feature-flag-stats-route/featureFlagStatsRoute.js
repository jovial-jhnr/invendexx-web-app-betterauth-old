import express from "express";
import { featureFlagStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/feature-flag-stats.controller/feature-flag-stats.controller.js";

const router = express.Router();

// Admin featureflag stats
router.get("/admin/dashstats/feature-flag-stats", featureFlagStats);

export default router;
