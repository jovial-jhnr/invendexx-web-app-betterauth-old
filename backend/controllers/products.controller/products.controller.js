import prisma from "../../lib/db.js";

//     ===STORE SECTION===

// Store add products
const addProduct = async (req, res) => {
  const storeId = parseInt(req.params.storeId);

  const { name, price, description, quantity, categoryId } = req.body;

  try {
    const addProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: price,
        quantity: quantity,
        category: {
          connect: { categoryId },
        },
        store: {
          connect: { storeId: storeId },
        },
      },
    });

    return res.status(201).json({
      status: true,
      message: "Product added successfully",
      result: { addProduct },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product was not added!",
      error: error.message,
    });
  }
};

// Store update products
const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id);
  const storeId = parseInt(req.params.storeId);

  const { name, description, price, quantity, categoryId } = req.body;

  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        storeId,
        name,
        description,
        price: price,
        quantity: quantity,

        category: {
          connect: { id: parseInt(categoryId) },
        },
      },
    });

    return res.status(200).json({
      status: "true",
      message: "Product updated successfully",
      result: { updateProduct },
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Store get all their products
const fetchProducts = async (req, res) => {
  const storeId = req.params.storeId;

  const limit = parseInt(req.params.limit);
  const offset = parseInt(req.params.offset);

  try {
    const fetchProducts = await prisma.product.findMany({
      where: {
        storeId: storeId,
      },
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.product.count({
      where: {
        storeId,
      },
    });

    return res.status(200).json({
      status: true,
      message: "All store products fetched successfully",
      result: fetchProducts,
      meta: {
        totalCount,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch all store products ",
      error: error.message,
    });
  }
};

// Store delete product
const deleteProduct = async (req, res) => {
  const storeId = req.params.storeId;
  const productId = req.params.productId;

  try {
    // 1. Ensure the product exists and belongs to the store
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId: storeId, // ✅ Ensures ownership
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or does not belong to this store",
      });
    }

    // 2. Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      // result: { product }, // You return the old product data
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// Store delete all products
const deleteAllProducts = async (req, res) => {
  const storeId = req.params.storeId;
  const productId = req.params.productId;

  try {
    // 1. Ensure the product exists and belongs to the store
    const product = await prisma.product.findMany({
      where: {
        id: productId,
        storeId: storeId, // ✅ Ensures ownership
      },
    });

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found or does not belong to this store",
      });
    }

    // 2. Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      // result:  product , // You return the old product data
    });
  } catch (error) {
    // console.error("Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

//            ====ADMIN SECTION====

// Admin add products
const newProduct = async (req, res) => {
  const { name, description, price, quantity, storeId, categoryId } = req.body;

  try {
    const newProduct = await prisma.product.create({
      where: { storeId },
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        store: {
          connect: { id: parseInt(storeId) },
        },
        category: {
          connect: { id: parseInt(categoryId) },
        },
      },
    });

    return res.status(201).json({
      status: "true",
      message: "Admin created product successfully",
      result: { newProduct },
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Admin failed to create product",
      error: error.message,
    });
  }
};

// Admin update products
const updatedProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);

  const { name, description, price, quantity, storeId, categoryId } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        store: {
          connect: { id: parseInt(storeId) },
        },
        category: {
          connect: { id: parseInt(categoryId) },
        },
      },
    });

    return res.status(200).json({
      status: "true",
      message: "Product updated successfully",
      result: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Admin gets all products
const fetchedProducts = async (req, res) => {
  // const storeId = parseInt(req.params.storeId);
  const limit = parseInt(req.params.limit);
  const offset = parseInt(req.params.offset);

  try {
    const fetchedProducts = await prisma.product.findMany({
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.product.count({});

    return res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      result: fetchedProducts,
      meta: {
        totalCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Admin delete product
const deletedProduct = async (req, res) => {
  const productId = parseInt(req.params.productId);

  try {
    const deletesProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({
      status: "true",
      message: "Product deleted sucessfully",
      result: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Prduct not deleted!!",
      error: error.message,
    });
  }
};

export {
  // Store part
  addProduct,
  updateProduct,
  fetchProducts,
  deleteProduct,
  deleteAllProducts,
  //   Admin part
  newProduct,
  fetchedProducts,
  updatedProduct,
  deletedProduct,
};
