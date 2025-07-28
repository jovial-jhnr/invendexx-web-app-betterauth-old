import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

//        ==== STORE SECTION ====

// Creating new locations(branches in store)
router.post("/stores/store/:storeId/location", async (req, res) => {
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
      result: { newLocation },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failde to create new location",
      error: error.message,
    });
  }
});

// Store adding location (branches)
router.post("stores/store/:storeId/location", async (req, res) => {
  const storeId = req.params.storeId;
  const { name, address, city, region, country } = req.body;

  try {
    const createLocation = await prisma.location.create({
      where: {
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
      message: "Location created!",
      result: { createLocation },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Could not create location",
      error: error.message,
    });
  }
});

// Update Location by store.
router.post(
  "stores/store/:storeId/locations/:locationId/update-location",
  async (req, res) => {
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
  }
);

// Delete location or branch
router.post("stores/store/:storeId/location", async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const location = await prisma.location.create({});
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

// Stock code for future use.
router.post("", async (req, res) => {
  const storeId = parseInt(req.params.storeId);

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
