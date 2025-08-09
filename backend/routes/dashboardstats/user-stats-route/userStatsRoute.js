import { userStats } from "../../../../controller/dashboardstats.controller/admin-dashstats/user-stats.controller/user-stats.controller.js";
import express from "express";

const router = express.Router();

router.get("/admin/dashstats/users/user-stats", userStats);

export default router;
