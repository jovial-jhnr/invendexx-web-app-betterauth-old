import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// User (store_ owner ) add bank details for store here
router.post("/stores/settings/add-bank-details", async (req, res) => {
  const { bank_name, bank_code, account_number, account_name, storeId } =
    req.body;
  // console.log(req.body);

  try {
    const addBankDetails = await prisma.bankDetails.upsert({
      where: { storeId },
      create: {
        storeId,
        bankName: bank_name,
        bankCode: bank_code,
        accountName: account_name,
        accountNumber: account_number,
      },
      update: {
        bankName: bank_name,
        bankCode: bank_code,
        accountName: account_name,
        accountNumber: account_number,
      },
    });

    return res.status(200).json({
      sucess: true,
      message: "Bank Details saved successfully",
      result: addBankDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Bank details could not be saved!!",
      error: error.message,
    });
  }
});

// User get their bank details from here
router.get("/stores/:storeId/settings/get-bank-details", async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const bank = await prisma.bankDetails.findFirst({
      where: { storeId },
    });

    if (!bank) {
      return res.status(404).json({
        message: "Bank details not found for this store",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Store bank details successfully fetched",
      result: { bank },
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      message: "Store bank details not available to fetch",
      error: error.message,
    });
  }
});

//  Admin endpoint to get all banks
router.get("/admin/get-all-bank-details", async (req, res) => {
  try {
    const allBankDetails = await prisma.bankDetails.findMany({});

    return res.status(200).json({
      status: "true",
      message: "All banks fetched successfully",
      result: { allBankDetails },
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Could not fetch all bank details",
      error: error.message,
    });
  }
});

// Stock code for future use
router.get("/admin/get-all-bank-details", async (req, res) => {
  try {
    return res.status(200).json({
      status: "true",
      message: "All banks fetched successfully",
      result: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Could not fetch all bank details",
      error: error.message,
    });
  }
});

export default router;
