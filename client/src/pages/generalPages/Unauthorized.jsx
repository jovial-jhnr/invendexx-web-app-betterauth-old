import {Link} from "react-router";
import React from "react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-8">You do not have permission to view this page.</p>
      <Link to="/signin" className="text-blue-500 hover:underline">
        Go to Sign In
      </Link>
        <Link to="/" className="text-blue-500 hover:underline mt-4">
            Go to Home
        </Link>
    </div>
  );
}