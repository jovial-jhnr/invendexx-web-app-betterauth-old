import { useSession } from "../../hooks/useSession";
import { LogOut } from "lucide-react";
import signOut from "@/auth/signout";

function ThankYou() {
  const { data: user } = useSession();

  return (
    <>
      <div>
        <div className="header">
          <h1 className="text-center font-bold text-3xl pt-6">
            THANK YOU FOR SUBSCRIBING
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center h-screen">
          <div>
            <img
              src="/Invendexx Dpage-1.png" // Replace with a real dashboard image
              alt="Inventory Management Dashboard Preview"
              className="w-full  max-w-xl my-8 mx-auto bg-gray-100 border border-blue-200 block shadow-lg rounded-lg"
            />
          </div>

          <section className="font-bold text-xl">
            Please Logout for Subscription to take effect. Thank you
          </section>
          <section className="font-bold text-xl">Login Again</section>

          {!session?.user && (
            <section>You must login in to see the logout button ‼️‼️</section>
          )}
          {session?.user && (
            <div className="pt-6">
              <button
                className="text-red-500 font-bold text-lg bg-gray-100 p-2 rounded-md"
                onClick={() => {
                  signOut();
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ThankYou;
