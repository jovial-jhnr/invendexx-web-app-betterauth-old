import express from "express";
import { Paystack } from "@paystack/paystack-sdk";
import prisma from "../lib/db.js";
import https from "https";

const router = express.Router();

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

// This endpoint fetches the plans from the Paystack dashboard.
router.get("/plans", async (req, res) => {
  try {
    const fetchPlansResponse = await paystack.plan.list({});

    if (fetchPlansResponse.status === false) {
      console.log("Error fetching plans: ", fetchPlansResponse.message);

      return res
        .status(400)
        .send(`Error fetching subscriptions: ${fetchPlansResponse.message}`);
    }

    return res.status(200).send(fetchPlansResponse.data);
  } catch (error) {
    console.error("Unexpected error while fetching plans:", error);

    return res
      .status(500)
      .send("An unexpected error occurred while fetching subscription plans.");
  }
});

// This endpoint fetches the subscriptions from the Paystack dashboard.
router.get("/all-subscriptions", async (req, res) => {
  let fetchSubscriptionsResponse = await paystack.subscription.list({});

  if (fetchSubscriptionsResponse.status === false) {
    console.log("Error fetching plans: ", fetchSubscriptionsResponse.message);
    return res
      .status(400)
      .send(
        `Error fetching subscriptions: ${fetchSubscriptionsResponse.message}`
      );
  }

  return res.status(200).send(fetchSubscriptionsResponse.data);
});

