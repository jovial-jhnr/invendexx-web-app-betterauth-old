import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import backendUrl from "@/lib/backendUrl";

const fetchCategory = async ({ queryKey }) => {
  const [, storeId] = queryKey;
  const res = await backendUrl.get(
    `/stores/store/${storeId}/products/product-category/use-product-category`
  );
  return res.data?.result;
};

const useStoreCategory = () => {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  return useQuery({
    queryKey: ["category", storeId],
    queryFn: fetchCategory,
    enabled: !!storeId,
  });
};

export default useStoreCategory;
