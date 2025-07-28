import express from "express";
import {
  newLocation,
  updateLocation,
  deleteLocation,
} from "../../controllers/locations.controller/locations.controller.js";

const router = express.Router();

//        ==== STORE SECTION ====

// Creating new locations(branches in store)
router.post("/stores/store/:storeId/create-location", newLocation);

// Update Location by store.
router.post(
  "stores/store/:storeId/locations/:locationId/update-location",
  updateLocation
);

// Delete location or branch
router.post("stores/store/:storeId/location", deleteLocation);

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
