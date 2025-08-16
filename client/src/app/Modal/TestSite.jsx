import AddProductForm from "../Forms/Product/add-product-form";

// components/StatCard.js
import DashboardCard from "@/components/ui/dashboard-card";
import Spinner from "@/components/ui/spinner";
import backendUrl from "@/lib/backendUrl";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

import {
  Users,
  PackageOpen,
  ShoppingBasket,
  Banknote,
  PackageCheck,
  MapPinCheckInside,
  MapPinCheckInsideIcon,
} from "lucide-react";
import NormalModalLayout from "./NormalModalLayout";

// Main function
export default function TestSite() {
  const stats = [
    {
      title: "Add Product Form",
      action_button: "ADD PRODUCT",
      description:
        "Add the product images description and other charateristics here",
    },
  ];

  return (
    <div className="">
      {stats.map((stat, index) => (
        <NormalModalLayout
          key={index}
          title={stat.title}
          description={stat.description}
          action_button={stat.button}
        >
          <div className="text-xl mx-2">
            <AddProductForm />
          </div>
        </NormalModalLayout>
      ))}
    </div>
  );
}
