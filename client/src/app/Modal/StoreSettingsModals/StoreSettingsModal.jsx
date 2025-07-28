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
import StaffForm from "../../Forms/Staff Setup/StaffForm";
import StoreSettingsFormV2 from "@/app/Forms/Store Settings/StoreSettingsFormV2";

export default function StoreSettingsModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Store Information</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] max-h-[100vh]">
          <DialogHeader>
            <DialogTitle>Store Settings</DialogTitle>
            <DialogDescription>
              Store settings are used to manage your store information and
              preferences. You can update your store name, address, and others.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <StoreSettingsFormV2 />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Store Information</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[1000vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Store Settings</DrawerTitle>
          <DrawerDescription>
            Store settings are used to manage your store information and
            preferences. You can update your store name, address, and others.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] px-4">
          <StoreSettingsFormV2 />
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" className="bg-red-500">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
