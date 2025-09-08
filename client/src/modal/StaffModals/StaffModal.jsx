import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ScrollArea } from "@/components/ui/scroll-area"; // make sure this import is here
import StaffForm from "@/Forms/staff-setup/staff-form";

export default function StaffModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">New Staff</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] max-h-[100vh]">
          <DialogHeader>
            <DialogTitle>Create Staff</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <StaffForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">New Staff</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[1000vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Staff</DrawerTitle>
          <DrawerDescription>
            Staff is created here for the first time.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] px-4">
          <StaffForm />
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
