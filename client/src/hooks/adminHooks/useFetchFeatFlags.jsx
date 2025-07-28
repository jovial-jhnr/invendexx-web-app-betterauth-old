import backendUrl from '@/lib/backendUrl';
import { useQuery } from '@tanstack/react-query';


// Fetch all feature flags from the backend
export const fetchFeatureFlags = async () => {
  const response = await backendUrl.get('/api/feature-flags');
  return response.data;
};

// Hook to get all feature flags
export function useFeatureFlags() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['featureFlags'],
    queryFn: fetchFeatureFlags,
  });

  return { data, isLoading, isError, error };
}
