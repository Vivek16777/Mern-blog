import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signoutSuccess } from "../Redux/user/userSlice";
import { useDispatch } from "react-redux";
import React from "react";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
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
    <div>
      <Sidebar className="md:h-screen w-full md:w-60">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              as={Link}
              to="/dashboard?tab=profile"
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
            >
              Profile
            </SidebarItem>
            <SidebarItem
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handleSignout}
            >
              sign out
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
}
