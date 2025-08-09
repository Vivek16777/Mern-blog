import React from "react";
import { useSelector } from "react-redux";
import { ModalHeader, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { supabase } from "../supabaseClient.js";
import { Alert } from "flowbite-react";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
} from "../Redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Spinner } from "flowbite-react";
import { Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [Usererror, setError] = useState("");
  const { loading, error: errorMessages } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const [imageLoading, setImageLoading] = useState(false);

  const errorZero = () => {
    setError("");
  };

  const uploadImage = async () => {
    setImageLoading(true);
    if (!imageFile) return;

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { data, error } = await supabase.storage
      .from("profile-images")
      .upload(fileName, imageFile, {
        cacheControl: "0",
        upsert: false,
      });

    if (error) {
      setImageLoading(false);
      setError(error.message);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    const publicUrl = publicData.publicUrl;
    console.log("Public URL:", publicUrl);
    setImageLoading(false);
    setImageFileUrl(publicUrl);
    setFormData({ ...formData, profilePicture: publicUrl });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setError(null);
    if (Object.keys(formData).length === 0) {
      setError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("user profile updated successfully");
        setError("");
      }
    } catch (error) {
      updateFailure(error.message);
      setError(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className="max-w-lg mx-auto pd-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          onClick={errorZero}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] "
          />
        </div>
        {imageLoading ? (
          <div className="flex justify-center items-center">
            <Spinner size="sm" />
            <span className="pl-3">Uploading image...</span>
          </div>
        ) : (
          ""
        )}
        {error && (
          <Alert className="flex justify-center" color="failure">
            {error}
          </Alert>
        )}
        {Usererror && (
          <Alert className="flex justify-center" color="failure">
            {error}
          </Alert>
        )}
        <TextInput
          onClick={errorZero}
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          onClick={errorZero}
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          onClick={errorZero}
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-br w-full from-purple-600
         to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-white"
          disabled={imageLoading || loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModel(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-4 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDeleteUser}>
                yes,I'm sure
              </Button>
              <Button onClick={() => setShowModel(false)}>No,cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
