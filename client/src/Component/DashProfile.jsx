import React from 'react'
import {useSelector} from 'react-redux';
import { TextInput } from 'flowbite-react';
import { Button } from 'flowbite-react';

export default function DashProfile(){
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="max-w-lg mx-auto pd-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
        <img src={currentUser.profilePicture} alt="user" className="rounded-full w-full h-full border-8 border-[lightgray] "/>
        </div>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}/>
        <TextInput type="password" id="password" placeholder="password"/>
        <Button type="button" class="text-white bg-gradient-to-br from-purple-600
         to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" outline>Submit</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}