import prisma from "../../lib/db.js";

const subStatus = async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const subStatus = await prisma.subscription.findFirst({
      where: { storeId },
    });

    return res.status(200).json({
      success: true,
      message: "Store subscription status",
      result: { subStatus },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Store subscription status",
      error: error.message,
    });
  }
};

export { subStatus };
