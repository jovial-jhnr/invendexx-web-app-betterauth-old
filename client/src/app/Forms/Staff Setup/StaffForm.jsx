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
import { Switch } from "@/components/ui/switch";
  

export default function StaffForm({ className }) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      
      <div className="grid gap-2">
        <Label htmlFor="name">Staff Name</Label>
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

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input type="text" id="location" placeholder="Headquaters" />
      </div>

      {/* Select option For staff type */}
      <div className="grid gap-2">
        <Label htmlFor="Role">Role</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Role</SelectLabel>
              <SelectItem value="role">Staff</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Select option For staff location type */}
      <div className="grid gap-2">
        <Label htmlFor="Role">Location</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Location</SelectLabel>
              <SelectItem value="location">Head Quaters</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Staff Perssions */}
      <span>
        <Label htmlFor="permissions">Permissions</Label>
        <p className="text-sm text-muted-foreground">
          Permissions to set for staffs.
        </p>
      </span>

        <div className="flex items-center space-x-2">
            <span><Label htmlFor="manage_products" >
                Manage Products
            </Label>
            <p className="text-sm text-muted-foreground">
                Let staff manage products.
            </p>
            </span>
            <Switch id="manage_financials"
                defaultChecked={false} 
            />
        </div>

        < div className="flex items-center space-x-2">
            <span><Label htmlFor="manage_financials" >
                Manage Financials
            </Label>
            <p className="text-sm text-muted-foreground">
                Let staff manage financials.
            </p>
            </span>
            <Switch id="manage_financials"
                defaultChecked={false} 
            />
        </div>

        <div className="flex items-center space-x-2">
            <span><Label htmlFor="manage_customers" >
                Manage Customers
            </Label>
            <p className="text-sm text-muted-foreground">
                Let staff manage customers.
            </p>
            </span>
            <Switch id="manage_customers"
                defaultChecked={false} 
            />
        </div>

        <div className="flex items-center space-x-2">
            <span><Label htmlFor="manage_orders" >
                Manage Orders
            </Label>
            <p className="text-sm text-muted-foreground">
                Let staff manage orders.
            </p>
            </span>
            <Switch id="manage_orders"
                defaultChecked={false} 
            />
            
        </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Description (Optional)</Label>
        <Textarea type="textarea" id="notes" 
         placeholder="Description on Staff Here" />
      </div>

      <Button type="submit">Create Staff</Button>
      
    </form>
  );
}
