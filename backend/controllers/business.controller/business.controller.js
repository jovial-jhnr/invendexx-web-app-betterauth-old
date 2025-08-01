import prisma from "../../lib/db.js";

// Crete Store here
const createStore = async (req, res) => {
  if (!storeId || !userId || !storeName) {
    return res.json({
      status: false,
      message: "All parameters are needed",
    });
  }

  try {
    const createStore = await prisma.organization.create({});
    return res.status(200).json({
      success: true,
      message: "New store created successfully",
      result: { createStore },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "",
      error: error.message,
    });
  }
};

// Delete business
const deleteBusiness = async (req, res) => {
  const storeId = parseInt(req.params.storeId);

  if (!storeId) {
    return res.json({
      status: false,
      message: "StoreId needed",
    });
  }
  try {
    const deleteBusiness = await prisma.organization.delete({
      where: { id: storeId },
    });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted biz account",
      result: deleteBusiness,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete business",
      error: error.message,
    });
  }
};

const allBusinesses = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const allBusinesses = await prisma.organization.findMany({
      skip: offset * limit,
      take: limit,
    });

    // Total businesses in the app available
    const total = await prisma.organization.count();

    return res.status(200).json({
      status: true,
      message: "All business accounts fetched",
      result: allBusinesses,
      total,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch business accounts",
      error: error.message,
    });
  }
};

// Stock code
async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "",
      result: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "",
      error: error.message,
    });
  }
};

export { createStore, deleteBusiness, allBusinesses };
