import prisma from "../../../../lib/db.js";

const settlementStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalSettlement = await prisma.settlement.count({
      where: { storeId },
    });

    const totalSettlementAmount = await prisma.settlement.aggregate({
      where: { storeId },
      _sum: { amount },
    });
    return res.status(200).json({
      status: true,
      message: "Store Settlement successful",
      result: {
        totalSettlement,
        totalSettlementAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed store Settlement",
      error: error.message,
    });
  }
};

export { settlementStats };
