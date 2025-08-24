import AddProductModal from "@/Modal/Product/ProductModal";
import { StatCard } from "@/components/DashFeature/StoreFeatures/storeCharts/StatCard.jsx";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

function LocationBranch() {
  const { locationId } = useParams(); // 👈 grab the dynamic part from the URL

  return (
    <>
      <div>
        <div className="header m-2">
          <h1 className="text-xl font-medium">Location Branch</h1>
          <p className="font-medium">Branch summary</p>
        </div>
        <div className="page-btn text-end m-3">
          <AddProductModal />
        </div>
        <div className="m-1 pl-2">
          <StatCard />
        </div>
        <div className="body"></div>
      </div>
    </>
  );
}

export default LocationBranch;
