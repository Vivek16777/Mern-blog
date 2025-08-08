import React from 'react'
import {useSelector} from 'react-redux';
import { TextInput } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { supabase } from '../supabaseClient.js'; 
import { Alert } from 'flowbite-react';

export default function DashProfile(){
  const {currentUser} = useSelector(state => state.user);
  const [imageFile,setImageFile] = useState(null);
  const [imageFileUrl,setImageFileUrl] = useState(null);
  const [error,setError] = useState("");
  const filePickerRef = useRef();
  const handleImageChange=(e)=>{
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
 useEffect(()=>{
  if(imageFile){
    uploadImage();
  }
 },[imageFile]);

 const uploadImage = async () => {
    if (!imageFile) return;

  const fileName = `${Date.now()}-${imageFile.name}`;

  
  const { data, error } = await supabase.storage
    .from("profile-images") 
    .upload(fileName, imageFile, {
      cacheControl: "0",
      upsert: false,
    });

  if (error) {
    setError(error.message);
    return;
  }

  console.log("Upload success:", data);

  const { data: publicData } = supabase.storage
    .from("profile-images")
    .getPublicUrl(fileName);

  const publicUrl = publicData.publicUrl;
  console.log("Public URL:", publicUrl);

  setImageFileUrl(publicUrl);
 }
  return (
    <div className="max-w-lg mx-auto pd-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>filePickerRef.current.click()}>
        <img src={imageFileUrl||currentUser.profilePicture} alt="user" className="rounded-full w-full h-full border-8 border-[lightgray] "/>
        </div>
        {error && (<Alert className="flex justify-center" color='failure'>{error}</Alert>)}
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username}/>
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}/>
        <TextInput type="password" id="password" placeholder="password"/>
        <Button type="button" className="bg-gradient-to-br w-full from-purple-600
         to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-white">Upload</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}