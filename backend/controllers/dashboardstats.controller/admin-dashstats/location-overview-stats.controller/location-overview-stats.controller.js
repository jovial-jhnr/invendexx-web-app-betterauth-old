import prisma from "../../../../lib/db.js";

const locationOverviewStats = async (req, res) => {
  try {
    const totalLocation = await prisma.location.count({});
    const totalRecentLocation = await prisma.location.count({
      where: {
        createdAt: {
          // Seven days length
          gte: subDays(new Date(), 7),
        },
      },
    });

    return res.status(200).json({
      status: true,
      message: "Location overview stats fetched",
      result: {
        totalLocation,
        totalRecentLocation,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " Failed to fetch location overview stats",
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

export { locationOverviewStats };
