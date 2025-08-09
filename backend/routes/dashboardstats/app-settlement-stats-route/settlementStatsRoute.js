import express from "express";
import { settlementStats } from "../../../controllers/dashboardstats.controller/store-dashstats/settlement-stats.controller/settlement-stats.controller.js";
import { appSettlementStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/app-settlement-stats.controller/app-settlement-stats.controller.js";

const router = express.Router();

// Store settlemnt stats
router.get(
  "/stores/store/:storeId/dashstats/settlement-stats",
  settlementStats
);

// App settlement stats
router.get("/admin/dashstats/app-settlement-stats", appSettlementStats);

export default router;
