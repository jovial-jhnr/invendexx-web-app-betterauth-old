import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

function FeatFlagForm({ className }) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="featflag-name">Feature Flag Name</Label>
        <Input type="text" id="featflag-name" placeholder="e.g. Dashboard UI" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="featflag-slug">
          Feature Flag Slug (egs. new_dashboard)
        </Label>
        <Input type="text" id="feat-slug" placeholder="e.g. new_dashboard" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="featflag-rollout">Rollout Percentage</Label>
        <Input type="number" id="featflag-rollout" placeholder="e.g. 20" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="featflag-switch">Feature Flag Switch</Label>
          <p className="text-sm text-muted-foreground">
            Turn on / off feature flag
          </p>
        </div>

        <Switch
          id="featflag-switch"
          defaultChecked={false}
          className="data-[state=checked]:bg-green-500 
          data-[state=unchecked]:bg-red-500"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="featflag-description">Description (Optional)</Label>
        <Textarea
          id="featflag-description"
          placeholder="Description of the feature flag"
        />
      </div>

      <Button type="submit">Create Feature Flag</Button>
    </form>
  );
}

export default FeatFlagForm;
