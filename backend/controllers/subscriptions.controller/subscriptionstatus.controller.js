import prisma from "../../lib/db.js";

// Store subscriptions
const subStatus = async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const subStatus = await prisma.subscription.findFirst({
      where: { storeId },
    });

    return res.status(200).json({
      success: true,
      message: "Store subscription status",
      result: subStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Store subscription status",
      error: error.message,
    });
  }
};

const allSubStatus = async (req, res) => {
  const storeId = req.params.storeId;
  const limit = req.params.limit;
  const offset = req.params.offset;

  try {
    const allSubStatus = await prisma.subscription.findMany({
      where: { storeId },
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.subscription.count();

    return res.status(200).json({
      success: true,
      message: " All Store subscription status",
      result: allSubStatus,
      meta: {
        totalCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all Store subscription status",
      error: error.message,
    });
  }
};

export { subStatus, allSubStatus };
