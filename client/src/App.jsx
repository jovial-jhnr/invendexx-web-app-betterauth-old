import React from "react";

// General Imports
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // fixed here
import Header from "./components/homeFeature/Header.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Unauthorized from "./pages/generalPages/Unauthorized.jsx";
import Error404 from "./pages/generalPages/Error404";
import Footer from "./components/homeFeature/Footer.jsx";
import Home from "./pages/generalPages/Home.jsx";
import Pricing from "./pages/generalPages/Pricing.jsx";
import About from "./pages/generalPages/About.jsx";
import ThankYou from "./pages/generalPages/ThankYou.jsx";

// Authentication Imports
import SignIn from "./auth/signin.jsx";
import SignUp from "./auth/signup.jsx";
import VerifyEmail from "./auth/verify-email";
import ForgotPassword from "./auth/forgot-password.jsx";
import ResetPassword from "./auth/reset-password";
import CreateStore from "./auth/create-store";
import ActiveOrganization from "./lib/setActiveOrg";
import VerifyForgotPassword from "./auth/verify-forgot-password";

// Admin Dashboard Imports
import AdminDashboard from "@/dashboards/AdminDashboard.jsx";
import CoreDashboard from "./pages/adminPages/CoreDashboard.jsx";
import ReportsandAnalytics from "./pages/adminPages/ReportsandAnalytics.jsx";
import AppTransactions from "./pages/adminPages/AppTransactions.jsx";
import AppAccount from "./pages/adminPages/AppAccount";
import ProductCatalogs from "./pages/adminPages/ProductCatalogs.jsx";
import OrderOverview from "./pages/adminPages/OrderOverview.jsx";
import LocationOverview from "./pages/adminPages/LocationOverview";
import UserManagements from "./pages/adminPages/UserManagements.jsx";
import BusinessAccounts from "./pages/adminPages/Businessaccounts.jsx";
import FeatureFlags from "./pages/adminPages/FeatureFlags.jsx";
import Subscriptions from "./pages/adminPages/Subscriptions.jsx";
import AppDetails from "./pages/adminPages/AppDetails.jsx";
import SystemIntegrations from "./pages/adminPages/SystemIntegrations.jsx";
import AppStaffAccount from "./pages/adminPages/AppStaffAccount";

// Store Dashboard Imports
import Orders from "./pages/storePages/Orders.jsx";
import Products from "./pages/storePages/Products.jsx";
import Customers from "./pages/storePages/Customers.jsx";
import Purchases from "./pages/storePages/Purchases.jsx";
import StoreDetails from "./pages/storePages/StoreDetails.jsx";
import Transactions from "./pages/storePages/Transactions.jsx";
import StoreDashboard from "@/dashboards/StoreDashboard.jsx";
import BankDetails from "./pages/storePages/BankDetails.jsx";
import Shipping from "./pages/storePages/Shipping.jsx";
import Location from "./pages/storePages/Location.jsx";
import Expenses from "./pages/storePages/Expenses.jsx";
import Wallet from "@/pages/storePages/Wallet";
import PlansandBillings from "./pages/storePages/PlansandBillings.jsx";
import StaffAccounts from "./pages/storePages/StaffAccounts.jsx";
import Warehouse from "./pages/storePages/Warehouse.jsx";
import Account from "./pages/storePages/Account.jsx";
import Analytics from "./pages/storePages/Analytics.jsx";
import PayoutsandEarnings from "./pages/storePages/Payouts&Earnings";
import OverviewDashboard from "./pages/storePages/OverviewDashboard.jsx";
import PointOfSale from "./pages/storePages/PointOfSale";
import RatingsandReviews from "./pages/storePages/Ratings&Reviews.jsx";
import StoreIntegration from "./pages/storePages/StoreIntegration.jsx";
import LocationBranch from "./pages/storePages/LocationBranch";
import ApiKeys from "./pages/storePages/ApiKeys.jsx";

// UI Theme Imports
import { ThemeProvider } from "@/components/GeneralFeatures/theme-provider";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Do not the className it stabilizes the app on mobile */}
      <div className="w-full max-w-full min-h-screen overflow-x-hidden">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Router>
            <Header />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/error-404" element={<Error404 />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/verify-forgot-password"
                element={<VerifyForgotPassword />}
              />
              <Route path="/create-store" element={<CreateStore />} />
              <Route
                path="/set-active-store"
                element={<ActiveOrganization />}
              />

              {/* Protected Routes Admin Route */}
              <Route path="/coredashboard" element={<AdminDashboard />}>
                <Route index element={<CoreDashboard />} />
                <Route
                  path="business-accounts"
                  element={<BusinessAccounts />}
                />
                <Route path="feature-flags" element={<FeatureFlags />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="product-catalogs" element={<ProductCatalogs />} />
                <Route path="order-overview" element={<OrderOverview />} />
                <Route
                  path="location-overview"
                  element={<LocationOverview />}
                />
                <Route
                  path="reports-and-analytics"
                  element={<ReportsandAnalytics />}
                />
                <Route path="user-managements" element={<UserManagements />} />
                <Route path="app-details" element={<AppDetails />} />
                <Route path="app-transactions" element={<AppTransactions />} />
                <Route path="app-account" element={<AppAccount />} />
                <Route path="app-staff-account" element={<AppStaffAccount />} />
                <Route
                  path="system-integrations"
                  element={<SystemIntegrations />}
                />
              </Route>

              {/* Store Dashboard Routes */}
              <Route path="/storedashboard" element={<StoreDashboard />}>
                <Route index element={<OverviewDashboard />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="bank-details" element={<BankDetails />} />
                <Route path="customers" element={<Customers />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="point-of-sale" element={<PointOfSale />} />
                <Route path="store-details" element={<StoreDetails />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="warehouse" element={<Warehouse />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="apikeys" element={<ApiKeys />} />
                <Route path="account" element={<Account />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="locations" element={<Location />} />
                <Route path="branch/:locationId" element={<LocationBranch />} />
                <Route path="staff-accounts" element={<StaffAccounts />} />
                <Route
                  path="plans-and-billings"
                  element={<PlansandBillings />}
                />
                <Route
                  path="store-integration"
                  element={<StoreIntegration />}
                />
                <Route
                  path="payouts-and-earnings"
                  element={<PayoutsandEarnings />}
                />
                <Route
                  path="ratings-and-reviews"
                  element={<RatingsandReviews />}
                />
              </Route>
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
