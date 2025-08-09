import prisma from "../../../../lib/db.js";
import { subDays } from "date-fns";

const mainAdminStats = async (req, res) => {
  try {
    const totalRevenue = await prisma.subscription.aggregate({
      _sum: {
        amount: true,
      },
    });
    const totalStores = await prisma.organization.count();
    const totalUsers = await prisma.user.count({});
    const totalActiveUsers = await prisma.user.count({
      where: {
        sessions: {
          some: {
            createdAt: {
              // Seven days length
              gte: subDays(new Date(), 7),
            },
          },
        },
      },
    });
    const orderRevenue = await prisma.order.aggregate({
      _sum: {
        grandTotal: true,
      },
    });

    return res.status(200).json({
      status: true,
      message: " Main admin stats fetched",
      result: {
        totalRevenue,
        totalStores,
        totalUsers,
        totalActiveUsers,
        orderRevenue,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch main admin stats",
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

export { mainAdminStats };
