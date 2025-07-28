// DO NOT DELETE THIS. IT IS VERY IMPORTANT
/* This is the backbone of the Authentication System, we're using ExpressAuth from Auth.js.
 Email and password from frontend into credentials, then passed to the authorize to find the user,
 if user exists, password is compared with bcrypt.
 Token is generated and stored in the httpOnly cookies, Session strategy is 'jwt'.
*/

import Credentials from "@auth/express/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../lib/db.js";
import { ExpressAuth } from "@auth/express";
import express from "express";

const router = express.Router();

export const authConfig = {
  csrf: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        // name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const { email, password } = credentials;

        // 🔥 PRISMA way to find user
        const user = await prisma.user.findUnique({
          where: { email: email },
          include: {
            stores: {
              include: { subscription: true },
            },
            assignedLocation: true,
          },
        });

        console.log("user", user);

        if (!user) {
          throw new Error("User does not exist, go and sign-up. Thanks");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // let store;
        if (user.role === "store_owner") {
          const store = await prisma.store.findFirst({
            where: {
              id: user.storeId,
              ownerId: user.id,
            },
          });

          if (!store) {
            throw new Error("User does not own this store.");
          }
        }

        // Update lastLoggedIn
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLoggedIn: new Date(),
          },
        });

        // Return user data (customize as needed)
        return {
          id: user.id, // Prisma uses 'id' not '_id'
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          role: user.role,
          storeId: user.storeId || "none",
          assignedLocationId: user.assignedLocationId || "none",
          permissions: user.permissions,
          assignedLocation: user.assignedLocation,
          stores: user.stores,
        };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.firstname = user.firstName;
        token.lastname = user.lastName;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
        token.storeId = user.storeId || null;
        token.assignedLocationId = user.assignedLocationId || null;
        token.permissions = JSON.stringify(user.permissions || []);
        token.stores = JSON.stringify(user.stores || []);
        token.assignedLocations = JSON.stringify(user.assignedLocation || []);
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.firstName = token.firstname;
        session.user.lastName = token.lastname;
        session.user.email = token.email;
        session.user.phoneNumber = token.phoneNumber;
        session.user.role = token.role;
        session.user.storeId = token.storeId;
        session.user.assignedLocationId = token.assignedLocationId;
        session.user.permissions = JSON.parse(token.permissions);
        session.user.stores = JSON.parse(token.stores);
        session.user.assignedLocations = JSON.parse(token.assignedLocations);
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },

  /* WARNING!!! Do not delete this, it is the life-line of the whole 
  authentication system. csrf must always be true. */
};

// This is the handler to be exported
const handler = ExpressAuth(authConfig);

// Don't delete this handler; it handles Authentication
export { handler };
