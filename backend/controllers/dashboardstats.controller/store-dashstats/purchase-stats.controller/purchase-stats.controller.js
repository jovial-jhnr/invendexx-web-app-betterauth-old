import prisma from "../../../../lib/db.js";

import { subDays } from "date-fns";

const purchaseStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalPurchase = await prisma.purchase.count({
      where: { storeId },
    });
    const totalRecentPurchase = await prisma.purchase.count({
      where: {
        storeId,
        createdAt: {
          // Seven days length
          gte: subDays(new Date(), 7),
        },
      },
    });
    const allPurchaseAmount = await prisma.purchase.aggregate({
      where: { storeId },
      _sum: {
        totalCost,
      },
    });
    // const totalCategory = await prisma.productCategory.count({
    //   where: { storeId },
    // });

    const totalSuppliers = await prisma.supplier.count({
      where: { storeId },
    });

    return res.status(200).json({
      status: true,
      message: "Store Suppliers dash stats available",
      result: {
        totalPurchase,
        totalRecentPurchase,
        totalSuppliers,
        allPurchaseAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch Store Suppliers stats",
      error: error.message,
    });
  }
};

export { purchaseStats };
