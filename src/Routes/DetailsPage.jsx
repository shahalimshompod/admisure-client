import React from "react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const DetailsPage = () => {
  // get data from server
  const [detailsData, setDetailsData] = useState({});
  const axiosPublic = useAxiosPublic();
  const params = useParams();
  const id = params.id;

  // fetching data from server
  const FetchData = async () => {
    const res = await axiosPublic.get(`/college-details/${id}`);
    setDetailsData(res.data);
  };

  useEffect(() => {
    FetchData();
  }, []);

  console.log(detailsData);

  return (
    <div>
      <div className="bg-red-600 w-[700px]"></div>
    </div>
  );
};

export default DetailsPage;
