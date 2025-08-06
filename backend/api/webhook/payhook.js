import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { Paystack } from "@paystack/paystack-sdk";
import prisma from "../../lib/db.js";
import { sendEmail } from "../../services/EmailService.js";

// Load environment variables
dotenv.config();

const router = express.Router();

// Connection to Database

// Replace with your actual Paystack secret key
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

// This contains the secret key for verifying the webhook signature.
const secret = process.env.PAYSTACK_SECRET_KEY;

router.use(express.json());

// Webhook endpoint
router.post("/paystack", async (req, res) => {
  try {
    // Retrieve the signature from the request headers
    const hash = req.headers["x-paystack-signature"];

    // Compute the expected signature
    const expectedHash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    // Validate the signature
    if (hash !== expectedHash) {
      return res.status(400).send("Invalid signature");
    }

    // Signature is valid, process the webhook event
    const webhook = req.body;

    // Data from webhook
    const data = webhook.data;
    // console.log("Webhook Data:", JSON.stringify(data, null, 2));

    // User email from webhook data
    const userEmail = data.customer?.email;

    let user;

    user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        members: {
          include: {
            organization: true,
          },
        },
      },
    });

    // Change the [0], if it not working
    const storeId = user?.members[0]?.organizationId;

    switch (webhook.event) {
      case "charge.success":
        /* Update user data + Grant user access to your product. */
        //  ✅✅ Grant Store Access✅✅
        /* Data is webhook.data */
        if (data.status === "success") {
          // const isSubscription = !!data.plan || !!data.subscription;

          // console.log(`Is this a subscription payment? ${isSubscription}`);

          await prisma.subscription.upsert({
            where: {
              storeId,
            },
            create: {
              status: data.status,
              amount: data?.amount / 100,
              channel: data.channel,
              customersCode: data.customer?.customer_code,
              customersId: data.customer?.id,
              authorizationCode: data.authorization?.authorization_code,
              cardBin: parseInt(data.authorization.bin),
              cardLast4: parseInt(data.authorization.last4),
              expMonth: parseInt(data.authorization.exp_month),
              expYear: parseInt(data.authorization.exp_year),
              cardType: data.authorization.card_type,
              cardBank: data.authorization?.bank,
              cardBrand: data.authorization?.brand,
              countryCode: data.authorization.country_code,
              accountName: data.authorization.account_name,
              startDate: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),

              planName: data.plan.name,
              planCode: data.plan.plan_code,
              interval: data.plan.interval,
              store: {
                connect: { id: storeId },
              },
            },

            update: {
              status: data?.status,
              amount: data?.amount / 100,
              channel: data.channel,
              customersCode: data.customer?.customer_code,
              customersId: data.customer?.id,
              authorizationCode: data.authorization?.authorization_code,
              cardBin: parseInt(data.authorization?.bin),
              cardLast4: parseInt(data.authorization?.last4),
              expMonth: parseInt(data.authorization.exp_month),
              expYear: parseInt(data.authorization?.exp_year),
              cardType: data.authorization?.card_type,
              cardBank: data.authorization?.bank,
              cardBrand: data.authorization?.brand,
              countryCode: data.authorization?.country_code,
              accountName: data.authorization?.account_name,
              updatedAt: new Date(),

              planName: data.plan.name,
              planCode: data.plan.plan_code,
              interval: data.plan.interval,
            },
          });

          await prisma.store.update({
            where: {
              id: storeId,
            },
            data: { hasAccess: true },
          });
        }
        break;

      case "subscription.create":
        // Handle subscription creation
        if (data.status === "active") {
          await prisma.subscription.upsert({
            where: { storeId },
            create: {
              planName: data.plan.name,
              planCode: data.plan.plan_code,
              interval: data.plan.interval,
              // emailToken: data.email_token,
              store: {
                connect: {
                  id: storeId,
                },
              },
            },

            update: {
              planName: data.plan.name,
              planCode: data.plan.plan_code,
              interval: data.plan.interval,
              // emailToken: data.email_token,
            },
          });

          // await prisma.store.update({
          //   where: {id: storeId},
          //   data: {hasAccess: true}
          // });
        }

        break;

      case "subscription.not_renew":
        // Handle non-renewing subscription
        if (data.status === "non-renewing") {
          await prisma.subscription.update({
            where: { storeId },
            data: {
              authorizationCode: null,
              customersId: null,
              customersCode: null,
              startDate: null,
              planName: null,
              planCode: null,
              cardBin: null,
              cardLast4: null,
              expMonth: null,
              expYear: null,
              cardType: null,
              cardBank: null,
              cardBrand: null,
              countryCode: null,
              accountName: null,
              emailToken: null,
              channel: null,
              interval: null,

              status: "cancelled",
              endsAt: new Date(),
              cancelledAt: new Date(),
              updatedAt: new Date(),
            },
          });

          await prisma.organization.update({
            where: {
              id: storeId,
            },

            data: {
              hasAccess: false,
              updatedAt: new Date(),
            },
          });

          // Send email to user if they want to subscribe
          // again at the end of the month.
          // await sendEmail(user.email,
          //   'Subscription Ending Soon',
          //    'Your subscription will not renew. Consider renewing before it ends.'
          // );
        }
        break;

      case "subscription.disable":
        // Revoke access to your product
        if (data.status === "complete") {
        }
        break;

      case "invoice.create":
        // Handle invoice creation
        if (data.status === "success") {
          // Send email to user to pay for the subscription.
          await sendEmail(
            user.email,
            "Invoice Generated",
            "An invoice has been created. Please make payment to continue service."
          );
        }
        break;

      case "invoice.payment_failed":
        // Handle failed invoice payment
        if (data.status === "pending") {
          // Send email to user to make payment promptly
          // to not loose access to subscription.
          await sendEmail(
            user.email,
            "Payment Failed",
            "Your invoice payment failed. Please update your payment method."
          );
        }
        break;

      case "invoice.update":
        // Handle invoice update
        if (data.status === "success") {
          // Send email to users that the charge was successful
        }
        break;

      case "subscription.expiring_cards":
        // Handle expiring cards
        if (data.status === "true") {
          // Send email to user to update their cards about their card expiring
          // and need to change it.
          await sendEmail(
            user.email,
            "Card Expiring Soon",
            "Your payment card is expiring. Please update it to avoid service interruptions."
          );
        }
        break;

      default:
        // Unhandled event

        break;
    }

    // Acknowledge receipt of the event
    return res.status(200).json({
      message: "Webhook received successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      status: false,
      message: "Error!!! Could not get the webhook events and data",
      error: error.message,
    });
  }
});

export default router;
