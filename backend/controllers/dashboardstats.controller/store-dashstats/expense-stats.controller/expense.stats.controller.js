import prisma from "../../../../lib/db.js";

const expenseStats = async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const totalExpense = await prisma.expense.count({
      where: { storeId },
    });
    const totalExpenseAmount = await prisma.expense.aggregate({
      where: { storeId },
      _sum: { amount },
    });
    return res.status(200).json({
      status: true,
      message: "Expense stats successfully",
      result: {
        totalExpense,
        totalExpenseAmount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get expense stats",
      error: error.message,
    });
  }
};

export { expenseStats };

const stoc = async (req, res) => {
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
};
