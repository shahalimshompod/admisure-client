import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/images/bannerImage.jpg";
import hatIcon from "../assets/icons/hat.png";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Banner = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setFilteredColleges([]);
      return;
    }

    try {
      const response = await axiosPublic.get(`/search-colleges`, {
        params: { search: value },
      });
      setFilteredColleges(response?.data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
      setFilteredColleges([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSuggestionClick = (id) => {
    navigate(`/college-details/${id}`);
    setSearchInput("");
    setFilteredColleges([]);
  };

  return (
    <div
      className="lg:h-[700px] h-[400px] md:h-[650px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="h-full flex flex-col items-center pt-28 sm:pt-32 md:pt-40 bg-opacity-50 text-white px-4 space-y-8 sm:space-y-10">
        <div className="flex items-center gap-2.5">
          <img className="w-8 sm:w-9 md:w-10" src={hatIcon} alt="icon" />
          <p className="quick text-lg sm:text-xl md:text-2xl font-semibold">
            knowledge meets innovation
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-full shadow-md border border-gray-300"
        >
          <span className="pl-3 sm:pl-4 text-gray-500">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" strokeWidth="2" />
            </svg>
          </span>

          <input
            type="search"
            className="flex-1 py-2 px-2 sm:px-3 text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 quick text-sm sm:text-base"
            placeholder="Search your desired colleges..."
            value={searchInput}
            onChange={handleSearchChange}
          />

          {searchInput && filteredColleges.length > 0 && (
            <ul className="absolute top-full mt-2 left-0 w-full bg-white rounded-md shadow-lg max-h-56 sm:max-h-60 overflow-y-auto z-10">
              {filteredColleges.map((college) => (
                <li
                  key={college._id}
                  onClick={() => handleSuggestionClick(college._id)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black text-sm sm:text-base"
                >
                  {college.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center slab leading-tight">
          Welcome to Admisure <br />
          Your Trusted Guide to a Brighter Academic Future!
        </h3>
      </div>
    </div>
  );
};

export default Banner;
