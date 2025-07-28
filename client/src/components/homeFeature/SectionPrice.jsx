import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
// import { useSession } from "@/hooks/useSession";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";
import Spinner from "../ui/spinner";

const Plans = [
  {
    title: "Basic",
    price: "$19 ",
    plan_code: import.meta.env.VITE_BASIC_PLAN_CODE,
    link: import.meta.env.VITE_BASIC_PLANLINK,
    features: ["Access to basic features", "Email support", "5 team members"],
    isPlaceholder: false,
  },
  {
    title: "Standard",
    price: "$49",
    plan_code: import.meta.env.VITE_STANDARD_PLAN_CODE,
    link: import.meta.env.VITE_STANDARD_PLANLINK,
    features: [
      "All Starter features",
      "Priority support",
      "50 team members",
      "Advanced reporting",
    ],
    isPlaceholder: true,
  },
  {
    title: "Premium",
    price: "$99",
    plan_code: import.meta.env.VITE_PREMIUM_PLAN_CODE,
    link: import.meta.env.VITE_PREMIUM_PLANLINK,
    features: [
      "All Professional features",
      "24/7 support",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated account manager",
    ],
    isPlaceholder: false,
  },
];

function SectionPrice() {
  // const { data: user } = useSession();

  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  if (isPending) {
    <Spinner />;
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-notoserif font-bold text-gray-800 mb-10">
          Choose the Perfect Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 m-2 gap-8">
          {Plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl 
               transition duration-300 flex flex-col items-center"
            >
              {plan.isPopular === true && (
                <Badge className="absolute top-10 right-10 rotate-[45deg] rounded-none px-10 uppercase translate-x-1/2 -translate-y-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-lg font-semibold font-serif text-gray-800 mb-4">
                {plan.title}
              </h3>

              <p className="text-blue-600 font-bold font-inter text-4xl mb-6">
                {plan.price} / month
              </p>

              <ul className="space-y-4 text-left w-full mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center ">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700 font-inter text-center">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {session?.user ? (
                <a
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white
                   font-semibold py-3 rounded-lg text-center transition"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${plan.link}?email=${email}`}
                  readOnly
                >
                  Subscribe
                </a>
              ) : (
                <Link
                  to="/signup"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-center transition"
                >
                  Sign Up to Subscribe
                </Link>
              )}
            </div>
          ))}
        </div>

        <div
          className="text-balance text-center text-md mt-4 text-muted-foreground 
              [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-black"
        >
          Before you subscribe to a plan, create an account first on the
          platform.
        </div>
      </div>
    </section>
  );
}

export default SectionPrice;
