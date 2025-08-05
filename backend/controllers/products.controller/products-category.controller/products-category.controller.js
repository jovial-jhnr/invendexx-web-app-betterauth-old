import prisma from "../../../lib/db.js";

// Store add new category
const newCategory = async () => {
  try {
    const newCategory = await prisma.productCategory.create({
      data: {
        name,
        description,
      },
      store: {
        connect: { storeId },
      },
    });
    return res.status(200).json({
      status: true,
      message: "New category added successfully",
      result: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to add category",
      error: error.message,
    });
  }
};

// Store update category
const updateCategory = async () => {
  const storeId = req.params.storeId;
  const productCategoryId = req.params.productCategoryId;

  const { name, description } = req.body;

  try {
    const updateCategory = await prisma.productCategory.update({
      where: {
        storeId,
        id: productCategoryId,
      },
      data: {
        name,
        description,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Updated product category successfully",
      result: updateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failrd to update product category",
      error: error.message,
    });
  }
};

// Store delete category
const deleteCategory = async () => {
  const storeId = req.params.storeId;
  const productCategoryId = req.parrams.productCategoryId;

  try {
    const deleteCategory = await prisma.productCategory.delete({
      where: {
        storeId,
        productCategoryId,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Deleted product category successfully",
      result: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete store product category",
      error: error.message,
    });
  }
};

// Store fetches all category
const allProductCategory = async () => {
  const storeId = req.params.storeId;
  const limit = req.params.limit;
  const offset = req.params.offset;

  try {
    const allProductCategory = await prisma.productCategory.findMany({
      where: {
        storeId,
      },
      skip: offset,
      take: limit,
    });
    totalCount = await prisma.productCategory.count();
    totalProduct = await prisma.product.count();

    return res.status(200).json({
      status: true,
      message: "All store product category fetched successfully",
      result: allProductCategory,
      meta: {
        totalCount,
        totalProduct,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch store product category",
      error: error.message,
    });
  }
};

// ====ADMIN SECTION====

// Admin

export { newCategory, updateCategory, deleteCategory, allProductCategory };
