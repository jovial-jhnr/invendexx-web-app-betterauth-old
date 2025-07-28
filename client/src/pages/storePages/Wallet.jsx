import React from "react";
import { authClient } from "@/lib/auth-client";

function Wallet() {
  const { data: session, error } = authClient.useSession;
  return (
    <>
      <div>
        {/* Title section of wallet */}
        <div className="">
          <h1 className="text-xl font-inter font-semibold m-2 p-2">
            Wallet System
          </h1>
        </div>

        {/* Main Body */}
        <div>
          {/* Wallet Stats here */}
          <div></div>

          {/* Wallet logs here */}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
