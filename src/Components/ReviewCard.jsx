import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ name, timeAgo, rating, reviewText, image }) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <FaStar key={i} className="text-yellow-500" />
    ) : (
      <FaRegStar key={i} className="text-yellow-500" />
    )
  );

  return (
    <div className="flex p-4 bg-white rounded-2xl shadow-md max-w-xl">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover mr-4"
      />
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{timeAgo}</p>
        <div className="flex my-1">{stars}</div>
        <p className="text-gray-700 text-sm mt-1">“{reviewText}”</p>
      </div>
    </div>
  );
};

export default ReviewCard;
