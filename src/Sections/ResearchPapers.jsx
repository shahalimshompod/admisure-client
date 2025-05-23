import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ResearchPaperCard from "../Components/ResearchPaperCard";

const ResearchPapers = () => {
  // fetching data
  const axiosPublic = useAxiosPublic();
  const [researchData, setResearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  // data fetching function
  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic.get("/researchCardData");
    if (res?.data) {
      setResearchData(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#FFF4F6] my-48 flex flex-col items-center gap-12 p-20 rounded-3xl">
      <div className="flex flex-col items-center gap-5">
        <p className="quick border px-2 py-0.5 rounded-sm text-[#890C25] border-[#890C25]">
          Research Papers
        </p>
        <h1 className="slab text-[#890C25] font-semibold text-5xl text-center">
          Recommended Research Works by <br /> Our Students & Scholars
        </h1>
      </div>

      {/* cards */}
      {loading ? (
        <div className="flex items-center justify-center max-h-screen">
          <span className="loading loading-spinner text-error"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {researchData.map((data, idx) => (
            <ResearchPaperCard data={data} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchPapers;
