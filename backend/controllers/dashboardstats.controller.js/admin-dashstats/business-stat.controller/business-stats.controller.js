import prisma from "../../../../lib/db.js";
import { subDays } from "date-fns";

const businessStats = async (req, res) => {
  try {
    const totalStores = await prisma.organization.count();
    const recentStoresCount = await prisma.organization.count({
      where: {
        createdAt: {
          // 30 days length
          gte: subDays(new Date(), 30),
        },
      },
    });

    return res.status(200).json({
      status: true,
      message: "Business dash stats available",
      result: {
        totalStores,
        recentStoresCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch business stats",
      error: error.message,
    });
  }
};

// Stock code
const stoc = async (req, res) => {
  try {
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
};

export { businessStats };
