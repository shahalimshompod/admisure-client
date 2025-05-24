import React, { useEffect, useState } from "react";
import CollegeCard from "../Components/CollegeCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const HomeClgCardContainer = () => {
  const axiosPublic = useAxiosPublic();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch card data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get("/homeClgList");
      if (res?.data) {
        setCardData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch college data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center my-20 sm:my-32 md:my-48 px-4 sm:px-8 lg:px-20">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <p className="w-24 quick border px-3 py-1 rounded-sm text-[#890C25] border-[#890C25] text-sm sm:text-base">
            Colleges
          </p>
          <a
            href="/colleges"
            className="hover:underline text-[#890C25] quick cursor-pointer text-sm sm:text-base"
          >
            View All
          </a>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 sm:mb-20 gap-6 md:gap-0">
          <h2 className="slab font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full md:w-1/3 leading-tight">
            All Top Colleges Are Added Here
          </h2>
          <p className="quick text-base sm:text-lg md:text-xl w-full md:w-1/3">
            Discover a wide array of top-ranked colleges to match your career
            aspirations. Build a successful and respectful future with confidence.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 w-full">
          <span className="loading loading-spinner text-error text-4xl"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 max-w-7xl w-full">
          {cardData.map((data, index) => (
            <div key={index} className="w-full sm:w-72 md:w-80 lg:w-96 flex">
              <CollegeCard data={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeClgCardContainer;
