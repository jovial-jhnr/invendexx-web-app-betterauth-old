import React from "react";
import { Link } from "react-router";
import { X, Menu } from "lucide-react";
import { Separator } from "../ui/separator";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="relative w-full bg-inherit">
      <div className="flex flex-row justify-between p-2 ">
        {/* Logo */}
        <div className="text-blue-600 font-mono font-bold text-2xl">
          Invendexx
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 font-medium">
          <Link
            className="text-inherit hover:text-blue-600 font-inter rounded-md  p-2"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-inherit hover:text-blue-600 font-inter rounded-md  p-2"
            to="/pricing"
          >
            Pricing
          </Link>
          <Link
            className=" hover:text-blue-600 font-inter rounded-md p-2"
            to="/storedashboard"
          >
            Profile
          </Link>
          <Link
            className=" font-inter rounded-md hover:text-blue-600 p-2"
            to="/syntaxdashboard"
          >
            Admin
          </Link>
          <Link
            className=" hover:text-blue-600 font-inter rounded-md  p-2"
            to="/about"
          >
            About
          </Link>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block mt-3">
          <Link
            to="/signin"
            className="text-white mt-2 mr-2 p-2 rounded-md font-arvo
            font-medium hover:bg-red-600 bg-blue-500 shadow-lg hover:shadow-black"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="text-white mt-2 mr-2 p-2 rounded-md font-arvo shadow-lg hover:shadow-black
            font-medium hover:bg-red-600 bg-green-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 ">
            {/* <span className="material-symbols-outlined"> */}
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <Separator />

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col bg-gray-100 text-black p-2">
          <Link
            onClick={() => setIsMenuOpen(false)}
            className=" font-inter rounded-md hover:text-blue-600 p-2"
            to="/"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md font-inter hover:text-blue-600 p-2"
            to="/pricing"
          >
            Pricing
          </Link>

          <Link
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md font-inter hover:text-blue-600 p-2"
            to="/storedashboard"
          >
            Profile
          </Link>

          <Link
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md font-inter hover:text-blue-600 p-2"
            to="/syntaxdashboard"
          >
            Admin
          </Link>

          <Link
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md hover:text-blue-600 p-2"
            to="/about"
          >
            About
          </Link>

          {/* Buttons */}
          <div className="flex flex-row gap-3 justify-end">
            <Link
              to="/signin"
              onClick={() => setIsMenuOpen(false)}
              className="text-white mt-2 p-2 font-arvo rounded-md  font-medium hover:bg-red-600 bg-blue-500"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="text-white mt-2 p-2 rounded-md font-arvo font-medium hover:bg-red-600 bg-green-600"
            >
              Get Started
            </Link>
          </div>
          <Separator />
        </div>
      )}
    </div>
  );
};

export default Header;
