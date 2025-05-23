import React, { useContext, useState, useRef } from "react";
import { AuthContext } from "../Auth/AuthContextProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useEffect } from "react";

// IMAGE HOSTING KEY
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.photoURL || "");
  const [imageData, setImageData] = useState(null);
  const fileInputRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const [uniAddress, setUniAddress] = useState({});

  //   getting data
  const fetchData = async () => {
    const res = await axiosPublic.get(
      `/uni-address?email=${user?.email}&name=${user?.displayName}&image=${user?.photoURL}`
    );
    console.log(res?.data);
    setUniAddress(res?.data);
  };

  useEffect(() => {
    fetchData();
  }, [user?.displayName, user?.photoURL]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      university: user?.university || "",
      address: user?.address || "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageData(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearImageSelection = () => {
    setImageData(null);
    setImagePreview(user?.photoURL || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updateData = {
        name: data.name,
        email: data.email,
        university: data.university,
        address: data.address,
        previousImage: user?.photoURL || null,
        previousName: user?.displayName,
      };

      // Only upload image if a new one was selected
      if (imageData) {
        const formData = new FormData();
        formData.append("image", imageData);

        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          updateData.newImage = res.data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Update profile in database
      const response = await axiosPublic.put(
        "/update-profile-data",
        updateData
      );
      console.log(response?.data);

      if (response.data.modifiedCount) {
        console.log("profile update from server success");

        console.log(data.name, user?.photoURL);

        // Update local user state if needed
        await updateUser({
          displayName: data.name,
          photoURL: updateData.newImage || user?.photoURL,
        });

        toast.success("Profile updated successfully!");
        setIsEditModalOpen(false);
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    reset({
      name: user?.displayName || "",
      email: user?.email || "",
      university: user?.university || "",
      address: user?.address || "",
    });
    setImagePreview(user?.photoURL || "");
    setImageData(null);
    setIsEditModalOpen(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 my-36">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#890C25] to-[#C51F3A] p-6 text-white">
            <h1 className="slab text-3xl font-bold">My Profile</h1>
            <p className="quick mt-2">
              View and manage your account information
            </p>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {user?.photoURL ? (
                    <img
                      className="h-32 w-32 rounded-full object-cover border-4 border-[#890C25]"
                      src={user.photoURL}
                      alt="Profile"
                    />
                  ) : (
                    <FaUserCircle className="h-32 w-32 text-gray-400" />
                  )}
                  <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-4 w-4 border-2 border-white"></span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <h2 className="slab text-xl font-semibold text-gray-800">
                      Personal Information
                    </h2>
                    <div className="mt-2 quick text-gray-600 space-y-2">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {user?.displayName || "Not set"}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {user?.email || "Not set"}
                      </p>
                      <p>
                        <span className="font-semibold">University:</span>{" "}
                        {uniAddress?.university || "Not set"}
                      </p>
                      <p>
                        <span className="font-semibold">Address:</span>{" "}
                        {uniAddress?.address || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="slab text-xl font-semibold text-gray-800">
                      Account Information
                    </h2>
                    <div className="mt-2 quick text-gray-600 space-y-2">
                      <p>
                        <span className="font-medium">Account Created:</span>{" "}
                        {user?.metadata?.creationTime
                          ? new Date(
                              user.metadata.creationTime
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Last Login:</span>{" "}
                        {user?.metadata?.lastSignInTime
                          ? new Date(
                              user.metadata.lastSignInTime
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={openEditModal}
                    className="quick bg-[#890C25] hover:bg-[#C51F3A] text-white font-medium py-2 px-6 rounded-md transition duration-200 cursor-pointer"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="slab text-xl font-bold text-gray-800">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          className="h-24 w-24 rounded-full object-cover border-2 border-[#890C25]"
                          src={imagePreview}
                          alt="Profile preview"
                        />
                        <button
                          type="button"
                          onClick={clearImageSelection}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <FaUserCircle className="h-24 w-24 text-gray-400" />
                    )}
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="absolute -bottom-2 -right-2 bg-[#890C25] text-white p-2 rounded-full hover:bg-[#C51F3A] transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="quick text-sm text-gray-500">
                    {imageData
                      ? "New image selected"
                      : "Click the camera icon to change your profile picture"}
                  </p>
                </div>

                <div>
                  <label className="quick block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#890C25] focus:border-[#890C25]"
                  />
                  {errors.name && (
                    <p className="quick text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="quick block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="quick block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <input
                    {...register("university")}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#890C25] focus:border-[#890C25]"
                  />
                </div>

                <div>
                  <label className="quick block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    {...register("address")}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#890C25] focus:border-[#890C25]"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="cursor-pointer quick px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer quick px-4 py-2 bg-[#890C25] text-white rounded-md hover:bg-[#C51F3A] disabled:opacity-70"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
