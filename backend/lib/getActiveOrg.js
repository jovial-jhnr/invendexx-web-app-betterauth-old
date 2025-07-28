/* Thi belong to betterauth but is not beign used cos custom
code has replaced it . In the future if needed use it */

// import prisma from "./db.js";

// // In your auth.js or session initialization file
// async function getActiveOrganization(userId) {
//   // Find the first organization this user belongs to
//   const membership = await prisma.member.findFirst({
//     where: { userId },
//     select: { organizationId: true },
//   });

//   if (!membership) {
//     throw new Error("User doesn't belong to any organization");
//     // or return null if you want to handle it differently
//   }

//   return membership.organizationId;
// }

// // Make it available to BetterAuth
// // globalThis.getActiveOrganization = getActiveOrganization;

// export default getActiveOrganization;

// // async function getActiveOrganization() {
// //   const userMember = await prisma.user.findFirst({
// //     include: { organization: true },
// //   });

// //   if (!userMember?.organization) {
// //     throw new Error("No active organization found");
// //   }
// //   return userMember.organization;
// // }

// // export default getActiveOrganization;
