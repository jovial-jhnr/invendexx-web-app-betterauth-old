import prisma from "../../../../lib/db.js";

const appSettlementStats = async (req, res) => {
  try {
    const totalSettlement = await prisma.settlement.count({});

    const totalSettlementAmount = await prisma.settlement.aggregate({
      _sum: { amount },
    });
    return res.status(200).json({
      status: true,
      message: "App Settlement successful",
      result: {
        totalSettlement,
        totalSettlementAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed  to get App Settlement",
      error: error.message,
    });
  }
};

export { appSettlementStats };
