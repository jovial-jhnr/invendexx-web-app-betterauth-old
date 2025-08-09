import prisma from "../../../../lib/db.js";

const mainStoreStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalOrders = await prisma.order.count({
      where: { storeId },
    });

    const totalOrderRevenue = await prisma.order.aggregate({
      where: { storeId },
      _sum: {
        grandTotal: true,
      },
    });

    const totalCustomers = await prisma.customer.count({
      where: { storeId },
    });

    const totalProduct = await prisma.product.count({
      where: { storeId },
    });

    return res.status(200).json({
      status: true,
      message: "Main Store Stats fetched successfully",
      result: {
        totalOrderRevenue,
        totalOrders,
        totalCustomers,
        totalProduct,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get main store stats",
      error: error.message,
    });
  }
};

// Stock Code
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

export { mainStoreStats };
