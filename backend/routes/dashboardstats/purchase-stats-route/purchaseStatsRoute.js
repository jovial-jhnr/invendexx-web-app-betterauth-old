import express from "express";
import { purchaseStats } from "../../../controllers/dashboardstats.controller/store-dashstats/purchase-stats.controller/purchase-stats.controller.js";

const router = express.Router();

router.get("/stores/store/:storeId/dashstats/purchase-stats", purchaseStats);

export default router;
