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
    const { customerType } = req.body;

    return res.status(201).json({
      status: true,
      message: "",
      result: {},
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

//                         ===ADMIN SECTIONS===

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
      result: { createCus },
    });
  } catch (error) {
    console.error("Customer error:", error);
    return res.status(500).json({
      message: "Internal server error. Customer not created.",
      error: error.message,
    });
  }
};

export { createCustomer, createCus, updateCustomer };
