import prisma from "../../../../lib/db.js";

const featureFlagStats = async () => {
  try {
    const totalFeatFlag = await prisma.featureFlag.count({});
    const totalActiveFeatFlag = await prisma.featureFlag.count({
      where: { isEnabled: true },
    });

    const totalInactiveFeatFlag = await prisma.featureFlag.count({
      where: { isEnabled: false },
    });

    return res.status(200).json({
      status: true,
      message: "App feature flag stats fetched successfully",
      result: {
        status: true,
        totalFeatFlag,
        totalActiveFeatFlag,
        totalInactiveFeatFlag,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get feature flag stats",
      error: error.message,
    });
  }
};

export { featureFlagStats };
