import LocationOverviewTable from "@/components/tables/admin-tables/locations-overview-table/locations-overview-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LocationOverviewV1() {
  return (
    <>
      <div>
        {/* Heading  */}
        <div>
          <h1 className="m-3 text-xl font-semibold">Location Overview</h1>
        </div>

        {/* Body */}
        <div>
          <div className="text-start">
            <Button>Location Button</Button>
          </div>

          {/* Stats */}

          {/* Table */}
          <div>
            <LocationOverviewTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationOverviewV1;
