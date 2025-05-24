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
    try {
      const res = await axiosPublic.get("/get-review-data");
      if (res?.data) {
        setReviewData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch review data:", error);
    } finally {
      setLoading(false);
    }
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
    arrows: false,  // <-- removes left/right arrows
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="px-4 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 bg-gray-50 mb-24 sm:mb-36 md:mb-48">
      <div className="flex flex-col items-center gap-5 sm:gap-7 max-w-4xl mx-auto px-2 sm:px-0">
        <p className="quick border px-3 py-1 rounded-sm text-[#890C25] border-[#890C25] text-sm sm:text-base">
          Student reviews
        </p>
        <h2 className="font-bold text-gray-800 slab text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
          What Our Users Say
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center max-w-xl mx-auto quick">
          We value our users’ feedback and constantly strive to improve. Here’s
          what some of our happy users have to say about their experience with
          us.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48 sm:h-64">
            <span className="loading loading-spinner text-neutral text-4xl"></span>
          </div>
        ) : reviewData.length > 0 ? (
          <Slider {...settings}>
            {reviewData.map((data, idx) => (
              <div key={idx} className="px-2 sm:px-4">
                <ReviewCard data={data} />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 text-base sm:text-lg">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
