import React, { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import CollegeCard from "../Components/CollegeCard";
import college from "../assets/icons/colleges.png";

const Colleges = () => {
  const axiosPublic = useAxiosPublic();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch card data
  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic.get("/colleges");
    if (res?.data) {
      setCardData(res?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [axiosPublic]);

  return (
    <div className="my-36 px-4 container mx-auto">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-14 sm:mb-20 gap-6 sm:gap-12">
        <img className="w-24 sm:w-36" src={college} alt="College Icon" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#890C25] slab text-center sm:text-left leading-tight max-w-3xl">
          Browse through a curated list of the best colleges to plan your future
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[400px] sm:h-[500px]">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {cardData.map((data, idx) => (
            <CollegeCard data={data} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Colleges;
