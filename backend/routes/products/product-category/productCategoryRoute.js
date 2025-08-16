import express from "express";
import {
  newCategory,
  updateCategory,
  deleteCategory,
  allProductCategory,
  useProductCategory,
} from "../../../controllers/products.controller/products-category.controller/products-category.controller.js";

const router = express.Router();

// Store add new product category
router.post(
  "/stores/store/:storeId/products/product-category/new-category",
  newCategory
);

// Store update product Category
router.post(
  "/stores/store/:storeId/products/product-category/:productCategoryId/update-category",
  updateCategory
);

// Store delete product Category
router.post(
  "/stores/store/:storeId/products/product-category/:productCategoryId/delete-category",
  deleteCategory
);

// Store get all product category
router.get(
  "/stores/store/:storeId/products/product-category/all-product-category",
  allProductCategory
);

// Use category
router.get(
  "/stores/store/:storeId/products/product-category/use-product-category",
  useProductCategory
);

export default router;
