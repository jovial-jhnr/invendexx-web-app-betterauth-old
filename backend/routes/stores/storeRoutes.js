/* The Store is represented by the ORGANIZATION we're using the betterauth 
 and their organization plugin, were using that as the store.
 If you see organization is Store or business more on the admin side.
*/

import express from "express";
import {
  fetchedStore,
  updateStore,
  store,
  signInStore,
} from "../../controllers/stores.controller/stores.controller.js";

const router = express.Router();

// Edit store details

// Get all store details for each owner
router.get("/stores/store/:storeId/get-store-details", fetchedStore);

// Add store details to the Organization.
router.post(
  "/stores/store/:storeId/settings/update-store-details",
  updateStore
);

router.post("/stores/store/:storeId/settings/add-store-details", store);

// get store with userId
router.get("/stores/store/:userId/store-details", signInStore);

// Stock code for future use
router.get("", async (req, res) => {
  const storeId = req.params.id;
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
    });
  }
});

export default router;
