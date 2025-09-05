import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { inferOrgAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The baseURL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BACKEND_URL,

  plugins: [
    inferAdditionalFields(),
    emailOTPClient(),
    adminClient({}),
    organizationClient({
      // Activate dynamic control to custom create roles
      dynamicAccessControl: {
        enabled: true,
      },

      // Additional custom fields for organization
      schema: inferOrgAdditionalFields({
        organization: {
          additionalFields: {
            businessName: {
              type: "string",
              input: true,
            },
            businessCategory: {
              type: "string",
              input: true,
            },
            storeUrl: {
              type: "string",
              input: true,
            },
            storeTag: {
              type: "string",
              input: true,
            },
            banner: {
              type: "string",
              input: true,
            },
            status: {
              type: "string",
              input: true,
            },
            description: {
              type: "string",
              input: true,
            },

            whitelabel: {
              type: "string",
              input: true,
            },
            phoneNumber: {
              type: "string",
              input: true,
            },
            website: {
              type: "string",
              input: true,
            },
            city: {
              type: "string",
              input: true,
            },
            region: {
              type: "string",
              input: true,
            },
            address: {
              type: "string",
              input: true,
            },
            country: {
              type: "string",
              input: true,
            },
            zipCode: {
              type: "string",
              input: true,
            },
            currency: {
              type: "string",
              input: true,
            },
            facebook: {
              type: "string",
              input: true,
            },
            instagram: {
              type: "string",
              input: true,
            },
            twitter: {
              type: "string",
              input: true,
            },
            tiktok: {
              type: "string",
              input: true,
            },
            linkedin: {
              type: "string",
              input: true,
            },
            storeBaseCurrency: {
              type: "string",
              input: true,
            },

            modifyProductState: {
              type: "boolean",
              input: true,
            },
            storeApproval: {
              type: "boolean",
              input: true,
            },
          },
        },
      }),
    }),
  ],
});

// export const { signIn, signUp, signOut, useSession } = createAuthClient();
