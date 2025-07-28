import prisma from "../../lib/db.js";

// Get Store details for store owner
const fetchedStore = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const fetchedStore = await prisma.organization.findUnique({
      where: { id: storeId },
    });
    return res.status(200).json({
      status: true,
      message: "Store details fetched successfully",
      result: { fetchedStore },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error fetching store details",
      error: error.message,
    });
  }
};

const updateStore = async (req, res) => {
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
};

const store = async (req, res) => {
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
};

export { updateStore, fetchedStore, store };
