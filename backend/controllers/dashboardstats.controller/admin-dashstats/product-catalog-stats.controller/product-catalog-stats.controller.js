import prisma from "../../../../lib/db.js";

// import { subDays } from "date-fns";

const productCatalogStats = async (req, res) => {
  try {
    const totalProducts = await prisma.product.count({});
    const allProductAmount = await prisma.product.aggregate({
      _sum: {
        price,
      },
    });
    const totalCategory = await prisma.productCategory.count({});

    const totalFeaturedBrands = await prisma.featuredBrands.count({});

    return res.status(200).json({
      status: true,
      message: "Products Catalog dash stats available",
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
      message: "Failed to fetch products catalog stats",
      error: error.message,
    });
  }
};

export { productCatalogStats };
