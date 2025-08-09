import express from "express";
import { subscriptionStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/app-subscription-stats.controller/app-subscription-stats.controller";

const router = express.Router();

router.get("/admin/dashstats/app-subscription/stats", subscriptionStats);

export default router;
