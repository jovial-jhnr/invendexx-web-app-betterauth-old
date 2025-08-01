import express from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  fetchOrders,
  customerMarkOrder,
  orderAll,
} from "../../controllers/orders.controller/orders.controller.js";

const router = express.Router();

// Add and update orders here by store
router.post(
  "/stores/store/:storeId/location/:locationId/create-order",
  createOrder
);

// Store update order here
router.post(
  "stores/store/:storeId/orders/order/:orderId/update-order",
  updateOrder
);

// Store get orders each
router.get("stores/store/:storeId/orders/order/fetch-all-orders", fetchOrders);

// Delete order here by store
router.delete(
  "stores/store/:storeId/orders/order/:orderId/order-delete",
  deleteOrder
);

//               ====CUSTOMER ORDER SECTION=====
router.post(
  "stores/store/customers/:customerId/orders/:orderId/mark-order",
  customerMarkOrder
);
//                   ===ADMIN SECTIONS===

// Admin fetches all orders in the system.
router.get("admin/orders/order/all-orders", orderAll);

// Stock component
router.post("", async (req, res) => {
  const data = req.body;

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
});

export default router;
