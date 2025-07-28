import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

router.get("", async (req, res) => {
  const storeId = req.params.storeId;
  const data = req.body;

  try {
    const sub = await prisma.subscription.get({
      where: { storeId },
    });
    return res.status(200).json({
      status: true,
      message: "Subscription fetched and available",
      data: { sub },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Subscription not available",
      error: error.message,
    });
  }
});

router.get("", async (req, res) => {
  const storeId = req.params.storeId;
  const data = req.body;

  try {
    const sub = await prisma.store.findUnique({
      where: { id: storeId },
      select: {
        id: true,
        hasAccess: true,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Subscription fetched and available",
      data: { sub },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Subscription not available",
      error: error.message,
    });
  }
});
