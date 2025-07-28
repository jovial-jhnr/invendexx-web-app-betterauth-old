import prisma from "../../lib/db.js";

// Add feaure flag for features in the app
const createFeatFlag = async (req, res) => {
  const { name, slug, isEnabled, description, rollout } = req.body;
  try {
    const createFeatFlag = await prisma.featureFlag.create({
      data: {
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
      result: { createFeatFlag },
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      message: "Feature flag not created",
      error: error.message,
    });
  }
};

// Update feature flag
const updateFeatFlag = async (req, res) => {
  const { flagId } = req.params.flagId;
  try {
    const updateFeatFlag = await prisma.featureFlag.delete({
      where: { id: flagId },
    });
    return res.status(200).json({
      status: true,
      message: "Feature flag updated successfully",
      result: { updateFeatFlag },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Feature flag failed to update ",
      error: error.message,
    });
  }
};

const allFeatFlag = async (req, res) => {
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
};

const deleteFeatFlag = async (req, res) => {
  const flagId = req.params.flagId;
  try {
    const deleteFeatFlag = await prisma.featureFlag.delete({
      where: { id: flagId },
    });
    return res.status(200).json({
      status: true,
      message: "Featuer flag deleted successfully",
      result: { deleteFeatFlag },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Feature flag failed to deleted ",
      error: error.message,
    });
  }
};

export { createFeatFlag, allFeatFlag, updateFeatFlag, deleteFeatFlag };
