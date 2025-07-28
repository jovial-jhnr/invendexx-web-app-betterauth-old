import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../../lib/db.js";

const router = express.Router();

// Access all users in the app
router.get("/users/access-all-users", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "All users available retrieved",
      result: { allUsers },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "No users are available to see. Your app sucks",
      error: error.message,
    });
  }
});

// Add or Update user details
router.post("/users/:userId/add-user-details/", async (req, res) => {
  const userId = parseInt(req.params.userId);

  const { firstName, middleName, lastName, email, phoneNumber } = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExist) {
      return res.status(404).json({
        message: "User does not exist, go and sign up!!",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
      },
    });

    return res.status(200).json({
      message: "User details updated",
      result: { updatedUser },
      updatedAt: updatedUser.updatedAt,
    });
  } catch (error) {
    console.error("Error", error);

    res.status(500).json({
      message: "Failed to update user details. Try again later !!",
      error: error.message,
    });
  }
});

/* Delete user account */
router.delete("users/user/:userId/delete-account", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const {} = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      message: "Account deleted successfully",
      result: {},
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Failed to delete user account!!",
    });
  }
});

/* Update user password */
router.post("user/update-password/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  const { oldpassword, newpassword, confirmedpassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    if (newpassword !== confirmedpassword) {
      return res.status(400).json({
        message: "New passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      message: "Failed to update user password. Try again later",
    });
  }
});

router.post("user/update-password", async (req, res) => {});

router.post("user/update-password", async (req, res) => {});

export default router;
