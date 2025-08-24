import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar"
import {CalendarIcon} from "lucide-react"
import React from "react";
import { format } from "date-fns";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectLabel,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ExpensesForm({ className }) {
    const [date, setDate] = React.useState(null);

  return (

    <form className={cn("grid items-start gap-4", className)}>
      
      <div className="grid gap-2">
        <Label htmlFor="name">Expense Name</Label>
        <Input type="text" id="name" placeholder="Books" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Amount</Label>
        <Input type="text" id="amount" placeholder="GH 1000"/>
      </div>

      <div className="grid gap-2">
      <Label htmlFor="date">Date</Label>
      <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
     </Popover>
  
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input type="text" id="location" placeholder="Headquaters" />
      </div>

      {/* Select option For staff type */}
      <div className="grid gap-2">
        <Label htmlFor="Role">Payment Method</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Payment Method</SelectLabel>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="mobile-money">Mobile Money</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Select option For staff location type */}
      <div className="grid gap-2">
        <Label htmlFor="Role">Payment Status</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Payment Status</SelectLabel>
              <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partially-paid">Partially Paid</SelectItem>
                <SelectItem value="not-paid">Not Paid</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Staff Perssions
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
        </div> */}

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea type="textarea" id="notes" 
         placeholder="Description on Staff Here" />
      </div>

      <Button type="submit">Save Changes</Button>
      
    </form>
  );
}
