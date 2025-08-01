import express from "express";
import {
  createCustomer,
  createCus,
  updateCustomer,
} from "../../controllers/customers.controllers/customers.controller.js";

const router = express.Router();

// Store create customer
router.post("/stores/store/:storeId/customer/create-customer", createCustomer);

// Update customer details.
router.post("stores/store/:storeId/update-customer", updateCustomer);

//                         ===ADMIN SECTIONS===
// Admin create customer.
router.post("/admin/customer/create-customer", createCus);

// Stock code for future use.
router.post("", async (req, res) => {
  try {
    const {} = req.body;

    return res.status(201).json({
      status: true,
      message: "",
      result: {},
    });
  } catch (error) {
    console.error("Customer error:", error);

    return res.status(500).json({
      status: false,
      message: "",
      error: error.message,
    });
  }
});

export default router;
