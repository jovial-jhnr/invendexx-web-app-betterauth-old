import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Add business account or store
router.post("", async (req, res) => {
  if (!storeId || !userId || !storeName) {
    return res.json({
      status: false,
      message: "All parameters are needed",
      result: {},
    });
  }

  try {
    return res.status(200).json({
      success: true,
      message: "",
      result: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "",
      error: error.message,
    });
  }
});

// Get all business accounts or stores in the app
router.get("admin/businesses/get-all-businesses", async (req, res) => {
  try {
    const allBusinesses = await prisma.store.findMany({});

    return res.status(200).json({
      success: true,
      message: "All business accounts fetched",
      result: { allBusinesses },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch business accounts",
      error: error.message,
    });
  }
});

// Delete business account or stores in the app
router.post(
  "admin/businesses/store/:storeId/delete-store",
  async (req, res) => {
    const storeId = parseInt(req.params.storeId);

    if (!storeId) {
      return res.json({
        status: false,
        message: "StoreId needed",
      });
    }
    try {
      const deleteBusiness = await prisma.store.delete({
        where: { id: storeId },
      });

      return res.status(200).json({
        success: true,
        message: "Successfully deleted biz account",
        result: { deleteBusiness },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete business",
        error: error.message,
      });
    }
  }
);

// Stock Code for future use
router.post("", async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      result: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "",
      error: error.message,
    });
  }
});

export default router;
