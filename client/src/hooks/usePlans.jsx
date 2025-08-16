import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";

// Function to fetch all plans
const getPlans = async () => {
  const response = await backendUrl.get("/api/paystack/plans");

  return response.data; // Assume your backend returns an array of plans
};

// Custom hook for fetching all plans
export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    // staleTime: 1000 * 60 * 5,  // Optional: Cache for 5 minutes
  });
};
export default usePlans;
