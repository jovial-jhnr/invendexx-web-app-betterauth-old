import { Link } from "react-router-dom";
import Inven_dpage_mac from "../../assets/Inven_dpage_mac.png";

export default function Hero() {
  return (
    <>
      <div
        className="light:bg-blue-50  min-h-[450px] flex flex-col md:flex-row
         items-center justify-between px-6 py-10 md:py-20"
      >
        <div className="w-full md:w-1/2 text-left p-4">
          <span
            className=" inline-block p-2 mb-3 light:bg-gray-100 dark:bg-inherit  dark:border-white text-inherit 
           font-semibold font-inter text-sm border border-md rounded-full shadow-sm"
          >
            Best Products for Businesses 🎉
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-mono light:text-gray-900 mb-6">
            Simplify Your Inventory & Boost Your Business
          </h1>
          <p className="text-base font-roboto  sm:text-lg light:text-gray-700 mb-8">
            Track stock levels, manage orders, and analyze sales—all in one
            powerful system. Automate your workflow and prevent stockouts
            effortlessly.
          </p>
          <Link
            className="bg-blue-600 hover:bg-blue-500 sm:text-center px-6 py-3 text-white rounded-lg text-lg font-semibold shadow-md"
            to="/signup"
          >
            Get Started
          </Link>
        </div>

        <div className="w-full lg:w-1/2 md:w-1/2 mb-8 md:mb-0">
          <img
            src={Inven_dpage_mac}
            alt="Inventory system illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
}
