import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Create a store here for store owner.
router.post("store/create-store/:id", async (req, res) => {
  const ownerId = req.params.id;
  const { name } = req.body;

  try {
    const storeExist = await prisma.store.findUnique({
      where: {
        ownerId,
      },
    });

    if (storeExist) {
      return res.status(400).json({
        message: "Store already exist for user",
      });
    }

    const newStore = await prisma.store.create({
      data: {
        storeName: storeName,
      },
    });

    return res.status(200).json({
      message: "Store creted successfully",
      data: newStore,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Store was not created try later",
      error: error.message,
    });
  }
});
