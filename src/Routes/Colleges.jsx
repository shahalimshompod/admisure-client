import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import CollegeCard from '../Components/CollegeCard';
import college from "../assets/icons/colleges.png"

const Colleges = () => {

    const axiosPublic = useAxiosPublic();
  const [cardData, setCardData] = useState([]);

  // fetch card data
  const fetchData = async () => {
    const res = await axiosPublic.get("/colleges");
    setCardData(res?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

    return (
        <div className='my-36 container mx-auto'>
            <div className='flex items-center mb-20 gap-6'>
                <img className='w-36' src={college} alt="" />
                <h1 className='text-5xl font-bold text-[#890C25] slab'>Browse through a curated list of the best <br /> colleges to plan your future</h1>
            </div>

            <div className='grid grid-cols-3 gap-7'>
                {
                    cardData.map((data, idx) => <CollegeCard data={data} key={idx}/>)
                }
            </div>
        </div>
    );
};

export default Colleges;