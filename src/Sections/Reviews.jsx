import React from "react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useEffect } from "react";

const Reviews = () => {
  // states
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  console.log(reviewData);

  // fetching data
  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic.get("/get-review-data");
    if (res?.data) {
      setReviewData(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [axiosPublic]);

  return (
    <div className=" p-20 bg-gray-50 mb-48">
      <div className="flex flex-col items-center gap-7">
        <p className="quick border px-2 py-0.5 rounded-sm text-[#890C25] border-[#890C25]">
          Student reviews
        </p>
        <h2 className="font-bold text-gray-800 mb-2 slab text-5xl ">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-6 quick">
          We value our users’ feedback and constantly strive to improve. Here’s
          what some of our happy users have to say about their experience with
          us.
        </p>
      </div>

      {/* Review Cards here */}
      <div className="mt-12">
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <span className="loading loading-spinner text-neutral"></span>
          </div>
        ) : (
          <div>
            {reviewData.length > 0 ? (
              <div>{reviewData.map((data, idx) => console.log(data, idx))}</div>
            ) : (
              "No reviews"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
