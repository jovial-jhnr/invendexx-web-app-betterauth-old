import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AddLocationModal,
  EditLocationModal,
} from "@/Modal/LocationModal/LocationModal";
import LocationTable from "@/components/tables/store-tables/locations-table/location-table";
import LocationStoreStats from "@/dashboard-stats/store-dashstats/location-store-stats";

function LocationV1() {
  console.log(1);
  return (
    <>
      <div>
        {/* Header title */}
        <div className="m-3">
          <h1 className="text-2xl font-semibold">Locations</h1>
          {/* <p className="text-sm">This is the Products page.</p> */}
        </div>

        {/* Stats */}
        <div className="m-1">
          <LocationStoreStats />
        </div>

        {/* Location modal */}
        <div className="m-2 gap-1 flex flex-row justify-end">
          <AddLocationModal />
        </div>

        {/* Body content */}
        <div>
          <div>
            <Tabs defaultValue="all-locations">
              <TabsList>
                <TabsTrigger value="all-locations">All</TabsTrigger>
                <TabsTrigger value="disabled">Disabled</TabsTrigger>
                <TabsTrigger value="deactivated">Deactivated</TabsTrigger>
              </TabsList>

              <TabsContent value="all-locations">
                <div>
                  <div>
                    <LocationTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="disabled">
                <div>
                  <div>
                    <LocationTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deactivated">
                <div>
                  <div>
                    <LocationTable />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationV1;
