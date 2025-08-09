import { subDays } from "date-fns";
import prisma from "../../../../lib/db.js";

const transactionStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalTransaction = await prisma.transaction.count({
      where: { storeId },
    });

    const totalRecentTransaction = await prisma.transaction.count({
      where: {
        storeId,
        createdAt: {
          gte: subDays(new Date() - 7),
        },
      },
    });

    const totalTansactionAmount = await prisma.transaction.aggregate({
      where: { storeId },
      _sum: { amount },
    });

    const totalSettlement = await prisma.settlement.count({
      where: { storeId },
    });

    const totalSettlementAmount = await prisma.settlement.aggregate({
      where: { storeId },
      _sum: { amount },
    });
    return res.status(200).json({
      status: true,
      message: "Transaction stats successfully",
      result: {
        totalTransaction,
        totalRecentTransaction,
        totalTansactionAmount,
        totalSettlement,
        totalSettlementAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get transaction stats",
      error: error.message,
    });
  }
};

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
        totalRecentTransaction,
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

export { transactionStats };

// Stock code
const stoc = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      message: "S",
      result: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "",
      error: error.message,
    });
  }
};
