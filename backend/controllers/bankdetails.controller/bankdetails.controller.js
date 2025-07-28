import prisma from "../../lib/db.js";

const addBankDetails = async (req, res) => {
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
};

const fetchBankDetails = async (req, res) => {
  const storeId = req.params.storeId;

  try {
    const fetchBankDetails = await prisma.bankDetails.findFirst({
      where: { storeId },
    });

    if (!fetchBankDetails) {
      return res.status(404).json({
        message: "Bank details not found for this store",
      });
    }

    return res.status(200).json({
      success: "true",
      message: "Store bank details successfully fetched",
      result: { fetchBankDetails },
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      message: "Store bank details not available to fetch",
      error: error.message,
    });
  }
};

//  ====ADMIN SECTION===

const allBankDetails = async (req, res) => {
  try {
    const allBankDetails = await prisma.bankDetails.findMany({});

    return res.status(200).json({
      status: "true",
      message: "All bank details fetched successfully",
      result: { allBankDetails },
    });
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "Could not fetch all bank details",
      error: error.message,
    });
  }
};

// Stock code
async (req, res) => {
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
};

export { addBankDetails, fetchBankDetails, allBankDetails };
