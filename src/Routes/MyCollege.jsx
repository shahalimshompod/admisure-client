import React, { useEffect, useState, useContext } from "react";
import Rating from "react-rating";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import collegeIcon from "../assets/icons/colleges.png";
import { AuthContext } from "../Auth/AuthContextProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

const MyCollege = () => {
  const { user } = useContext(AuthContext);
  const [myColleges, setMyColleges] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [currentCollegeId, setCurrentCollegeId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [uniDetails, setUniDetails] = useState(false);

  const email = user?.email;
  const axiosPublic = useAxiosPublic();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
  });

  // to fetch data
  useEffect(() => {
    const fetchMyColleges = async () => {
      if (email) {
        try {
          const res = await axiosPublic.get(`/my-colleges?email=${email}`);
          if (res?.data) {
            setMyColleges(res.data);
            setUniDetails(false);
          }
        } catch (error) {
          console.error("Error fetching applied colleges:", error);
          setUniDetails(false);
        }
      }
    };
    const fetchCardData = async () => {
      setUniDetails(true);
      try {
        const res = await axiosPublic.get("/colleges");
        if (res?.data) {
          setCardData(res?.data);
          setUniDetails(false);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setUniDetails(false);
      }
    };

    fetchMyColleges();
    fetchCardData();
  }, [email, axiosPublic, myColleges]);

  // to disable scroll
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Prevent scroll
    } else {
      document.body.style.overflow = "auto"; // Allow scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when unmount
    };
  }, [showModal]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      date
    );
    return { date: formattedDate, time: formattedTime };
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSubLoading(true);
      const reviewerName = user?.displayName;
      const reviewerImage = user?.photoURL;

      const reviewData = {
        ...data,
        reviewerName,
        currentCollege,
        reviewerImage,
      };

      // post review data to server
      const res = await axiosPublic.post("/review-data-post", reviewData);
      console.log(res?.data);
      if (res?.data.insertedId) {
        const res = await axiosPublic.put(
          `/put-individual-review-data/${currentCollegeId}`,
          reviewData
        );
        console.log(res?.data);
        if (res?.data.modifiedCount) {
          setShowModal(false);
          reset();
          setLoading(false);
          toast.success("Review has been posted!");
        }
      } else {
        setSubLoading(false);
        toast.error(`${res?.data.message}`);
      }
    } catch (error) {
      setLoading(false);
      setSubLoading(false);
      console.error("Error submitting review:", error);
      toast.error(`Something went wrong
        ${error}`);
    }
  };

  const openModal = (selectedCollege, id) => {
    setCurrentCollege(selectedCollege);
    setCurrentCollegeId(id);
    reset(); // clear form when modal opens
    setShowModal(true);
  };

  return (
    <div className="container mx-auto my-36">
      <div className="flex items-center gap-6 mb-10">
        <img className="w-36" src={collegeIcon} alt="College Icon" />
        <h1 className="text-5xl font-bold text-[#890C25] slab">
          My Applied Colleges
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myColleges?.length > 0 ? (
            myColleges.map((admission) => {
              const college = cardData.find(
                (c) =>
                  c._id === admission.collegeId ||
                  c.name === admission.selectedCollege
              );

              return (
                <div
                  key={admission._id}
                  className="border border-[#890C25] p-4 rounded-lg shadow-md bg-white"
                >
                  {college ? (
                    <>
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-48 object-cover rounded"
                      />
                      <h2 className="text-2xl font-semibold text-[#890C25] my-2">
                        {college.name}
                      </h2>
                      <p className="quick flex flex-wrap gap-1">
                        <strong>Events:</strong>
                        {college.events?.map((event, idx) => (
                          <span key={idx}>
                            {event?.name}
                            {idx < 1 && ","}{" "}
                          </span>
                        ))}
                      </p>
                      <p className="quick flex flex-wrap gap-1">
                        <strong>Sports:</strong>
                        {college.sports?.map((sport, idx) => (
                          <span key={idx}>
                            {sport?.name}
                            {idx < 2 && ","}{" "}
                          </span>
                        ))}
                      </p>
                      <p className="quick">
                        <strong>Researches:</strong> {college?.researchCount}
                      </p>
                      <p className="quick flex items-center gap-1">
                        <strong>Status:</strong>
                        <span className="border border-green-500 bg-green-100 px-2 rounded">
                          Applied
                        </span>
                      </p>
                    </>
                  ) : (
                    <div className="text-red-500">
                      {uniDetails ? (
                        <div className="flex items-center justify-center">
                          <span className="loading loading-spinner text-error"></span>
                        </div>
                      ) : (
                        "College details not found."
                      )}
                    </div>
                  )}

                  <h3 className="slab font-semibold mt-6 text-3xl">
                    Application & Candidate Details
                  </h3>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold  mt-2 quick">
                          {admission.candidateName}
                        </h3>
                        <p className="quick">
                          <strong>Email:</strong> {admission.email}
                        </p>
                      </div>
                      <img
                        src={admission.candidateImage}
                        alt={admission.candidateName}
                        className="w-24 h-24 object-cover mx-auto"
                      />
                    </div>
                    <p className="quick">
                      <strong>Admission Date:</strong>{" "}
                      {formatDate(admission?.createdAt).date} |{" "}
                      {formatDate(admission?.createdAt).time}
                    </p>
                    <p className="quick">
                      <strong>Phone:</strong> {admission.phone}
                    </p>
                    <p className="quick">
                      <strong>Address:</strong> {admission.address}
                    </p>
                    <p className="quick">
                      <strong>Date of Birth:</strong> {admission.dob}
                    </p>
                    <p className="quick">
                      <strong>Subject:</strong> {admission.subject}
                    </p>
                    <p className="quick">
                      <strong>Selected College:</strong>{" "}
                      {admission.selectedCollege}
                    </p>
                  </div>

                  <div className="mt-4">
                    {admission.review ? (
                      <>
                        <h4 className="mb-3 quick font-2xl font-black">
                          My Review:
                        </h4>
                        <div className="flex p-4 bg-[#FFF4F6] rounded-2xl shadow-md max-w-xl">
                          <img
                            src={admission?.review.reviewerImage}
                            alt={admission?.review.reviewerName}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">
                              {admission?.review.reviewerName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(admission?.review.createdAt).date} |{" "}
                              {formatDate(admission?.review.createdAt).time}
                            </p>
                            <p className="text-gray-700 text-sm mt-1">
                              “{admission?.review.reviewText}”
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          openModal(admission.selectedCollege, admission._id)
                        }
                        className="quick cursor-pointer mt-2 px-4 py-2 bg-[#890C25] text-white rounded"
                      >
                        Add Review
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="flex flex-col justify-between items-center text-center slab font-bold text-4xl ">
              You haven't applied to any colleges yet.
            </h1>
          )}
        </div>
      )}

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="quick hover:bg-gray-200 px-2.5 rounded-full cursor-pointer absolute top-2 right-2 text-gray-600 text-2xl"
              type="button"
            >
              &times;
            </button>
            <h2 className="slab text-3xl font-bold text-[#890C25] mb-4">
              Add Your Review
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Rating Controller */}
              <Controller
                name="rating"
                control={control}
                rules={{ required: true, min: 0.5, max: 5 }}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Rating
                      {...field}
                      fractions={2}
                      initialRating={field.value}
                      onChange={field.onChange}
                      emptySymbol={<FaRegStar color="#890C25" size={30} />}
                      halfSymbol={<FaStarHalfAlt color="#890C25" size={30} />}
                      fullSymbol={<FaStar color="#890C25" size={30} />}
                    />
                    <span className="ml-2 text-lg font-semibold">
                      {field.value} / 5
                    </span>
                  </div>
                )}
              />
              {errors.rating && (
                <p className="text-red-600 mt-1">Please provide a rating.</p>
              )}

              {/* Review Textarea Controller */}
              <Controller
                name="reviewText"
                control={control}
                rules={{ required: true, minLength: 5 }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Write your review..."
                    className="w-full mt-4 p-2 border rounded-lg h-32 resize-none quick"
                  />
                )}
              />
              {errors.reviewText && (
                <p className="text-red-600 mt-1">
                  Review must be at least 5 characters.
                </p>
              )}

              <button
                type="submit"
                className="quick cursor-pointer mt-4 w-full py-2 bg-[#890C25] text-white rounded hover:bg-[#6e0b1f]"
              >
                {subLoading ? (
                  <span className="loading loading-spinner text-error"></span>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCollege;
