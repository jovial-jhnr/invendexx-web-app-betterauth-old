import express from "express";
import { customerStats } from "../../../controllers/dashboardstats.controller/store-dashstats/customer-stats.controller/customer-stats.controller.js";

const router = express.Router();

router.get("/stores/store/:storeId/dashsats/customer-stats", customerStats);

export default router;