// This endpoint fetches the Subscriptions from the Paystack dashboard.
router.get("/subscription", async (req, res) => {
  try {
    let { customer } = req.query;

    if (!customer) {
      throw Error("Please include a valid customer ID");
    }

    let fetchSubscriptionsResponse = await paystack.subscription.list({
      customer,
    });
    if (fetchSubscriptionsResponse.status === false) {
      console.log(
        "Error fetching subscriptions: ",
        fetchSubscriptionsResponse.message
      );
      return res
        .status(400)
        .send(
          `Error fetching subscriptions: ${fetchSubscriptionsResponse.message}`
        );
    }

    let subscriptions = fetchSubscriptionsResponse.data.filter(
      (subscription) =>
        subscription.status === "active" ||
        subscription.status === "non-renewing"
    );

    return res.status(200).send(subscriptions);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

/* This endpoint Initializes a Transaction with a Plan from the Paystack dashboard. */
router.post("/initialize-transaction-with-plan", async (req, res) => {
  try {
    let { email, amount, plan, first_name, last_name } = req.body;

    if (!email || !amount || !plan) {
      throw Error(
        "Please provide a valid customer email, amount to charge, and plan code"
      );
    }

    let initializeTransactionResponse = await paystack.transaction.initialize({
      first_name,
      last_name,
      email,
      amount,
      plan,
      channels: ["card", "mobile_money"],
      callback_url: `${process.env.APP_URL}/thank-you`,
    });

    if (initializeTransactionResponse.status === false) {
      return console.log(
        "Error initializing transaction: ",
        initializeTransactionResponse.message
      );
    }

    let transaction = initializeTransactionResponse.data;
    return res.status(200).send(transaction);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// This endpoint Creates a Subscription for a customer
//  from the Paystack dashboard.
router.post("/create-subscription", async (req, res) => {
  try {
    let { customer, plan, authorization, start_date } = req.body;

    if (!customer || !plan) {
      throw Error("Please provide a valid customer code and plan ID");
    }

    let createSubscriptionResponse = await paystack.subscription.create({
      customer,
      plan,
      authorization,
      start_date,
    });

    if (createSubscriptionResponse.status === false) {
      return console.log(
        "Error creating subscription: ",
        createSubscriptionResponse.message
      );
    }

    let subscription = createSubscriptionResponse.data;
    return res.status(200).send(subscription);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// This endpoint Cancels a Subscription from the Paystack dashboard.
router.post("/cancel-subscription", async (req, res) => {
  try {
    let { code, token } = req.body;
    if (!code || !token) {
      throw Error(
        "Please provide a valid customer code and subscription token"
      );
    }

    let disableSubscriptionResponse = await paystack.subscription.disable({
      code,
      token,
    });

    return res.send("Subscription successfully disabled");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// This endpoint Enables a Subscription from the Paystack dashboard.
router.post("/enable-subscription", async (req, res) => {
  try {
    const { code, token } = req.body;

    if (!code || !token) {
      throw Error(
        "Please provide a valid customer code and subscription token"
      );
    }

    const enableSubscriptionResponse = await paystack.subscription.enable({
      code: subscription_code,
      token: email_token,
    });

    return res.status(200).json({
      status: true,
      message: "Subscription successfully enabled",
      result: { enableSubscriptionResponse },
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// This endpoint let customers Update their Payment Method
//  from the Paystack dashboard.
router.get("/update-payment-method", async (req, res) => {
  try {
    const { subscription_code } = req.query;
    const manageSubscriptionLinkResponse =
      await paystack.subscription.manageLink({
        code: subscription_code,
      });

    if (manageSubscriptionLinkResponse.status === false) {
      console.log(manageSubscriptionLinkResponse.message);
    }

    const manageSubscriptionLink = manageSubscriptionLinkResponse.data.link;
    return res.json({
      success: true,
      message: "Subscription Link Available",
      link: manageSubscriptionLink,
    });
  } catch (error) {
    console.log("Sub Link", error);
    return res.status(500).json({
      message: "Subscription Link not Available",
      error: error.message,
    });
  }
});

// Checks for user Account number for Account Name with bankname
router.get("/bank/resolve", async (req, res) => {
  try {
    const { account_number, bank_code } = req.query;

    const response = await paystack.verification.resolveAccountNumber({
      account_number,
      bank_code,
    });

    return res.json(response);
  } catch (err) {
    console.error(
      "Error resolving account:",
      err?.response?.data || err.message || err
    );
    return res.status(500).json({
      message: "Account resolution failed",
      error: err?.response?.data || err.message || err,
    });
  }
});

// Fetch all banks from paystack here.
router.get("/banks", async (req, res) => {
  try {
    const bankResponse = await paystack.verification.fetchBanks({
      currency: "GHS",
      country: "Ghana",
    });

    const banks = bankResponse.data.filter(
      (bank) =>
        (bank.currency === "GHS" && !bank.slug.endsWith("-usd")) ||
        bank.type === "mobile_money"
    );

    return res.status(200).json({
      success: true,
      message: "All banks fetched successfully",
      result: { banks },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not fetch banks available",
      error: error.message,
    });
  }
});

// Enpoint to get Banks is custom code. DO NOT TOUCH!!!.
// router.get("/banks", (req, res) => {
//   const options = {
//     hostname: "api.paystack.co",
//     port: 443,
//     path: "/bank?country=ghana&currency=GHS",
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${paystack}`,
//     },
//   };

//   const request = https.request(options, (response) => {
//     let data = "";

//     response.on("data", (chunk) => {
//       data += chunk;
//     });

//     response.on("end", () => {
//       try {
//         const result = JSON.parse(data);
//         if (result.status) {
//           // ✅ Send wrapped data to match frontend expectation
//           res.status(200).json({ banks: result.data });
//         } else {
//           console.error("Error fetching banks:", result.message);
//           res.status(400).send({ error: result.message });
//         }
//       } catch (error) {
//         console.error("Error parsing Paystack response:", error.message);
//         res.status(500).send({ error: "Internal server error" });
//       }
//     });
//   });

//   request.on("error", (error) => {
//     console.error("HTTPS request error:", error);
//     res.status(500).send({ error: "Internal server error" });
//   });

//   request.end();
// });

// This endpoint creates a Customer from the Paystack dashboard.

router.post("/create-customer", async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      throw Error("Please include a valid email address");
    }

    let createCustomerResponse = await paystack.customer.create({ email });
    if (createCustomerResponse.status === false) {
      console.log("Error creating customer: ", createCustomerResponse.message);
      return res
        .status(400)
        .send(`Error creating customer: ${createCustomerResponse.message}`);
    }

    let customer = createCustomerResponse.data;
    return res.status(200).send(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
});

// router.get("", async () => {});

export default router;
