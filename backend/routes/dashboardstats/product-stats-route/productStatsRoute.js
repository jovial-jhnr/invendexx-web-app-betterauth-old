import express from "express";
import { productCatalogStats } from "../../../controllers/dashboardstats.controller/admin-dashstats/product-catalog-stats.controller/product-catalog-stats.controller.js";
import { productStats } from "../../../controllers/dashboardstats.controller/store-dashstats/products-stats.controller/product-stats.controller.js";

const router = express.Router();

// Store product stats
router.get("/stores/store/:storeId/dashstats/product-stats", productStats);

// Admin product stats
router.get("/admin/dashstats/product-catalog-stats", productCatalogStats);

export default router;
