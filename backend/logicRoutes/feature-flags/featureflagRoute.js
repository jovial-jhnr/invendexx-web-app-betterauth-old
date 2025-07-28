import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Create new or Update feature flag for the web app
router.post("/feature-flags", async (req, res) => {
  const { name, slug, isEnabled, description, rollout } = req.body;
  try {
    const featflag = await prisma.featureFlag.upsert({
      create: {
        name,
        isEnabled,
        description,
        slug,
        rollout,
      },
      update: {
        name,
        isEnabled,
        description,
        slug,
        rollout,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Feature flag added!!",
      result: { featflag },
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: "Feature flag not created",
      error: error.message,
    });
  }
});

// Get all featureflags in the system.
router.get("/admin/flag/featflags", async (req, res) => {
  const data = req.body;

  try {
    const allFeatFlag = await prisma.featureFlag.findMany({
      include: {
        name: true,
        slug: true,
        description: true,
        isEnabled: true,
        rollout: true,
      },
    });
    return res.status(200).json({
      status: true,
      message: "All feature flags fetched",
      result: { allFeatFlag },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "No feature flags fetched",
    });
  }
});

// Delete feature flag from web app
router.delete("/admin/flag/:flagId", async (req, res) => {
  const { flagId } = req.params.flagId;
  try {
    const deleteflag = await prisma.featureFlag.delete({
      where: { id: flagId },
    });
    return res.status(200).json({
      status: true,
      message: "Featuer flag deleted successfully",
      result: { deleteflag },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Feature flag failed to deleted ",
      error: error.message,
    });
  }
});

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
