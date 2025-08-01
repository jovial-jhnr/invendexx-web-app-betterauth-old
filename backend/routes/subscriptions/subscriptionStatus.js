import express from "express";
import { subStatus } from "../../controllers/subscriptions.controller/subscriptionstatus.controller.js";

const router = express.Router();

// Store subscription status
router.post(
  "stores/store/:storeId/subscriptions/get-subscription-status",
  subStatus
);

export default router;
