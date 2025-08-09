import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  TextInput,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Avatar,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/theme/themeslice";
import { signoutSuccess } from "../Redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2" fluid rounded>
      <NavbarBrand className="lg:ml-30" as={Link} to="/">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Note's
        </span>
        <span className="ml-2 text-xl font-semibold dark:text-white">
          Circle
        </span>
      </NavbarBrand>
      <form className="hidden lg:inline">
        <TextInput type="text" placeholder="search..." icon={AiOutlineSearch} />
      </form>
      <Button className="w-12 h-10 lg:hidden " color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex justify-center items-center gap-3 md:order-2 lg:mr-30">
        <Button
          className="w-12 hidden sm:inline h-10 cursor-pointer"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <img
                alt="user"
                src={currentUser.profilePicture}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full "
              />
            }
            className="relative"
          >
            <DropdownHeader>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                @{currentUser.email}
              </span>
            </DropdownHeader>
            <Link to="/Dashboard?tab=profile">
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <button className="flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent flex justify-center align-middle">
                Sign In
              </span>
            </button>
          </Link>
        )}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/About" active={path === "/About"}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/Projects" active={path === "/Projects"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
