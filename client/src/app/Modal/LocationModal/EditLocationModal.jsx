import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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

import EditLocationForm from "@/app/Forms/Locations/AddLocationForm";

export default function EditLocationModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Location</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] max-h-[100vh]">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>Add details of location here</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <EditLocationForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Location</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[1000vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Location</DrawerTitle>
          <DrawerDescription>Add location details here</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] px-4">
          <EditLocationForm />
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
