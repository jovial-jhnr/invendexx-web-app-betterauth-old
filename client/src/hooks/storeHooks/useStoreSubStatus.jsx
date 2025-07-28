/* This hook is used to fetch stores subscription status fom the backend and database */

import { useQuery } from "@tanstack/react-query";
import useStore from "../useStore";

const getSubscriptionStatus = async ({ queryKey }) => {
  const [_key, storeId] = queryKey;
  const response = await backendUrl.get(
    `stores/store/${storeId}/subscriptions/get-subscription-status`
  );
  return response.data.result;
};

const useStoreSubStatus = () => {
  const { data: store } = useStore();
  const storeId = store?.id;
  console.log(store);

  return useQuery({
    queryKey: ["subStatus", storeId],
    queryFn: getSubscriptionStatus,
    enabled: !!storeId,
  });
};

export default useStoreSubStatus;
