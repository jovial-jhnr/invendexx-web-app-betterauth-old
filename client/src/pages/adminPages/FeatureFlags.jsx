import { Button } from "@/components/ui/button";
import React from "react";
import FeatFlagModal from "@/app/Modal/FeatFlagModal/FeatFlagModal";
// import { useFeatureFlags } from '@/hooks/adminHooks/useFeatureFlags';
import FeatureFlagTable from "@/components/tables/admin-tables/featureflag-tables/featureflag-table";
function FeatureFlags() {
  //   const { data, isLoading, isError, error } = useFeatureFlags();

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <div>
          <div className="ml-2 mt-2">
            <h1 className="font-medium text-lg">FEATURE FLAGS MANAGEMENT</h1>
            <p> Management of feature flags</p>
          </div>
        </div>

        <div className="ml-2 pt-2 pb-2 text-end">
          <FeatFlagModal />

          <Button className="mr-1 text-sm text-white bg-red-600 hover:bg-red-400">
            Edit Flag
          </Button>
        </div>

        <div className="m-2">
          <FeatureFlagTable />
        </div>
      </div>
    </>
  );
}

export default FeatureFlags;
