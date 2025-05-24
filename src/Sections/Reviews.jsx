import React, { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ReviewCard from "../Components/ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic.get("/get-review-data");
    if (res?.data) {
      setReviewData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [axiosPublic]);

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-20 bg-gray-50 mb-48">
      <div className="flex flex-col items-center gap-7">
        <p className="quick border px-2 py-0.5 rounded-sm text-[#890C25] border-[#890C25]">
          Student reviews
        </p>
        <h2 className="font-bold text-gray-800 mb-2 slab text-3xl md:text-4xl lg:text-5xl text-center">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-base md:text-lg text-center max-w-2xl mx-auto mb-6 quick">
          We value our users’ feedback and constantly strive to improve. Here’s
          what some of our happy users have to say about their experience with
          us.
        </p>
      </div>

      <div className="mt-12">
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <span className="loading loading-spinner text-neutral"></span>
          </div>
        ) : reviewData.length > 0 ? (
          <div className="slider-container">
            <Slider {...settings}>
              {reviewData.map((data, idx) => (
                <div key={idx} className="px-2">
                  <ReviewCard data={data} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
