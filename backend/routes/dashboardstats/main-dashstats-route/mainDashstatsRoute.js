import express from "express";
import { mainAdminStats } from "../../../controllers/dashboardstats.controller.js/admin-dashstats/main-admin-stats.controller/main-admin-stats.controller.js";
import { mainStoreStats } from "../../../controllers/dashboardstats.controller.js/store-dashstats/main-store-stats.controller/main-store-stats.controller.js";

const router = express.Router();

router.get("/stores/store/:storeId/dashstats/main-store-stats", mainStoreStats);

// Admin get main stats
router.get("/admin/dashstats/main-admin-stats", mainAdminStats);

export default router;
