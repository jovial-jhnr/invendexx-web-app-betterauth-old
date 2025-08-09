const invoiceStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalInvoice = await prisma.invoice.count({
      where: { storeId },
    });

    const totalPaidInvoice = await prisma.invoice.count({
      where: { storeId, status: "paid" },
    });

    const totalUnpaidInvoice = await prisma.invoice.count({
      where: { storeId, status: "UNPAID" },
    });
    return res.status(200).json({
      status: true,
      message: "Store Invoice successful",
      result: {
        totalInvoice,
        totalPaidInvoice,
        totalUnpaidInvoice,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get store Invoice",
      error: error.message,
    });
  }
};

export { invoiceStats };
