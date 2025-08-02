import React from "react";
import StoreSettingsModal from "@/app/Modal/StoreSettingsModals/StoreSettingsModal";
import DashboardCard from "@/components/ui/dashboard-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

function StoreDetailsV1() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  // console.log("Store Details:", activeOrganization);

  return (
    <>
      <div className="">
        <div className="m-2">
          <h1 className="text-xl font-medium my-2">Store Settings</h1>
          <p>Manage account settings </p>
        </div>

        {/* Account Settings Button */}
        <div className="text-end mr-2">
          <StoreSettingsModal />
        </div>

        <div className="m-3 md:m-12">
          <DashboardCard>
            <section className="m-2">Store Avatar</section>
            <div className="flex justify-center">
              <Avatar className="rounded-full size-20">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Store Logo"
                />
                <AvatarFallback>
                  {activeOrganization?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <section className="m-2">Store Information</section>

            <div className="text-start my-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input type="text" value={activeOrganization?.name} readOnly />
            </div>

            <div className="text-start gap-2 my-2">
              <Label htmlFor="biz-name">Business Name</Label>
              <Input
                type="text"
                id="biz-name"
                value={activeOrganization?.businessName}
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="storeUrl">Store Url</Label>
              <Input
                type="text"
                value={activeOrganization?.storeUrl}
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="storeTag">Store Tag</Label>
              <Input
                type="text"
                value={activeOrganization?.storeTag}
                readOnly
              />
            </div>

            <div className="text-start gap-2 my-2">
              <Label htmlFor="number">Contact Number</Label>
              <Input
                type="text"
                id="p-number"
                value={activeOrganization?.phoneNumber}
                readOnly
              />
            </div>

            <div className="text-start gap-2 my-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                type="text"
                id="currency"
                value={activeOrganization?.storeBaseCurrency}
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="address">Address</Label>
              <Input type="text" value={activeOrganization?.address} readOnly />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="city">City/Town</Label>
              <Input type="text" value={activeOrganization?.city} readOnly />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="region">Region</Label>
              <Input
                type="region"
                value={activeOrganization?.region}
                readOnly
              />
            </div>

            <div className="text-start my-3">
              <Label htmlFor="country">Country</Label>
              <Input type="text" value={activeOrganization?.country} readOnly />
            </div>

            <section className="m-2">Store Social Media Links</section>

            <div className="text-start my-2">
              <Label htmlFor="tiktok">Tiktok Link</Label>
              <Input
                type="text"
                placeholder="Egs. https://tiktok.com/@yourusername"
                value={activeOrganization?.tiktok}
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="instagram">Instagram Link</Label>
              <Input
                type="text"
                value={activeOrganization?.instagram}
                placeholder="Egs. https://instagram.com/username"
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="facebook">Facebook Link</Label>
              <Input
                type="text"
                placeholder="Egs. https://facebook.com/username"
                value={activeOrganization?.facebook}
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="twitter">Twitter (X) Link</Label>
              <Input
                type="text"
                placeholder="Egs. https://x.com/username"
                value={activeOrganization?.twitter}
                readOnly
              />
            </div>

            <div className="text-start my-2">
              <Label htmlFor="linkedin">LinkedIn Link</Label>
              <Input
                type="text"
                placeholder="Egs. https://linkedin.com/username"
                value={activeOrganization?.linkedin}
                readOnly
              />
            </div>

            {/* <div className="text-start my-2">
              <Label htmlFor="country">Country</Label>
              <Input type="text" value={activeOrganization?.country} readOnly />
            </div> */}
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

export default StoreDetailsV1;
