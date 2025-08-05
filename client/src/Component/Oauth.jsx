import React from 'react'
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth";
import {app} from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () =>{
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:'select_account'});
    try{
      const resultFromGoogle = await signInWithPopup(auth,provider);
      const res = await fetch('/api/auth/google',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        })
      });
      const data = await res.json();
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <Button className=" w-full flex flex-shrink-0 items-center justify-center p-1 mb-1 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" onClick={handleGoogleClick}>
    <span className=" w-full h-full py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent flex justify-center align-middle">
      <AiFillGoogleCircle className=" w-6 h-6 mr-1"/>Continue with Google
    </span>
    </Button>
  )
}

export default Oauth
