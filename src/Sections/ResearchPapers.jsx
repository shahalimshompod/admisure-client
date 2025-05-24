import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ResearchPaperCard from "../Components/ResearchPaperCard";

const ResearchPapers = () => {
  const axiosPublic = useAxiosPublic();
  const [researchData, setResearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get("/researchCardData");
      if (res?.data) {
        setResearchData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch research data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#FFF4F6] my-20 sm:my-32 md:my-48 p-6 sm:p-12 md:p-20 rounded-3xl flex flex-col items-center gap-10 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-3 sm:gap-5 px-4 sm:px-0">
        <p className="quick border px-3 py-1 rounded-sm text-[#890C25] border-[#890C25] text-sm sm:text-base">
          Research Papers
        </p>
        <h1 className="slab text-[#890C25] font-semibold text-2xl sm:text-3xl md:text-5xl text-center leading-snug">
          Recommended Research Works by <br /> Our Students & Scholars
        </h1>
      </div>

      {/* cards */}
      {loading ? (
        <div className="flex items-center justify-center h-48 w-full">
          <span className="loading loading-spinner text-error text-4xl"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 sm:px-0">
          {researchData.map((data, idx) => (
            <ResearchPaperCard data={data} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchPapers;
