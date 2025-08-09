import prisma from "../../../../lib/db.js";
import { subDays } from "date-fns";

const staffAccountStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalStaff = await prisma.user.count({
      where: {
        storeId,
        role: { manager, staff },
      },
    });
    const totalActiveUsers = await prisma.user.count({
      where: {
        storeId,
        role: { manager, staff },
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

    return res.status(200).json({
      status: true,
      message: "Store staff dash stats available",
      result: {
        totalUsers,
        totalActiveUsers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch store staff stats",
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

export { staffAccountStats };
