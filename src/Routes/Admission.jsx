import React, { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../Auth/AuthContextProvider";

// IMAGE HOSTING KEY
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Admission = () => {
  const axiosPublic = useAxiosPublic();
  const [clgData, setClgData] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFetching, setDataFetching] = useState(false);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" }); // `onChange` mode to trigger isValid live

  useEffect(() => {
    const fetchData = async () => {
      setDataFetching(true);
      const res = await axiosPublic.get("/colleges");

      if (res?.data) {
        setClgData(res?.data);
        setDataFetching(false);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const handleSelect = (name) => {
    setSelectedCollege(name);
    reset(); // reset form when selecting new college
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const { dob, address, candidateName, email, image, phone, subject } = data;
    const finalDataWithoutImg = {
      dob: dob,
      address: address,
      candidateName: candidateName,
      email: email,
      phone: phone,
      subject: subject,
      selectedCollege: selectedCollege,
      userEmail: userEmail,
    };

    if (image[0].name) {
      const imgData = { image: image[0] };
      const res = await axiosPublic.post(image_hosting_api, imgData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const candidateImage = res?.data.data.display_url;

      // final data with image
      const finalData = {
        ...finalDataWithoutImg,
        candidateImage,
      };

      console.log(finalData);

      if (candidateImage) {
        const res = await axiosPublic.post(
          "/my-college-application",
          finalData
        );

        if (res?.data.insertedId) {
          toast.success(`Successfully Applied to ${selectedCollege}`);
          reset();
          setLoading(false);
        } else {
          toast.error(`${res.data.message}`);
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="my-36">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-6 text-center slab text-[#890C25]">
          Admission Form
        </h1>

        {dataFetching ? (
          <div className="flex items-center justify-center h-[500px]">
            <span className="loading loading-spinner text-error"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {clgData.map((college, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(college?.name)}
                className={`cursor-pointer p-4 border border-[#890C25] rounded-lg hover:bg-[#FFF4F6] hover:text-black transition duration-300 text-left quick ${
                  selectedCollege === college?.name
                    ? "bg-[#890C25] text-white"
                    : "bg-transparent"
                }`}
              >
                {college?.name}
              </button>
            ))}
          </div>
        )}

        {selectedCollege && (
          <div className="bg-[#FFF4F6] p-6 rounded-lg shadow-md border border-[#890C25]">
            <h2 className="text-2xl font-semibold mb-4 slab">
              Apply to {selectedCollege}
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 quick"
            >
              <input
                {...register("candidateName", {
                  required: "Candidate Name is required",
                })}
                type="text"
                placeholder="Candidate Name"
                className="border border-[#890C25] p-2 rounded"
              />
              <input
                {...register("subject", { required: "Subject is required" })}
                type="text"
                placeholder="Subject"
                className="border border-[#890C25] p-2 rounded"
              />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Candidate Email"
                className="border border-[#890C25] p-2 rounded"
              />
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="number"
                placeholder="Candidate Phone Number"
                className="border border-[#890C25] p-2 rounded"
              />
              <input
                {...register("address", { required: "Address is required" })}
                type="text"
                placeholder="Address"
                className="border border-[#890C25] p-2 rounded md:col-span-2"
              />
              <input
                {...register("dob", { required: "Date of Birth is required" })}
                type="date"
                className="border border-[#890C25] p-2 rounded"
              />
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                className="border border-[#890C25] p-2 rounded"
              />
              <button
                type="submit"
                disabled={!isValid}
                className={`py-2 px-4 rounded transition md:col-span-2 ${
                  isValid
                    ? "bg-[#890C25] text-white hover:bg-[#890C25]/90 cursor-pointer"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admission;
