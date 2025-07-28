/* The Store is represented by the ORGANIZATION we're using the betterauth 
 and their organization plugin were using that as the store.
 If you see organization is Store
*/

import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Edit store details

// Get all store details for each owner
router.get("/stores/store/:storeId/get-store-details", async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const fetched_store = await prisma.organization.findUnique({
      where: { id: storeId },
    });
    return res.status(200).json({
      status: true,
      message: "Store details fetched successfully",
      result: { fetched_store },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error fetching store details",
      error: error.message,
    });
  }
});

// Add store details to the Organization.
router.post(
  "/stores/store/:storeId/settings/update-store-details",
  async (req, res) => {
    const storeId = req.params.storeId;
    const {
      name,
      logo,
      slug,
      banner,
      phoneNumber,
      email,
      website,
      description,
      country,
      address,
      state,
      region,
      zipCode,
      city,
      status,
      storeTag,
      whitelabel,
      facebook,
      instagram,
      tiktok,
      twitter,
      linkedin,
      currency,
      storeUrl,
    } = req.body;

    try {
      const updateStore = await prisma.organization.update({
        where: {
          id: storeId,
        },
        data: {
          name,
          logo,
          slug,
          banner,
          phoneNumber,
          email,
          website,
          description,
          country,
          address,
          state,
          region,
          zipCode,
          city,
          status,
          storeTag,
          whitelabel,
          facebook,
          instagram,
          tiktok,
          twitter,
          linkedin,
          currency,
          storeUrl,
        },
      });

      return res.status(200).json({
        status: true,
        message: "Store details updated successfully",
        result: { updateStore },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Failed to update the store deatails",
        error: error.message,
      });
    }
  }
);

router.post(
  "/stores/store/:storeId/settings/add-store-details",
  async (req, res) => {
    const storeId = req.params.storeId;

    const {
      name,
      logo,
      slug,
      banner,
      phoneNumber,
      email,
      website,
      description,
      country,
      address,
      state,
      region,
      zipCode,
      city,
      status,
      storeTag,
      whitelabel,
      facebook,
      instagram,
      tiktok,
      twitter,
      linkedin,
      currency,
      storeUrl,
    } = req.body;

    try {
      const store = await prisma.store.upsert({
        where: { id: storeId },

        create: {
          name,
          logo,
          slug,
          banner,
          phoneNumber,
          email,
          website,
          description,
          country,
          address,
          state,
          region,
          zipCode,
          city,
          status,
          storeTag,
          whitelabel,
          facebook,
          instagram,
          tiktok,
          twitter,
          linkedin,
          currency,
          storeUrl,
          ownerId,
        },
        update: {
          name,
          logo,
          slug,
          banner,
          phoneNumber,
          email,
          website,
          description,
          country,
          address,
          state,
          region,
          zipCode,
          city,
          status,
          storeTag,
          whitelabel,
          facebook,
          instagram,
          tiktok,
          twitter,
          linkedin,
          currency,
          storeUrl,
        },
      });

      return res.status(200).json({
        status: true,
        message: "Store details saved successfully",
        result: { store },
      });
    } catch (error) {
      console.error("Prisma upsert error:", error); // ✅ better error logging
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

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
