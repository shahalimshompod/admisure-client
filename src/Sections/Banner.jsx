import React from "react";
import bannerImage from "../assets/images/bannerImage.jpg";
import hatIcon from "../assets/icons/hat.png";

const Banner = () => {
  return (
    <div
      className="h-[700px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="h-full flex flex-col items-center pt-40 bg-opacity-50 text-white px-4 space-y-20">
        <div className="flex items-center gap-2.5">
          <img className="w-10" src={hatIcon} alt="" />
          <p className="quick text-xl font-semibold">knowledge meets innovation</p>
        </div>

        {/* Search Box */}
        <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-md overflow-hidden border border-gray-300">
          {/* Search Icon */}
          <span className="pl-4 text-gray-500">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" strokeWidth="2" />
            </svg>
          </span>

          {/* Input Field */}
          <input
            type="search"
            className="flex-1 py-2 px-3 text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 quick"
            placeholder="Search your desired colleges..."
            required
          />

          {/* Search Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-[#890C25] text-white font-medium quick cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Heading */}
        <h3 className="text-6xl text-center slab">
          Welcome to Admisure <br />Your Trusted Guide to a Brighter Academic Future!
        </h3>
      </div>
    </div>
  );
};

export default Banner;
