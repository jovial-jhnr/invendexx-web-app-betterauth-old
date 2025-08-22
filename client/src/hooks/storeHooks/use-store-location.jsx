import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import backendUrl from "@/lib/backendUrl";

const fetchStoreLocation = async ({ queryKey }) => {
  const [, storeId] = queryKey;
  const res = await backendUrl.get(
    `/stores/store/${storeId}/locations/location/use-store-locations`
  );
  // console.log(res.data);
  return res.data?.result;
};

const useStoreLocation = () => {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  return useQuery({
    queryKey: ["location", storeId],
    queryFn: fetchStoreLocation,
    enabled: !!storeId,
  });
};

export default useStoreLocation;
