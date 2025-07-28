import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

// Function to fetch session
const fetchSession = async () => {
  const response = await authClient.useSession({});
};

// Custom hook using useQuery
export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    // staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

// This endpoint is used in useSubscriptions,plans and billing etc.
