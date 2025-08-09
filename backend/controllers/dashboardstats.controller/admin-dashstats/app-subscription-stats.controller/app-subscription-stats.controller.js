import prisma from "../../../../lib/db.js";

const subscriptionStats = async (req, res) => {
  try {
    const totalSubscription = await prisma.subscription.count({});
    const totalRecentSubscription = await prisma.subscription.count({
      where: {
        createdAt: {
          // Seven days length
          gte: subDays(new Date(), 7),
        },
      },
    });
    return res.status(200).json({
      status: true,
      message: "App subscriptions stats fetched",
      result: {
        totalSubscription,
        totalRecentSubscription,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " Failed to fetch app subscriptions stats",
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

export { subscriptionStats };
