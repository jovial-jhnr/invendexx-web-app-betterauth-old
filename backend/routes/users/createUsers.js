import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../../lib/db.js";
// import { authenticatedUser } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create staff
router.post("/auth/create-staff", async (req, res) => {
  try {
    const { firstName, lastName, storeName, email, password } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ message: "Staff already exists. Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "staff",
        permissions,
        assignedLocation,
        lastLoggedIn: new Date(),
      },
    });

    return res.status(201).json({
      message: "Staff created successfully!",
      user: {
        id: newStaff.id,
        firstName: newStaff.firstName,
        lastName: newStaff.lastName,
        email: newStaff.email,
        role: newStaff.role,
        assignedLocation: newStaff,
        permissions: newStaff.permissions,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error. Staff not created.",
      error: error.message,
    });
  }
});

// Create all users admin
router.post("/auth/admin/create-user", async (req, res) => {
  try {
    const { firstName, lastName, storeName, email, password } = req.body;

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return res.status(400).json({
        message: "User by admin exist already exists. Please log in.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "staff",
        permissions,
        assignedLocation,
        lastLoggedIn: new Date(),
      },
    });

    return res.status(201).json({
      status: true,
      message: "Admin created user successfully!",
      user: {
        id: createUser.id,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        email: createUser.email,
        role: createUser.role,
        assignedLocation: newStaff,
        permissions: createUser.permissions,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal server error. Staff not created.",
      error: error.message,
    });
  }
});

export default router;
