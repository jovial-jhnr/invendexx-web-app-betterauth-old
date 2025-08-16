import { useSession } from "@/hooks/useSession";
// import { useSubscription } from "@/hooks/useSubscription";
import { usePlans } from "@/hooks/usePlans";
import backendUrl from "@/lib/backendUrl";
import InfoCard from "@/components/ui/infocard";
import { CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";

export default function PlansandBillingsV1() {
  // Fetching user session data
  const { data: session } = authClient.useSession();

  // Fetching subscription and plans
  // const { data: subscription, isLoading: loadingSubscription } =
  //   useSubscription();
  const { data: plans, isLoading: loadingPlans } = usePlans();

  // Sign up for a subscription plan
  const signUpForPlan = async (plan_code) => {
    const firstName = session?.user?.firstName;
    const lastName = session?.user?.lastName;
    const email = session?.user?.email;

    const { data } = await backendUrl.post(
      "/api/paystack/initialize-transaction-with-plan",
      {
        email: email,
        amount: "1000",
        plan: plan_code,
        first_name: firstName,
        last_name: lastName,
      }
    );
    // Payment Link
    const authorizationUrl = data?.authorization_url;

    if (authorizationUrl) {
      window.open(authorizationUrl, "_blank");
    }
  };

  // Manage existing subscription
  // const manageSubscription = async () => {
  //   const sub = subscription[0];
  //   const { data } = await backendUrl.get(
  //     `api/paystack/update-payment-method?subscription_code=${sub.subscription_code}`
  //   );
  //   if (data?.link) {
  //     window.location.href = data.link;
  //   }
  // };

  // Loading state
  // if (loadingSubscription || loadingPlans) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <Spinner />
  //     </div>
  //   );
  // }

  // If user has an active subscription
  return (
    <>
      <div>
        <div className="m-3 text-2xl text-center font-bold">
          <h1>PLAN AND BILLING</h1>
        </div>

        <div>
          <Tabs defaultValue="plans">
            <TabsList className="m-3 border border-blue-700">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscription</TabsTrigger>
            </TabsList>

            {/* The plan content section  */}
            <TabsContent value="plans">
              <div>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                  {plans?.map((plan, idx) => (
                    <div
                      key={idx}
                      className="border  border-green-500 rounded-xl text-center shadow p-4"
                    >
                      <h3 className="text-lg font-semibold">{plan?.name}</h3>
                      <p className="text-gray-400 font-bold">
                        {plan?.currency} {plan?.amount / 100}/month
                      </p>
                      <p className="text-sm mb-3">{plan?.description}</p>
                      <button
                        onClick={() => signUpForPlan(plan?.plan_code)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Subscribe to GHS {plan?.amount / 100}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Subscriptions Content */}
            <TabsContent value="subscriptions">
              <div>
                <div className="p-4">
                  <h2 className="text-md font-semibold">
                    Hello, {session?.user?.firstName}
                  </h2>
                  <p>Account email: {session?.user?.email}</p>
                  {/* <p>
                    You’re currently on the <strong>{plans?.name}</strong> plan
                  </p>
                  <p>Subscription status: {sub.status}</p>
                  <p>Subscription Code: {sub.subscription_code}</p>
                  <p>Name on payment is: {authorization?.account_name}</p>
                  <p>Made payment with: {authorization?.channel}</p>
                  <p>Bank Name: {authorization?.bank}</p>
                  <p>
                    Card: brand is {authorization?.brand} ending in{" "}
                    {authorization?.last4} — Expires {authorization?.exp_month}/
                    {authorization?.exp_year}
                  </p>
                  <p>
                    Next payment:{" "}
                    {new Date(sub.next_payment_date).toLocaleDateString()}
                  </p> */}
                  {/* 
                  <button
                    className="text-blue-500 underline mt-2"
                    onClick={manageSubscription}
                  >
                    Manage Subscription
                  </button> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
