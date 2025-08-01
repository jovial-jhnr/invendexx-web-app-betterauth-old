import express from "express";

import {
  allUsers,
  updatedUser,
  deleteUser,
  changePassword,
} from "../../controllers/users.controller/users.controller.js";

const router = express.Router();

// Access all users in the app
router.get("/users/access-all-users", allUsers);

// Add or Update user details
router.post("/users/:userId/add-user-details/", updatedUser);

/* Delete user account */
router.delete("users/user/:userId/delete-account", deleteUser);

/* Update user password */
router.post("users/user/:userId/update-password", changePassword);

router.post("user/update-password", async (req, res) => {});

router.post("user/update-password", async (req, res) => {});

export default router;
