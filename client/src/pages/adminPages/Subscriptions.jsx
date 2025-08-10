// import { useAllSubscription } from "@/hooks/useAllSubscriptions";

import SubscriptionV1 from "@/features/admin-features/subscription/SubscriptionV1";

function Subscriptions() {
  // const {data: allsubscription} = useAllSubscription()
  return (
    <>
      <div>
        <SubscriptionV1 />
      </div>
    </>
  );
}

export default Subscriptions;
