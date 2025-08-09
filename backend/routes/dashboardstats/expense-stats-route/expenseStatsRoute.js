import express from "express";
import { expenseStats } from "../../../controllers/dashboardstats.controller/store-dashstats/expense-stats.controller/expense.stats.controller.js";

const router = express.Router();

router.get("/stores/store/:storeId/dashstats/expenses-stats", expenseStats);

export default router;
