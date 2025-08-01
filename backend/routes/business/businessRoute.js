import express from "express";
import {
  createStore,
  deleteBusiness,
  allBusinesses,
} from "../../controllers/business.controller/business.controller.js";

const router = express.Router();

// Add business account or store
router.post("", createStore);

// Get all business accounts or stores in the app
router.get("/admin/businesses/get-all-businesses", allBusinesses);

// Delete business account or stores in the app
router.post("/admin/businesses/store/:storeId/delete-store", deleteBusiness);

// Stock Code for future use
// router.post("");

export default router;
