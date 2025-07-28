import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./useSession";
import { authClient } from "@/lib/auth-client";

const getStore = async ({ queryKey = [, storeId] }) => {
  // const [, storeId] = queryKey;
  const res = await backendUrl.get(
    `/stores/store/${storeId}/get-store-details`
  );
  // console.log("Use Store", res.data?.result?.fetched_store);
  return res.data?.result?.fetched_store;
};

const useStore = async () => {
  const { data: session } = authClient.useSession();

  const storeId = session?.session?.activeOrganizationId;

  return useQuery({
    queryKey: ["stores", storeId], // Include storeId in the query key
    queryFn: getStore, // Don't put this in an array
    enabled: !!storeId, // Only enable the query when storeId exists
    staleTime: 1000 * 60 * 5,
  });
};

export default useStore;
