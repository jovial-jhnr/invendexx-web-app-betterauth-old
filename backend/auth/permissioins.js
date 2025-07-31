import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  // System App Permissions
  business_account: ["create", "view", "share", "update", "delete"],
  reportsandanalytics: ["create", "view", "share"],
  user_management: ["create", "view", "share", "update", "delete"],
  export_data: ["create", "view", "share", "update", "delete"],
  app_settings: ["create", "view", "share", "update", "delete"],

  // Store Permissions
  analytics: ["create", "view", "share", "update", "delete"],
  customers: ["create", "view", "share", "update", "delete"],
  expenses: ["create", "view", "share", "update", "delete"],
  marketing: ["create", "view", "share", "update", "delete"],
  invoice: ["create", "view", "share", "update", "delete"],
  order: ["create", "view", "share", "update", "delete"],
  product: ["create", "view", "share", "update", "delete"],
  projects: ["create", "view", "share", "update", "delete"],
  project: ["create", "view", "share", "update", "delete"],
  purchase: ["create", "view", "share", "update", "delete"],
  pointofsale: ["create", "view", "share", "update", "delete"],
  ratingsandreviews: ["create", "view", "share", "update", "delete"],
  shipping: ["create", "view", "share", "update", "delete"],
  staffaccount: ["create", "view", "share", "update", "delete"],
  store_settings: ["create", "view", "share", "update", "delete"],
  transaction: ["create", "view", "share", "update", "delete"],
  wallet: ["create", "view", "share", "update", "delete"],
  warehouse: ["create", "view", "share", "update", "delete"],
};

const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  project: ["create", "update"],
});

export const app_staff = ac.newRole({
  project: ["create"],
  product: [],
});

export const app_waldeveloper = ac.newRole({
  project: ["create"],
  product: [],
});

//  Store side roles
export const owner = ac.newRole({
  ...adminAc.statements,
  project: ["create"],
});

export const staff = ac.newRole({
  project: ["create"],
});

export const manager = ac.newRole({
  project: ["create"],
  invoice: ["create", "view", "share", "update", "delete", "manage"],
  order: ["create", "view", "share", "update", "delete", "refund"],
  product: ["create", "view", "share", "update", "delete", "manage"],
  expenses: ["create", "view", "share", "update"],
  pointofsale: ["create", "view", "share", "update", "delete"],
  ratingsandreviews: ["create", "view", "share", "update", "delete"],
});

export const cashier = ac.newRole({
  invoice: ["create", "view", "share", "update", "delete"],
  order: ["create", "view", "share", "update", "delete", "refund"],
  product: ["create", "view", "share", "update", "delete"],
  pointofsale: ["create", "view", "share", "update", "delete"],
});

export const marketer = ac.newRole({
  project: ["create"],
  product,
  marketing: ["create", "view", ""],
});

export const customer_support = ac.newRole({
  project: ["create"],
  order: ["view"],
  ratingsandreviews: ["view", "share", "update", "delete"],
});

export const user = ac.newRole({
  project: ["create"],
});
