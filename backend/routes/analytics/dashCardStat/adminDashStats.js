import express from "express";
import bcrypt from "bycrypt";
import prisma from "../../../lib/db";

const router = express.Router();

// Total users on the web app
router.get("/admin/stats/total-users", async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();

    return res.status(200).json({
      message: "All users retrieved successfully",
      data: totalUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No users available, just go get users",
      error: error.message,
    });
  }
});

// Total active users
router.get("stats/active-users", async (req, res) => {
  try {
    // Users active within 7 days
    const lastActive = new Date();
    lastActive.setDate(lastActive.getDate() - 7);

    const activeUsers = await prisma.user.count({
      where: {
        lastLoggedIn: {
          gte: lastActive,
        },
      },
    });

    return res.status(200).json({
      message: "Active users within 7 days available",
      data: activeUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch active users",
      error: error.message,
    });
  }
});

// Total businesses on the web app
router.get("stats/total-businesses", async (req, res) => {
  try {
    const totalBusiness = await prisma.store.count();

    return res.status(200).json({
      message: "Total businesses available",
      data: totalBusiness,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No bussinesses available",
      error: error.message,
    });
  }
});

// Monthly Revenue in the web app
router.get("/stats/monthly-revenue", async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const revenueByMonth = {};

    subscriptions.forEach(({ amount, createdAt }) => {
      const date = new Date(createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const label = `${month} ${year}`;

      if (!revenueByMonth[label]) {
        revenueByMonth[label] = 0;
      }

      revenueByMonth[label] += parseFloat(amount);
    });

    return res.status(200).json({
      message: "Monthly revenue from subscriptions calculated successfully",
      data: revenueByMonth,
    });
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return res.status(500).json({
      message: "Failed to fetch monthly revenue",
      error: error.message,
    });
  }
});

// Total revenue in the app
router.get("/stats/total-revenue", async (req, res) => {
  try {
    const totalRevenue = await prisma.subscription.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "active",
      },
    });

    return res.status(200).json({
      message: "Total revenue avalable",
      data: totalRevenue._sum.amount || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch total revenue",
      error: error.message,
    });
  }
});

// Total Orders in the web app
router.get("stats/total-orders", async (req, res) => {
  try {
    const totalOrders = await prisma.orders.count();

    return res.status(200).json({
      message: "Total orders on the app retrieved",
      data: totalOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "",
      error: error.message,
    });
  }
});

router.get("stats/sales", async (req, res) => {
  try {
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: "",
      error: error.message,
    });
  }
});

// Total sales in the web-app
router.get("store/total-sales", async (req, res) => {
  try {
    // const storeId = parseInt(req.params.id);

    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    return res.status(200).json({
      message: "Stores total sales retrieved",
      data: totalSales._sum.totalAmount || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No your store do not have sales",
      error: error.message,
    });
  }
});
