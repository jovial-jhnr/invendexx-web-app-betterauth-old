import prisma from "../../lib/db.js";

//         ====STORE SECTION====
const createOrder = async (req, res) => {
  const storeId = req.params.storeId;
  const locationId = req.params.locationId;
  const { totalAmount, paymentStatus, paymentMethod, customerId } = req.body;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        name: true,
        email: true,
        phoneNumber: true,
      },
    });

    const createOrder = await prisma.order.create({
      data: {
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
        customerPhoneNumber: customer.phoneNumber,
        store: {
          connect: { storeId },
        },
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
};

// Store update order
const updateOrder = async (req, res) => {
  const storeId = req.params.storeId;
  const orderId = req.params.orderId;
  const { status } = req.body;

  try {
    const updateOrder = await prisma.order.update({
      where: {
        id: orderId,
        storeId: storeId,
      },
      data: {
        status,
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
};

// Store det their orders
const fetchOrders = async (req, res) => {
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
};

// Store delete orders but do not give store acess to this.
const deleteOrder = async (req, res) => {
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
};

//   ====CUSTOMER ORDER SECTION====

// Customer mark order as Complete
const customerMarkOrder = async (req, res) => {
  const data = req.body;

  try {
    const customerMarkOrder = await prisma.order.update({});
    return res.status(200).json({
      status: true,
      message: "Customer marked order successfully",
      result: { customerMarkOrder },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to mark order",
      error: error.message,
    });
  }
};

//  ====ADMIN ORDER SECTION====

// Admin get all orders
const orderAll = async (req, res) => {
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
};

export {
  createOrder,
  updateOrder,
  deleteOrder,
  fetchOrders,
  customerMarkOrder,
  orderAll,
};
