import { businessStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/business-stat.controller/business-stats.controller.js";
import express from "express";

const router = express.Router();

router.get("/admin/dashstats/business-stats", businessStats);

export default router;
