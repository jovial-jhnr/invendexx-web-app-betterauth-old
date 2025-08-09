import prisma from "../../../../lib/db.js";

const orderOverviewStats = async (req, res) => {
  try {
    const orderRevenue = await prisma.order.aggregate({
      _sum: {
        grandTotal: true,
      },
    });

    const totalOrders = await prisma.order.count({});

    const totalCompleteOrder = await prisma.order.count({
      where: {
        status: "completed",
      },
    });

    return res.status(200).json({
      status: true,
      message: " Order Overview stats available",
      result: {
        orderRevenue,
        totalOrders,
        totalCompleteOrder,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get order overview stats",
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

export { orderOverviewStats };
