import prisma from "../../lib/db.js";

const createCustomer = async (req, res) => {
  const storeId = parseInt(req.params.storeId);

  try {
    const { firstName, lastName, phoneNumber, email } = req.body;

    const cusExist = await prisma.customer.findUnique({
      where: { email },
    });

    if (cusExist) {
      return res.status(400).json({
        status: false,
        message: "Customer  exist already exists. Create another one",
      });
    }

    const createCustomer = await prisma.customer.create({
      data: {
        storeId,
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Customer  created  successfully!",
      data: { createCustomer },
    });
  } catch (error) {
    console.error("Customer error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error. Customer not created.",
      error: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    const updateCustomer = await prisma.customer.update({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
      },
    });
    return res.status(201).json({
      status: true,
      message: "Customer updated successfully",
      result: updateCustomer,
    });
  } catch (error) {
    console.error("Customer error:", error);

    return res.status(500).json({
      status: false,
      message: "",
      error: error.message,
    });
  }
};

// Store get all customer
const allStoreCustomers = async (req, res) => {
  const storeId = req.params.storeId;
  const limit = req.params.limit;
  const offset = req.params.offset;

  try {
    const allStoreCustomers = await prisma.customer.findMany({
      where: { storeId },
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.customer.count();

    return res.status(200).json({
      success: true,
      message: " All Store subscription status",
      result: allStoreCustomers,
      meta: {
        totalCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all Store subscription status",
      error: error.message,
    });
  }
};

//                         ===ADMIN SECTIONS===

// Admin create customer
const createCus = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;

    const cusExist = await prisma.user.findUnique({
      where: { email },
    });

    if (cusExist) {
      return res.status(400).json({
        message: "Customer  exist already exists. Create another one",
      });
    }

    const createCus = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Customer  created  successfully!",
      result: createCus,
    });
  } catch (error) {
    console.error("Customer error:", error);
    return res.status(500).json({
      message: "Internal server error. Customer not created.",
      error: error.message,
    });
  }
};

// Admin get all customers
const allCustomers = async (req, res) => {
  const storeId = req.params.storeId;
  const limit = req.params.limit;
  const offset = req.params.offset;

  try {
    const allCustomers = await prisma.customer.findMany({
      where: { storeId },
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.customer.count();

    return res.status(200).json({
      success: true,
      message: " All Store subscription status",
      result: allCustomers,
      meta: {
        totalCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all Store subscription status",
      error: error.message,
    });
  }
};

export {
  createCustomer,
  createCus,
  allStoreCustomers,
  updateCustomer,
  allCustomers,
};
