import prisma from "../../lib/db.js";

// Create new location(branch)
const newLocation = async (req, res) => {
  const storeId = req.params.storeId;
  const { name, address, city, region, country } = req.body;

  try {
    const newLocation = await prisma.location.create({
      data: {
        name,
        address,
        city,
        region,
        country,
        store: {
          connect: { id: storeId },
        },
      },
    });
    return res.status(200).json({
      status: true,
      message: "New location created",
      result: newLocation,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failde to create new location",
      error: error.message,
    });
  }
};

// Update location (branches)
const updateLocation = async (req, res) => {
  const storeId = req.params.storeId;
  const locationId = req.params.locationId;
  const { name, address, city, region, country } = req.body;

  try {
    const updateLocation = await prisma.location.update({
      where: {
        id: locationId,
        storeId: storeId,
      },
      data: {
        name,
        address,
        city,
        region,
        country,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Location updated successfully",
      result: updateLocation,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Could not update location",
      error: error.message,
    });
  }
};

// Delete location
const deleteLocation = async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const deleteLocation = await prisma.location.delete({
      where: { storeId },
    });
    return res.status(200).json({
      status: true,
      message: "Location deleted successfully",
      // result: deleteLocation ,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete location",
      error: error.message,
    });
  }
};

// Store locations(branches of stores)
const storeLocations = async (req, res) => {
  const storeId = req.params.storeId;

  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  try {
    const storeLocations = await prisma.location.findMany({
      where: {
        storeId,
      },
      take: limit,
      skip: offset,
    });

    const totalCount = await prisma.location.count({
      where: { storeId },
    });

    return res.status(200).json({
      status: true,
      message: "All Store locations (branches) fetched successfully",
      result: storeLocations,
      meta: {
        totalCount,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Could not fetch Store locations (branches)",
      error: error.message,
    });
  }
};

//    ====ADMIN SECTION===

const deletedLocation = async (req, res) => {
  const storeId = req.params.storeId;

  if (!storeId) {
    return res.status(401).json({
      status: false,
      message: "StoreId is required to delete location",
    });
  }

  try {
    const deletedLocation = await prisma.location.delete({
      where: {
        storeId,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Deleted location successfully",
      result: deletedLocation,
    });
  } catch (error) {
    return (
      res.status(500),
      json({
        status: false,
        message: "Failed to delete location",
        error: error.message,
      })
    );
  }
};

// App get all locations
const listLocations = async (req, res) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  try {
    const listLocations = await prisma.location.findMany({
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.location.count();

    return res.status(200).json({
      status: true,
      message: "All locations (branches) fetched",
      result: listLocations,
      meta: {
        totalCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Could not fetch locations (branches)",
      error: error.message,
    });
  }
};

// Stock code to use
const stock = async (req, res) => {
  const storeId = req.params.storeId;

  if (!storeId) {
    return res.status(401).json({
      status: false,
      message: "StoreId is required to delete location",
    });
  }

  try {
    const stock = await prisma.location.delete({
      where: {
        storeId,
      },
    });
    return res.status(200).json({
      status: true,
      message: "",
      result: "",
    });
  } catch (error) {
    return (
      res.status(500),
      json({
        status: false,
        message: "",
      })
    );
  }
};

export {
  // Store side
  newLocation,
  updateLocation,
  deleteLocation,
  storeLocations,
  // App side
  listLocations,
  deletedLocation,
};
