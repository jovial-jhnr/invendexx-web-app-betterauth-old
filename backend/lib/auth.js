import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { emailOTP } from "better-auth/plugins";
import { organization } from "better-auth/plugins";
import prisma from "./db.js";
import { sendEmail } from "../services/EmailService.js";
import {
  // the statement control
  ac,
  // Admin roles
  admin,
  app_developer,

  // Store roles
  owner,
  manager,
  cashier,
  marketer,
  customer_support,
} from "../auth/permissioins.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }), // or "mysql", "postgresql", ...

  // Trusted origin (app url) for the system here
  trustedOrigins: [process.env.FRONTEND_URL],

  // Email and password setup
  emailAndPassword: {
    enabled: true,

    // Reset Password Setup & Emailing
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },

  // Social providers , login here
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   },
  // },

  // Account management setup
  account: {
    accountLinking: {
      enabled: true,
    },
  },

  // Session management setup
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 20 * 60 * 60, // Cache duration in seconds
    },
  },

  // Email verification setup
  emailVerification: {
    autoSignInAfterVerification: true,
  },

  // Rate limiting on authentication.
  // rateLimit: {
  //   window: 10, // time window in seconds
  //   max: 10, // max requests in the window
  // },

  // Allow user to delete .
  deleteUser: {
    enabled: true,
  },

  // Plugins setup here
  plugins: [
    // Email OTP Setup
    emailOTP({
      otpLength: 6,
      expiresIn: 6000,
    }),

    // Admin plugin setup
    adminPlugin({
      adminRoles: ["admin", "superadmin"],
      adminUserIds: ["", ""],
      defaultRole: "owner",
      bannedUserMessage:
        "Your account has been banned, if its wrong reach out to support",
      ac,
      admin,
      app_developer,
    }),

    // Organization plugin setup
    organization({
      // Organization (store) invite email setup
      async sendInvitationEmail(data) {
        const inviteLink = `https://indendex.com/accept-invitation/${data?.id}`;
        sendOrganizationInvitation({
          email: data?.email,
          invitedByUsername: data?.inviter?.user?.firstName,
          invitedByEmail: data?.inviter?.user?.email,
          // teamName: data.organization?.name,
          inviteLink,
        });
      },

      // The role and statement setup
      ac,
      roles: {
        owner,
        manager,
        cashier,
        marketer,
        customer_support,
      },
      schema: {
        organization: {
          additionalFields: {
            businessName: {
              type: "string",
              input: true,
              required: false,
            },
            businessType: {
              type: "string",
              input: true,
              required: false,
            },
            storeUrl: {
              type: "string",
              input: true,
              required: false,
            },
            storeTag: {
              type: "string",
              input: true,
              required: false,
            },
            banner: {
              type: "string",
              input: true,
              required: false,
            },
            status: {
              type: "string",
              input: true,
              required: false,
            },
            description: {
              type: "string",
              input: true,
              required: false,
            },

            whitelabel: {
              type: "string",
              input: true,
              required: false,
            },
            phoneNumber: {
              type: "string",
              input: true,
              required: false,
            },
            website: {
              type: "string",
              input: true,
              required: false,
            },
            city: {
              type: "string",
              input: true,
              required: false,
            },
            region: {
              type: "string",
              input: true,
              required: false,
            },
            address: {
              type: "string",
              input: true,
              required: false,
            },
            country: {
              type: "string",
              input: true,
              required: false,
            },
            zipCode: {
              type: "string",
              input: true,
              required: false,
            },
            currency: {
              type: "string",
              input: true,
              required: false,
            },
            facebook: {
              type: "string",
              input: true,
              required: false,
            },
            instagram: {
              type: "string",
              input: true,
              required: false,
            },
            twitter: {
              type: "string",
              input: true,
              required: false,
            },
            tiktok: {
              type: "string",
              input: true,
              required: false,
            },
            linkedin: {
              type: "string",
              input: true,
              required: false,
            },
            storeBaseCurrency: {
              type: "string",
              input: true,
              required: false,
            },

            modifyProductState: {
              type: "boolean",
              input: true,
              required: false,
            },
            storeApproval: {
              type: "boolean",
              input: true,
              required: false,
            },
          },
        },
      },
    }),
  ],

  //   User reset password here
  // sendResetPassword: async ({ user, url, token }, request) => {
  //   await sendEmail({
  //     to: user?.email,
  //     subject: "Reset Your Password",
  //     text: `Click the link to reset your password: ${url}`,
  //   });
  // },

  // Infering user setup
  user: {
    // Allow user to change email.
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async (
        { user, newEmail, url, token },
        request
      ) => {
        await sendEmail({
          to: user.email, // verification email must be sent to the current user email to approve the change
          subject: "Approve email change",
          text: `Click the link to approve the change: ${url}`,
        });
      },
    },

    // Additional fields for users
    additionalFields: {
      firstName: {
        type: "string",
      },
      middleName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      phoneNumber: {
        type: "string",
      },
    },
  },

  // Database hooks setup
  databaseHooks: {
    // Session setup
    session: {
      create: {
        before: async (session) => {
          const member = await prisma.member.findFirst({
            where: {
              userId: session?.userId ?? "",
            },
            select: {
              organizationId: true,
            },
          });

          // console.log("Session Before Hook:", {
          //   sessionId: session?.userId,
          //   member,
          // });

          return {
            // The organizationId is added to the User's Session
            data: {
              ...session,
              ...(member?.organizationId && {
                activeOrganizationId: member?.organizationId,
              }),
              status: "active",
            },
          };
        },
      },
    },
  },
});
