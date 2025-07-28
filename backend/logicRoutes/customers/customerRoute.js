import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Store create customer
router.post(
  "/stores/store/:storeId/customer/create-customer",
  async (req, res) => {
    const storeId = parseInt(req.params.storeId);

    try {
      const { firstName, lastName, phoneNumber, email } = req.body;

      const cusExist = await prisma.customer.findUnique({
        where: { email },
      });

      if (cusExist) {
        return res.status(400).json({
          status: false,
          message: "Customer  exist already exists. Create another one",
        });
      }

      const createCustomer = await prisma.customer.create({
        data: {
          storeId,
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      });

      return res.status(201).json({
        status: true,
        message: "Customer  created  successfully!",
        data: { createCustomer },
      });
    } catch (error) {
      console.error("Customer error:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error. Customer not created.",
        error: error.message,
      });
    }
  }
);

// Update customer details.
router.post("stores/store/:storeId/", async (req, res) => {
  try {
    const { customerType } = req.body;

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

//                         ===ADMIN SECTIONS===
// Admin create customer.
router.post("/admin/customer/create-customer", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;

    const cusExist = await prisma.user.findUnique({
      where: { email },
    });

    if (cusExist) {
      return res.status(400).json({
        message: "Customer  exist already exists. Create another one",
      });
    }

    const createCus = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Customer  created  successfully!",
      data: { createCus },
    });
  } catch (error) {
    console.error("Customer error:", error);
    return res.status(500).json({
      message: "Internal server error. Customer not created.",
      error: error.message,
    });
  }
});

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
