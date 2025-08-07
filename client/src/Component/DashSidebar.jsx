import { Sidebar, SidebarItem,SidebarItemGroup,SidebarItems } from 'flowbite-react'
import {HiUser} from 'react-icons/hi'
import { HiArrowSmRight } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import React from 'react'

export default function DashSidebar(){
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if(tabFormUrl){
    setTab(tabFormUrl);
  }
  }, [location.search]);
  return (
    <div>
      <Sidebar className='md:h-screen w-full md:w-60'>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem as={Link} to='/dashboard?tab=profile' active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark'>
              Profile
            </SidebarItem>
            <SidebarItem icon={HiArrowSmRight} className="cursor-pointer">
              sign out
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  )
}