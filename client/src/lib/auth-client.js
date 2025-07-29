import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import { emailOTPClient } from "better-auth/client/plugins";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BACKEND_URL,

  plugins: [
    inferAdditionalFields(),
    adminClient(),
    organizationClient(),
    emailOTPClient(),
  ],
});

// export const { signIn, signUp, signOut, useSession } = createAuthClient();
