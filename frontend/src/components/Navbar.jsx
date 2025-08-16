import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "/images/logo-black.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiLogIn } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import avatarImage from "/images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/helpers/showToast";
import { removeUser } from "@/redux/user/user.slice";
import {
  RouteAddNews,
  RouteDashboard,
  RouteIndex,
  RouteNews,
  RouteNewsByCategory,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";
import { IoMdSearch } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Menu, X } from "lucide-react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  //  console.log(user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      Cookies.remove("token");
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/category/all`)
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error);
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <nav className="fixed left-0 top-0 w-full bg-white shadow-md z-40 transition-all duration-300 mt-8">
      <div className="max-w-8xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link to={RouteIndex}>
            <img src={logo} alt="Logo" className="w-14 h-10" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 font-bold">
          <Link to={RouteIndex} className="nav-link hover:text-[#1B9CFC]">
            Home
          </Link>
          <Link to={RouteNews} className="nav-link hover:text-[#1B9CFC]">
            News
          </Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center gap-1 nav-link hover:text-[#1B9CFC]"
            >
              Categories
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    to={RouteNewsByCategory(category.slug)}
                    onClick={() => setIsCategoriesOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="nav-link hover:text-[#1B9CFC]">
            About
          </Link>
          <Link to="/contact" className="nav-link hover:text-[#1B9CFC]">
            Contact
          </Link>
        </div>

        {/* Search + Auth */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden lg:block w-64">
            <SearchBox />
          </div>

          {/* User / Sign In */}
          {!user.isLoggedIn ? (
            <Button asChild className="rounded-full">
              <Link to={RouteSignIn}>
                <FiLogIn /> Sign In
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user?.avatar || avatarImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user?.user?.name}</p>
                  <p className="text-sm capitalize">
                    <b>Role:</b> {user?.user?.role}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={RouteProfile} className="hover:cursor-pointer">
                    <FaRegUser /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={RouteDashboard} className="hover:cursor-pointer">
                    <MdDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:cursor-pointer"
                >
                  <BiLogOut color="red" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 text-2xl"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`fixed inset-y-0 top-6 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col items-start justify-between p-4 border-b font-bold space-y-4">
          <Link
            to={RouteIndex}
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#1B9CFC]"
          >
            Home
          </Link>
          <Link
            to={RouteNews}
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#1B9CFC]"
          >
            News
          </Link>
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="flex items-center gap-1 hover:text-[#1B9CFC]"
          >
            Categories
            <svg
              className={`w-4 h-4 transition-transform ${
                isCategoriesOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isCategoriesOpen && (
            <div className="flex flex-col gap-2 pl-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={RouteNewsByCategory(category.slug)}
                  onClick={() => {
                    setIsCategoriesOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  className="hover:text-[#1B9CFC]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#1B9CFC]"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#1B9CFC]"
          >
            Contact
          </Link>

          <div className="pt-2">
            <SearchBox />
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
