import prisma from "../../../../lib/db.js";

const locationStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalLocation = await prisma.location.count({
      where: { storeId },
    });
    const totalRecentLocation = await prisma.location.aggregate({
      where: { storeId },
    });
    return res.status(200).json({
      status: true,
      message: "Location stats fetched",
      result: {
        totalLocation,
        totalRecentLocation,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: " Failed to fetch location stats",
      error: error.message,
    });
  }
};

// Stock code
const stoc = async (req, res) => {
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
};

export { locationStats };
