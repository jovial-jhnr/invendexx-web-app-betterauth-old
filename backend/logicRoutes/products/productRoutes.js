import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Store add products here
router.post("/stores/store/:storeId/products/add-product", async (req, res) => {
  const storeId = parseInt(req.params.storeId);

  const { name, price, description, quantity, categoryId } = req.body;

  try {
    const addProduct = await prisma.product.create({
      where: { storeId: storeId },
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category: {
          connect: { id: categoryId },
        },
      },
    });

    return res.status(201).json({
      message: "Product added successfully",
      result: { addProduct },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product was not added!",
      error: error.message,
    });
  }
});

// Store update products here
router.patch(
  "/stores/store/:storeId/products/product/update-product/:id",
  async (req, res) => {
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
          price: parseFloat(price),
          quantity: parseInt(quantity),

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
  }
);

// Store get all the products
router.get(
  "/stores/store/:storeId/products/fetch-all-products",
  async (req, res) => {
    const storeId = parseInt(req.params.storeId);

    try {
      const fetchedProducts = await prisma.product.findMany({
        where: {
          storeId: storeId,
        },
        include: {
          category: true, // optional: if you want category info too
        },
      });

      return res.status(200).json({
        message: "All products fetched successfully",
        result: { fetchedProducts },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to fetch all products",
        error: error.message,
      });
    }
  }
);

// Store delete products
router.delete(
  "/stores/store/:storeId/products/delete-product/:productId",
  async (req, res) => {
    const storeId = parseInt(req.params.storeId);
    const productId = parseInt(req.params.productId);

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
        message: "Product deleted successfully",
        result: { product }, // You return the old product data
      });
    } catch (error) {
      console.error("Delete error:", error);
      return res.status(500).json({
        message: "Failed to delete product",
        error: error.message,
      });
    }
  }
);

//                ===ADMIN PRODUCT SECTIONS===

// Admin creates a product for any store
router.post("/admin/products/add-product", async (req, res) => {
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
      data: { newProduct },
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Admin failed to create product",
      error: error.message,
    });
  }
});

// Admin update products
router.put("/admin/products/update-product/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  const { name, description, price, quantity, storeId, categoryId } = req.body;

  try {
    const updateProduct = await prisma.product.update({
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
      data: updateProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// Fetch all productd in app
router.get("/admin/products/fetch-all-product", async (req, res) => {
  // const storeId = parseInt(req.params.storeId);

  try {
    const fetchedProducts = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      data: fetchedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// Delete product in web app
router.delete("admin/products/delete-product/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const deleteProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({
      status: "true",
      message: "Product deleted sucessfully",
      data: deleteProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "true",
      message: "Prduct not deleted!!",
      error: error.message,
    });
  }
});

export default router;
