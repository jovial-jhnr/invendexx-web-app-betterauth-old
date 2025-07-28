import express from "express";
import {
  allFeatFlag,
  createFeatFlag,
  updateFeatFlag,
  deleteFeatFlag,
} from "../../controllers/feature-flags.controller/feature-flags.controller.js";

const router = express.Router();

// Create new or Update feature flag for the web app
router.post("admin/feature-flags/create-feature-flag", createFeatFlag);

// Update feature flag
router.post("/admin/feature-flags/:flagId/update-feature-flag", updateFeatFlag);

// Get all featureflags in the system.
router.get("/admin/flag/featflags", allFeatFlag);

// Delete feature flag from web app
router.post("/admin/featureflags/:flagId/delete-feature-flag", deleteFeatFlag);

// Stock code to use for future.
router.post("", async (req, res) => {
  try {
    const Id = req.params.id;

    return res.status(200).json({
      status: true,
      message: "",
      result: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "",
      error: error.message,
    });
  }
});

export default router;
