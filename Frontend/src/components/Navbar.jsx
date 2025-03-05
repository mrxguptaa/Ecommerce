import {
  ShoppingCart,
  Menu,
  X,
  House,
  Store,
  SquarePen,
  HandHelping,
  KeyRound,
  CirclePlus,
  LogOut,
  // Profiles,
  Bell,
  CircleUserRound,
} from "lucide-react"; //Icons Imported
import { Link } from "react-router-dom"; // Link for another page imported
import { useState , useEffect } from "react"; // use state Imported
import logo from "../assets/logo.svg"; // Import Logo
import SearchBar from "../components/Search_bar";
import { UserContext } from "../utilityFunciton/HelpContex";
import { useContext } from "react";
// import React from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// Everything Imported

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false); // Show Navar for Mobile devices
  const [isOpen, setIsOpen] = useState(false); // Change bar to X when clicked
  const [loading, setLoading] = useState();
  const [isLogin , setLogin] = useState(false)
  const currUserData=useContext(UserContext)
  // const userName = localStorage.getItem("userEmail");

  // Responsive Nav Function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsVisible(!isVisible);
  };
  
  return (
    <>
      {/* //Navbar Start here
      // This Div is the parent div of both mobile and big devices */}
      <div className="relative z-50 flex ">
        {/* This is Hamburger for mobile devices  */}

        <button onClick={toggleMenu} className="m-2 basis-1/12 md:hidden">
          {isOpen ? (
            <X className={`w-8 h-8 transition-all duration-300 ${currUserData.user ? 'text-green-400' : ''}`} />
          ) : (
            <Menu className={`w-8 h-8 transition-all duration-300 ${currUserData.user ? 'text-green-600' : ''}`} />
          )}
        </button>

        {/* Hamburger Done  */}

        {/* This is the Navbar for md or larger devices  */}
        <div className="flex justify-center md:justify-between items-center flex-grow">
          <div className="md:basis-1/12 text-center flex justify-center items-center">
            <Link to="/">
              <img src={logo} alt={logo} className="w-[50px] mt-1" />{" "}
            </Link>
          </div>

          {/* Search bar Div  */}
          <SearchBar className="hidden md:flex" />

          {/* Nav bar right side Buttons */}
          <ul className="flex">
            <li className="p-1 hover:bg-gray-300">
              <Link to="/" className="nav_elements">
                Home
              </Link>
            </li>

            <li className="p-1 hover:bg-gray-300">
              <Link to="/about" className="nav_elements">
                About
              </Link>
            </li>

            <li className="p-1 hover:bg-gray-300">
              <Link to="/Shop" className="nav_elements">
                Shop
              </Link>
            </li>

            <li className="p-1 hover:bg-gray-300">
              <Link to="/Help" className="nav_elements">
                Help
              </Link>
            </li>

            {currUserData.user? (
              <>
              <li className="p-1 hover:bg-gray-300">
              <Link to="/cart" className="nav_elements">
                <ShoppingCart />
              </Link>
            </li>

            <li className="p-1 hover:bg-gray-300">
              <Link to="/Notification" className="nav_elements">
                <Bell />
              </Link>
            </li>
              <li className="p-1 hover:bg-gray-300 flex">
                <Link to="/Logout" className="nav_elements px-0">
                  <LogOut />
                </Link>
              </li>
              <li className="p-1 hover:bg-gray-300">
              <Link to="/Profile" className="nav_elements">
                <CircleUserRound />
              </Link>
            </li>
              </>
              ) : (
              <li className="p-1 hover:bg-gray-300 flex">
                <Link to="/Login" className="nav_elements px-0">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* This is the Navbar for Mobile Devices  */}
        <ul
          className={`text-sm p-2 transition-all duration-300 flex flex-col w-4/6 absolute mt-[10vh] bg-white h-[90vh] overflow-hidden z-100 ${
            isVisible ? "transalte-x-2" : "-translate-x-[100%]"
          }`}
        >
          <li className="p-1 hover:bg-gray-300">
            <Link
              to="/"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <House /> Home{" "}
            </Link>
          </li>

          <li className="p-1 hover:bg-gray-300">
            <Link
              to="/about"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <SquarePen /> About
            </Link>
          </li>

          <li className="p-1 hover:bg-gray-300">
            <Link
              to="/Shop"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <Store />
              Shop
            </Link>
          </li>

          <li className="p-1 hover:bg-gray-300">
            <Link
              to="/Help"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <HandHelping />
              Help
            </Link>
          </li>

          {currUserData.user ? <>
            <li className="p-1 hover:bg-gray-300">
            <Link
              to="/cart"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <ShoppingCart />
              View Cart
            </Link>
          </li>
            <li className="p-1 hover:bg-gray-300">
            <Link
              to="/Profile"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <CircleUserRound />
              Profile
            </Link>
          </li>
          <li className="p-1 hover:bg-gray-300">
            <Link
              to="/Logout"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <LogOut />
              Logout
            </Link>
          </li>
          </>
          : 
          <>
            <li className="p-1 hover:bg-gray-300">
            <Link
              to="/login"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <KeyRound />
              Login
            </Link>
          </li>

          <li className="p-1 hover:bg-gray-300">
            <Link
              to="/Signup"
              className="flex items-center gap-1 py-2 hover:border-l-2 px-2 border-l-black md:hidden"
              onClick={toggleMenu}
            >
              <CirclePlus />
              Signup
            </Link>
          </li>
          </>}

          

          

          
        </ul>
        {/* Mobile Devices Done here  */}
      </div>
    </>
  );
};

export default Navbar;
