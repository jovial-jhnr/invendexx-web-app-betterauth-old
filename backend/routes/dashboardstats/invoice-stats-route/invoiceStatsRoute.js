import express from "express";
import { invoiceStats } from "../../../controllers/dashboardstats.controller/store-dashstats/invoice-stats.controller/invoice-stats.controller.js";

const router = express.Router();

router.get("/stores/store/:storeId/dashstats/invoice-stats", invoiceStats);

export default router;
