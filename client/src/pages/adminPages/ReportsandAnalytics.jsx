import ReportsDashCard from "@/components/DashFeature/SyntaxFeatures/syntaxCharts/ReportsDashCard";
import { Button } from "@/components/ui/button";

function ReportsandAnalytics() {
  return (
    <>
      <div>
        <div>
          {/* Header of the Page */}
          <div className="reports-head m-3">
            <h1 className="font-medium ">Reports and Analytics</h1>
            <p>Manage reports and analytics</p>
          </div>

          {/* Analytics Dash Buttons */}
          <div className=" text-end ml-2 pt-2">
            <Button className="mr-2 bg-green-600 hover:bg-green-400 ">
              Export
            </Button>

            <Button className=" mr-2 bg-white hover:bg-green-500 text-green-600 hover:text-white">
              Refresh
            </Button>
          </div>

          <div className="m-0">
            <ReportsDashCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportsandAnalytics;
