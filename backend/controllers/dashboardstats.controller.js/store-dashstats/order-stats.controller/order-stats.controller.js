import prisma from "../../../../lib/db.js";

const orderStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const orderRevenue = await prisma.order.aggregate({
      where: { storeId },
      _sum: {
        grandTotal: true,
      },
    });

    const totalOrders = await prisma.order.count({
      where: { storeId },
    });

    return res.status(200).json({
      status: true,
      message: "Store Order stats available",
      result: {
        orderRevenue,
        totalOrders,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get order stats",
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

export { orderStats };
