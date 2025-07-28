import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectLabel,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
  

export default function CustomerForm({ className }) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Hoodinie" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="shadcn@example.com" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone number">Phone Number</Label>
        <Input type="text" id="phnone number" placeholder="0240000000" />
      </div>

      {/* Select optionn For cus type */}
      <div className="grid gap-2">
        <Label htmlFor="customer type">Customer Type</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Customer Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select customer type</SelectLabel>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="returning">Returning</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea type="textarea" id="notes" placeholder="Type Notes about Customer Here" />
      </div>

      <Button type="submit">Create Customer</Button>
      
    </form>
  );
}
