import express from "express";
import bcrypt from "bcryptjs";
import prisma from "../../lib/db.js";

const router = express.Router();

// Route to change password.
router.post("/users/user/:userId/change-password", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { oldpassword, newpassword, confirmedpassword } = req.body;

  if (newpassword !== confirmedpassword) {
    return res.status(400).json({
      status: false,
      message: "New passwords does not match",
    });
  }

  try {
    // Check for user with userId.
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // console.log("🗝️ Stored hash:", user.password);
    // console.log("🔑 Submitted old password:", oldpassword);

    // Check that oldpassword and user password match.
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      status: true,
      message: "Password changed successfully",
      result: { user },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Password changed failed",
    });
  }
});

// Stock code for future use.
router.post("", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    return res.status(200).json({
      status: true,
      message: "Password changed successfully",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Password changed failed",
    });
  }
});

export default router;
