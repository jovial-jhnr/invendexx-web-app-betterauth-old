import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Add and update orders here by store
router.post(
  "/stores/store/:storeId/location/:locationId/create-order",
  async (req, res) => {
    const {
      totalAmount,
      paymentStatus,
      paymentMethod,
      storeId,
      customerId,
      locationId,
    } = req.body;

    try {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        select: {
          name: true,
          email: true,
          phoneNumber: true,
        },
      });

      const createOrder = await prisma.order.upsert({
        create: {
          totalAmount,
          customer,
          customerId,
          storeId,
          locationId,
          paymentMethod,
          paymentStatus,
          createdBy,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phoneNumber,
        },
        update: {
          customer,
          customerId,
          storeId,
          locationId,
          createdBy,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phoneNumber,
        },
      });
      return res.status(201).json({
        status: true,
        message: "Order added successfully",
        result: { createOrder },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Order failed to be created or updated",
        error: error.message,
      });
    }
  }
);

// Store update order here
router.post(
  "stores/store/:storeId/orders/order/:orderId/update-order",
  async (req, res) => {
    const storeId = req.params.storeId;
    const orderId = req.params.orderId;
    const { orderStatus } = req.body;

    try {
      const updateOrder = await prisma.order.update({
        where: {
          id: orderId,
          storeId: storeId,
        },
        data: {
          orderStatus,
        },
      });

      return res.status(200).json({
        status: true,
        message: "Order updated successfully",
        result: { updateOrder },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Failed to update the order ",
        error: error.message,
      });
    }
  }
);

// Store get orders each
router.get(
  "stores/store/:storeId/orders/order/fetch-all-orders",
  async (req, res) => {
    const data = req.body;

    try {
      const fetchOrders = await prisma.order.findMany({});

      return res.status(200).json({
        status: true,
        message: "All available orders fetched",
        result: { fetchOrders },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "No order were fetched",
        error: error.message,
      });
    }
  }
);

// Delete order here by store
router.delete(
  "stores/store/:storeId/orders/order/:orderId/order-delete",
  async (req, res) => {
    const storeId = req.params.storeId;
    const orderId = req.params.orderId;
    const data = req.body;

    try {
      const deleteOrder = await prisma.order.delete({
        where: {
          id: orderId,
          storeId: storeId,
        },
      });

      return res.status(200).json({
        status: true,
        message: "Deleted order successfully",
        result: { deleteOrder },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Failed to delete order",
        error: error.message,
      });
    }
  }
);

//                   ===ADMIN SECTIONS===

// Admin fetches all orders in the system.
router.get("admin/orders/order/all-orders", async (req, res) => {
  const data = req.body;

  try {
    const orderAll = await prisma.order.findMany({
      include: {
        id: true,
        totalAmount: true,
        customerId: true,
        paymentStatus: true,
        paymentMethod: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json({
      status: true,
      message: "All orders fetched",
      data: orderAll,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "All orders not fetched",
      error: error.message,
    });
  }
});

// To build
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
