import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { inferOrgAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BACKEND_URL,

  plugins: [
    inferAdditionalFields(),
    emailOTPClient(),
    adminClient(),
    organizationClient({
      schema: inferOrgAdditionalFields({
        organization: {
          additionalFields: {
            storeUrl: {
              type: "string",
            },
            storeTag: {
              type: "string",
            },
            banner: {
              type: "string",
            },
            status: {
              type: "string",
            },
            description: {
              type: "string",
            },

            whitelabel: {
              type: "string",
            },
            phoneNumber: {
              type: "string",
            },
            website: {
              type: "string",
            },
            city: {
              type: "string",
            },
            region: {
              type: "string",
            },
            address: {
              type: "string",
            },
            country: {
              type: "string",
            },
            zipCode: {
              type: "string",
            },
            currency: {
              type: "string",
            },
            facebook: {
              type: "string",
            },
            instagram: {
              type: "string",
            },
            twitter: {
              type: "string",
            },
            tiktok: {
              type: "string",
            },
            linkedin: {
              type: "string",
            },
            storeBaseCurrency: {
              type: "string",
            },

            modifyProductState: {
              type: "boolean",
            },
            storeApproval: {
              type: "boolean",
            },
          },
        },
      }),
    }),
  ],
});

// export const { signIn, signUp, signOut, useSession } = createAuthClient();
