import backendUrl from "@/lib/backendUrl";
// import { useSession } from "@/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

// Helper function to consistently hash a user ID to decide if the feature should be enabled

// const hashString = (str) => {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = ((hash << 5) - hash) + str.charCodeAt(i);
//     hash |= 0;
//   }
//   return Math.abs(hash);
// };

// Hashing setup for userId.
export const fnv1aHash = (str) => {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
};

// Fetch a specific feature flag by name
export const fetchFeatureFlag = async ({ queryKey: [_key, flagName] }) => {
  const response = await backendUrl.get(
    `/api/feature-flags/${flagName}/get-flagname`
  );
  return response.data;
};

// Hook to get the feature flag for a specific user and flag
export const useFeatureFlag = (flagName, userId) => {
  // User data from authClient session.
  const { data: session } = authClient.useSession();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featureFlag", flagName],
    queryFn: fetchFeatureFlag,
    enabled: !!session?.user?.id,
  });

  // Calculate if the user should see the feature based on the rollout percentage
  const isFeatureEnabled = () => {
    if (!data) return false;
    const { isEnabled, rollout } = data;

    // Randomly hash the userId and check if the user is in the rollout range
    const userHash = fnv1aHash(userId) % 100;
    return isEnabled && userHash < rollout;
  };

  return {
    isFeatureEnabled: isFeatureEnabled(),
    isLoading,
    isError,
    error,
  };
};
