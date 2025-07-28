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
        organization: {
          connect: { id: storeId },
        },
      },
    });
    return res.status(200).json({
      status: true,
      message: "New location created",
      result: { newLocation },
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
      result: { updateLocation },
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
      result: { deleteLocation },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete location",
      error: error.message,
    });
  }
};

export { newLocation, updateLocation, deleteLocation };
