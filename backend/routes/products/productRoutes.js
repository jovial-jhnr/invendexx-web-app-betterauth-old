import express from "express";
import {
  addProduct,
  updateProduct,
  fetchProducts,
  deleteProduct,
  deleteAllProducts,
  newProduct,
  fetchedProducts,
  updatedProduct,
  deletedProduct,
} from "../../controllers/products.controller/products.controller.js";

const router = express.Router();

// Store add products here
router.post("/stores/store/:storeId/products/add-product", addProduct);

// Store update products here
router.post(
  "/stores/store/:storeId/products/product/:productId/update-product",
  updateProduct
);

// Store get all the products
router.get("/stores/store/:storeId/products/fetch-all-products", fetchProducts);

// Store delete products
router.post(
  "/stores/store/:storeId/products/product/:productId/delete-product",
  deleteProduct
);

//                ===ADMIN PRODUCT SECTIONS===

// Admin creates a product for any store
router.post("/admin/products/add-product", newProduct);

// Admin update products
router.post("/admin/products/update-product/:productId", updatedProduct);

// Fetch all productd in app
router.get("/admin/products/fetch-all-product", fetchedProducts);

// Delete product in web app
router.delete("admin/products/delete-product/:ProductId", deletedProduct);

export default router;
