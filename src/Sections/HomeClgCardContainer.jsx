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
    const res = await axiosPublic.get("/homeClgList");
    if (res?.data) {
      setCardData(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center my-48">
      <div>
        <div className="flex items-center justify-between">
          <p className="w-20 quick border px-2 py-0.5 rounded-sm text-[#890C25] border-[#890C25]">
            Colleges
          </p>
          <a
            href="/colleges"
            className="hover:underline text-[#890C25] quick cursor-pointer"
          >
            View All
          </a>
        </div>
        <div className="flex items-center justify-between mt-7 mb-20">
          <h2 className="slab font-semibold text-5xl w-1/3">
            All Top Colleges Are Added Here
          </h2>
          <p className="quick text-lg w-1/3">
            Discover a wide array of top-ranked colleges to match your career
            aspirations. Build a successful and respectful future with
            confidence.
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center max-h-screen">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="flex items-center gap-20">
          {cardData.map((data, index) => (
            <CollegeCard data={data} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeClgCardContainer;
