import { BetterAuthPlugin } from "better-auth";

export const organizationField = () => {
  return {
    id: "organization",
    schema: {
      organization: {
        fields: {
          walet: {
            type: "string",
          },
          location: {
            type: "string[]",
          },
        },
      },
    },
  };
};

// Export as a BetterAuth plugin
export const CustomOrgPlugin = BetterAuthPlugin({
  id: "custom-org-schema-plugin",
  fields: [organizationField()],
});
