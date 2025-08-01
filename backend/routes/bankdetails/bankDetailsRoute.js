import express from "express";
import {
  addBankDetails,
  fetchBankDetails,
  allBankDetails,
} from "../../controllers/bankdetails.controller/bankdetails.controller.js";

const router = express.Router();

// User (store_ owner ) add bank details for store here
router.post("/stores/settings/add-bank-details", addBankDetails);

// User get their bank details from here
router.get("/stores/:storeId/settings/get-bank-details", fetchBankDetails);

//  Admin endpoint to get all banks
router.get("/admin/get-all-bank-details", allBankDetails);

// Stock code for future use
// router.get("/admin/get-all-bank-details");

export default router;
