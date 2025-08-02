import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
  TextInput
} from 'flowbite-react';
import { Link,useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';


export default function Header() {
  const path=useLocation().pathname;
  return (
    <Navbar className="border-b-2" fluid rounded>
      <NavbarBrand as={Link} to="/">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Note's</span>
        <span className="ml-2 text-sm sm:text-xl font-semibold dark:text-white">Circle</span>
      </NavbarBrand>
      <form className="hidden lg:inline">
        <TextInput
          type="text"
          placeholder="search..."
          icon={AiOutlineSearch}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                 Sign In
              </span>
          </button> 
        </Link>
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path==="/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/About" active={path==="/About"}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/Projects" active={path==="/Projects"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
