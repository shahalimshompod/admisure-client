import React from "react";
import { Link } from "react-router-dom";
const CollegeCard = ({ data }) => {
  const {
    _id,
    name,
    image,
    admissionDates,
    events,
    researchCount,
    sports,
    rating,
  } = data;

  return (
    <div className="card bg-base-100 shadow-md w-full">
      <figure className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title slab font-bold text-xl">{name}</h2>
        <p className="quick">
          <strong>Admission Dates:</strong> {admissionDates}
        </p>
        <p className="quick">
          <strong>Events:</strong> {events?.length}
        </p>
        <p className="quick">
          <strong>Research Count:</strong> {researchCount}
        </p>
        <p className="quick flex gap-3">
          <strong>Sports:</strong>{" "}
          <span className="flex items-center gap-2">
            {sports?.map((sport, idx) => (
              <p key={idx}>{sport?.name},</p>
            ))}
          </span>
        </p>
        <p className="quick">
          <strong>Rating:</strong> {rating} ⭐
        </p>
        <div className="card-actions justify-end mt-3">
          <Link to={`/college-details/${_id}`}>
            <button className="btn border-none bg-[#890C25] text-white quick font-bold">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
