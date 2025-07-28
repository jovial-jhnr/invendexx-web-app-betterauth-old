import React from "react";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";

function RatingsandReviews() {
  return (
    <>
      <div>
        {/* Header title */}
        <div>
          <h1 className="m-3 text-xl font-semibold"> Ratings and Reviews</h1>
        </div>

        {/* Body content */}
        <div>
          <div>
            <Tabs defaultValue="ratings">
              <TabsList className="text-lg">
                <TabsTrigger className="text-sm" value="ratings">
                  Ratings
                </TabsTrigger>
                <TabsTrigger className="text-sm" value="reviews">
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Content body */}
              <TabsContent value="ratings">
                <div>
                  <p>This side is ratings</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div>
                  <p>This side is Reviews</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingsandReviews;
