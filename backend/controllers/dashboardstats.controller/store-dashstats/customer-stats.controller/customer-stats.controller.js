import prisma from "../../../../lib/db.js";

const customerStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalCustomers = await prisma.customer.count({
      where: { storeId },
    });
    const totalRecentCustomers = await prisma.customer.count({
      where: {
        storeId,
        createdAt: {
          // Seven days length
          gte: subDays(new Date(), 7),
        },
      },
    });
    return res.status(200).json({
      status: true,
      message: "Customer stats fetched",
      result: {
        totalCustomers,
        totalRecentCustomers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " Failed to fetch customers stats",
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

export { customerStats };
