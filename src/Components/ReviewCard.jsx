import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const ReviewCard = ({ data }) => {
  const {
    rating,
    reviewText,
    reviewerName,
    currentCollege,
    reviewerImage,
    createdAt,
  } = data;

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <FaStar key={i} className="text-yellow-500" />
    ) : (
      <FaRegStar key={i} className="text-yellow-500" />
    )
  );

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="flex p-4 bg-white rounded-2xl shadow-md w-full h-full my-5 flex-grow">
      <img
        src={reviewerImage}
        alt={reviewerName}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-lg quick">{reviewerName}</h3>
          <div className="flex my-1">{stars}</div>
        </div>
        <h4 className=" font-bold slab text-[#890C25] text-xl ">
          {currentCollege}
        </h4>

        <p className="text-sm text-gray-500 quick">{timeAgo}</p>

        <p className="text-gray-700 text-sm mt-1 quick">“{reviewText}”</p>
      </div>
    </div>
  );
};

export default ReviewCard;
