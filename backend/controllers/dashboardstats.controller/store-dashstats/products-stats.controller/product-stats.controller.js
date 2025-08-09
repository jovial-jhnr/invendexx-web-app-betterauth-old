import prisma from "../../../../lib/db.js";

import { subDays } from "date-fns";

const productStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalProducts = await prisma.product.count({
      where: { storeId },
    });
    const allProductAmount = await prisma.product.aggregate({
      where: { storeId },
      _sum: {
        price,
      },
    });
    const totalCategory = await prisma.productCategory.count({
      where: { storeId },
    });

    const totalFeaturedBrands = await prisma.featuredBrands.count({
      where: { storeId },
    });

    return res.status(200).json({
      status: true,
      message: "Store products dash stats available",
      result: {
        totalProducts,
        allProductAmount,
        totalCategory,
        totalFeaturedBrands,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch store products stats",
      error: error.message,
    });
  }
};

export { productStats };
