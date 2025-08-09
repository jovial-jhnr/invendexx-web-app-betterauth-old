import express from "express";
import { appTransactionStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/app-transaction-stats.controller/app-transaction-stats.controller.js";
import { transactionStats } from "../../../controllers/dashboardstats.controller/store-dashstats/transaction.controller/transaction-stats.controller.js";

const router = express.Router();

// Store transaction stats
router.get(
  "/stores/store/:storeId/dashstats/transaction-stats",
  transactionStats
);

// Admin transaction stats
router.get("/admin/dashstats/app-transaction-stats", appTransactionStats);

export default router;
