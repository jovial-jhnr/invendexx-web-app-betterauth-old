import prisma from "../../../../lib/db.js";

const walletStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalWalletAmount = await prisma.wallet.findFirst({
      where: { storeId },
      include: {
        balance: true,
      },
    });
    return res.status(200).json({
      status: true,
      message: "Store wallet successful",
      result: {
        totalWalletAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get store wallet",
      error: error.message,
    });
  }
};

export { walletStats };
