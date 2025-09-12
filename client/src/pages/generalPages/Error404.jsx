import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useSession } from "@/hooks/useSession";

export default function Error404() {
  const navigate = useNavigate();

  const { data: user } = useSession(); // FIX: useSession is a hook, call it as a function

  const handleGoBack = () => {
    if (!user) return;

    if (user?.role === "admin" || user?.role === "app_member") {
      navigate("/syntaxdashboard");
    } else if (user?.role === "store_owner" || user?.role === "staff") {
      navigate("/storedashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-9xl font-bold mb-4">404</h1>

        <p className="text-lg font-extrabold mb-8">THIS PAGE DOES NOT EXIST</p>

        <Link
          to="/signin"
          className="text-blue-500 font-medium hover:underline"
        >
          Go to Sign In
        </Link>

        <Link to="/" className="text-blue-500 font-medium hover:underline mb-2">
          Go to Home
        </Link>

        {user && (
          <button
            onClick={handleGoBack}
            className="text-blue-500 hover:underline"
          >
            Go Back
          </button>
        )}
      </div>

      <div className="flex flex-col items-center "></div>
    </>
  );
}
