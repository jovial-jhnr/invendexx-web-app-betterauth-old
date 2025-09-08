import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import BankForm from "@/Forms/banks/bank-form";
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

export default function BankModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-green-500">
            Bank Details
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-[100vh]">
          <DialogHeader>
            <DialogTitle>Bank Details Settings</DialogTitle>
            <DialogDescription>Bank Details Information</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <BankForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Bank Details</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[1000vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle> Bank Details Settings</DrawerTitle>
          <DrawerDescription>Bank Details Information</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[70vh] px-4">
          <BankForm />
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
