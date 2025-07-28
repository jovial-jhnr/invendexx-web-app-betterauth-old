// import backendUrl from "@/lib/backendUrl";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "@/hooks/useSession";
// import { authClient } from "@/lib/auth-client";

// // Function to fetch subscription
// const getSubscription = async (customersId) => {
//   const response = await backendUrl.get(
//     `/api/paystack/subscription?customer=${customersId}`
//   );

//   return response.data;
// };

// // Custom hook that wraps useSession and useQuery
// export const useSubscription = () => {
//   const { data: session } = authClient.useSession();
//   const customersId = user.stores?.[0]?.subscription?.customersId;

//   return useQuery({
//     queryKey: ["subscription", customersId],
//     queryFn: () => getSubscription(customersId),
//     enabled: !!customersId, // Only run if customerId is available
//     // staleTime: 1000 * 60 * 5,
//   });
// };
