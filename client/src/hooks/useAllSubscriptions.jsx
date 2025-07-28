import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";

// Function to fetch subscription
const getAllSubscription = async () => {
  
  const response = await backendUrl.get(
    '/api/paystack/all-subscriptions');

  return response.data;
};

// Custom hook that wraps useSession and useQuery
export const useAllSubscription = () => {
  const { data: user } = useSession();

  return useQuery({
    queryKey: ["allsubscription"],
    queryFn: getAllSubscription
     
    // staleTime: 1000 * 60 * 5,
  });
};