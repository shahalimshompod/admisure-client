// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import { Link, useParams } from "react-router-dom";
// import CollegeName from "../assets/icons/graduate.png";
// import star from "../assets/icons/star.png";
// import info from "../assets/icons/info.png";
// import date from "../assets/icons/date.png";
// import sportss from "../assets/icons/sports.png";
// import count from "../assets/icons/count.png";
// import research from "../assets/icons/research.png";
// import eventss from "../assets/icons/events.png";
// import paper from "../assets/icons/papers.png";

// const DetailsPage = () => {
//   const [detailsData, setDetailsData] = useState({});
//   const [researchWork, setResearchWork] = useState({});
//   const axiosPublic = useAxiosPublic();
//   const { id } = useParams();

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   // Fetch data
//   useEffect(() => {
//     const FetchData = async () => {
//       const res = await axiosPublic.get(`/college-details/${id}`);
//       setDetailsData(res?.data);
//     };
//     FetchData();
//   }, [id, axiosPublic]);

//   useEffect(() => {
//     if (detailsData?.name) {
//       const FetchResearchData = async () => {
//         const res = await axiosPublic.get(`/research-work?name=${detailsData.name}`);
//         setResearchWork(res?.data);
//       };
//       FetchResearchData();
//     }
//   }, [detailsData, axiosPublic]);

//   const {
//     name,
//     image,
//     admissionDates,
//     events = [],
//     researchHistory = [],
//     sports = [],
//     rating,
//     researchCount,
//     admissionProcess,
//     summary,
//     admissionProcessDetails = {},
//   } = detailsData;

//   const {
//     title = "",
//     authors = [],
//     university = "",
//     published = "",
//     summary: researchSummary = "",
//     link = "",
//   } = researchWork;

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="my-20 md:my-36"
//     >
//       {/* Header Section */}
//       <motion.div
//         variants={itemVariants}
//         className="bg-white  md:h-[820px] flex flex-col items-center pt-6 px-4 container mx-auto"
//       >
//         <motion.h1
//           whileInView={{ y: 0, opacity: 1 }}
//           initial={{ y: 50, opacity: 0 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#890C25] text-center slab mb-6 md:mb-12"
//         >
//           Become a Part of <br /> Something Bigger
//         </motion.h1>

//         <motion.p
//           whileInView={{ y: 0, opacity: 1 }}
//           initial={{ y: 30, opacity: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="text-base md:text-lg font-semibold quick w-full md:w-1/2 text-center my-6 md:my-12"
//         >
//           Discover the difference of an education at{" "}
//           <span className="font-black text-[#890C25]">{name}</span>, where
//           you'll find connection, knowledge, and purpose.
//         </motion.p>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="flex flex-col md:flex-row items-center gap-4 mb-8 md:mb-0"
//         >
//           <p className="quick text-[#890C25]">{admissionProcess}</p>
//           <div className="divider md:divider-horizontal"></div>
//           <Link to="/admission">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="btn border-none rounded-lg bg-[#890C25] quick text-white"
//             >
//               Apply Online
//             </motion.button>
//           </Link>
//         </motion.div>

//         <motion.img
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="relative md:absolute top-[100px] lg:top-[600px] w-full md:w-11/12 h-auto md:h-[700px] object-cover mt-8 md:mt-0"
//           src={image}
//           alt="College"
//         />
//       </motion.div>

//       {/* Details Section */}
//       <motion.div
//         variants={itemVariants}
//         className="bg-[#890C25] pt-32 md:pt-64 pb-16 md:pb-28 px-4 md:px-0"
//       >
//         <motion.div
//           variants={containerVariants}
//           className="container mx-auto pt-16 md:pt-44 flex flex-col lg:flex-row gap-8 justify-between"
//         >
//           {/* Summary Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             className="border border-white rounded-xl p-5 shadow-2xl w-full"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <img className="w-8 md:w-10" src={CollegeName} alt="College" />
//                 <h4 className="quick text-white text-lg md:text-xl font-bold">
//                   {name}
//                 </h4>
//               </div>
//               <motion.div
//                 whileHover={{ rotate: 10 }}
//                 className="border border-white rounded-xl p-2 shadow-2xl flex items-center gap-1"
//               >
//                 <img className="w-4 md:w-5" src={star} alt="star" />
//                 <h1 className="quick text-lg md:text-xl text-white font-bold">
//                   {rating}
//                 </h1>
//               </motion.div>
//             </div>
//             <h1 className="quick text-white text-xl md:text-2xl font-bold my-3">
//               Start Small. Dream Big.
//             </h1>
//             <h5 className="quick underline font-bold text-white">Summary:</h5>
//             <p className="quick text-white">{summary}</p>
//           </motion.div>

//           {/* Academic Info Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ y: -5 }}
//             className="border border-white rounded-xl p-5 shadow-2xl w-full"
//           >
//             <div className="flex items-center gap-2 mb-4 md:mb-6">
//               <img className="w-5 md:w-6" src={info} alt="Information" />
//               <h1 className="quick text-white text-xl md:text-2xl font-bold">
//                 Academic Information
//               </h1>
//             </div>

//             <div className="flex flex-col gap-2 md:gap-3">
//               {/* Admission Date */}
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-2"
//               >
//                 <img className="w-5 md:w-6" src={date} alt="date" />
//                 <p className="quick text-base md:text-lg text-white">
//                   <span className="font-bold">Admission Date: </span>
//                   {admissionDates}
//                 </p>
//               </motion.div>

//               {/* Events */}
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex flex-col md:flex-row md:items-center gap-2"
//               >
//                 <div className="flex items-center gap-2">
//                   <img className="w-5 md:w-6" src={eventss} alt="events" />
//                   <span className="font-bold quick text-white">Events: </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {events.map((event, idx) => (
//                     <motion.span
//                       key={idx}
//                       whileHover={{ scale: 1.05 }}
//                       className="border w-fit px-2 text-sm md:text-base quick text-white"
//                     >
//                       {event?.name}
//                     </motion.span>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Sports */}
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex flex-col md:flex-row md:items-center gap-2"
//               >
//                 <div className="flex items-center gap-2">
//                   <img className="w-5 md:w-6" src={sportss} alt="sports" />
//                   <span className="font-bold quick text-white">Sports: </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {sports.map((sport, idx) => (
//                     <motion.span
//                       key={idx}
//                       whileHover={{ scale: 1.05 }}
//                       className="border w-fit px-2 text-sm md:text-base quick text-white"
//                     >
//                       {sport?.name}
//                     </motion.span>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Research History */}
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex flex-col md:flex-row md:items-center gap-2"
//               >
//                 <div className="flex items-center gap-2">
//                   <img className="w-5 md:w-6" src={research} alt="research" />
//                   <span className="font-bold quick text-white">Research: </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {researchHistory.map((history, idx) => (
//                     <motion.span
//                       key={idx}
//                       whileHover={{ scale: 1.05 }}
//                       className="border w-fit px-2 text-sm md:text-base quick text-white"
//                     >
//                       {history}
//                     </motion.span>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Research Count */}
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-2"
//               >
//                 <img className="w-5 md:w-6" src={count} alt="count" />
//                 <p className="quick text-base md:text-lg text-white">
//                   <span className="font-bold">Research Count: </span>
//                   {researchCount}
//                 </p>
//               </motion.div>

//               {/* Papers */}
//               <motion.div
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-2"
//               >
//                 <img className="w-5 md:w-6" src={paper} alt="count" />
//                 <p className="quick text-base md:text-lg text-white">
//                   <span className="font-bold">Papers: </span>
//                   {title} |{" "}
//                   <motion.span
//                     whileHover={{ scale: 1.1 }}
//                     className="bg-white text-[#890C25] py-1 px-2 rounded-xl"
//                   >
//                     <a target="_blank" rel="noreferrer" href={link}>
//                       View
//                     </a>
//                   </motion.span>
//                 </p>
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Admission Process Section */}
//       <motion.div
//         variants={itemVariants}
//         className="shadow-sm py-12 md:py-20 px-4 md:px-16 container mx-auto rounded-3xl my-16 md:my-28"
//       >
//         <motion.h1
//           whileInView={{ scale: 1.05 }}
//           viewport={{ once: true }}
//           className="text-center slab text-[#890C25] font-bold text-3xl md:text-5xl mb-8 md:mb-12"
//         >
//           Our Admission Process <br /> & Requirements
//         </motion.h1>
//         <div className="flex flex-col lg:flex-row justify-between gap-6">
//           {/* Process Steps */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="border-1 border-[#890C25] rounded-2xl p-6 w-full bg-[#FFF4F6]"
//           >
//             <h3 className="underline quick font-black text-lg md:text-xl text-center mb-4 md:mb-6">
//               {admissionProcess}
//             </h3>
//             <div className="flex flex-col gap-2 md:gap-3">
//               {admissionProcessDetails?.steps?.map((step, idx) => (
//                 <motion.p
//                   key={idx}
//                   whileHover={{ x: 5 }}
//                   className="quick text-sm md:text-base"
//                 >
//                   <span className="font-black">Step-{step?.step}.</span>{" "}
//                   <span>{step?.description}</span>
//                 </motion.p>
//               ))}
//             </div>
//           </motion.div>

//           {/* Requirements */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="border-1 border-[#890C25] rounded-2xl p-6 w-full bg-[#FFF4F6]"
//           >
//             <h3 className="underline quick font-black text-lg md:text-xl text-center mb-4 md:mb-6">
//               Requirements
//             </h3>
//             <div className="flex flex-col gap-2 md:gap-3">
//               {admissionProcessDetails?.requirements && (
//                 <>
//                   <motion.p
//                     whileHover={{ x: 5 }}
//                     className="text-[#890C25] quick text-sm md:text-base"
//                   >
//                     <span className="font-black">Requirement-1. </span>
//                     <span>{admissionProcessDetails.requirements.requirement1}</span>
//                   </motion.p>
//                   <motion.p
//                     whileHover={{ x: 5 }}
//                     className="text-[#890C25] quick text-sm md:text-base"
//                   >
//                     <span className="font-black">Requirement-2. </span>
//                     <span>{admissionProcessDetails.requirements.requirement2}</span>
//                   </motion.p>
//                   <motion.p
//                     whileHover={{ x: 5 }}
//                     className="text-[#890C25] quick text-sm md:text-base"
//                   >
//                     <span className="font-black">Requirement-3. </span>
//                     <span>{admissionProcessDetails.requirements.requirement3}</span>
//                   </motion.p>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Sports and Events Section */}
//       <motion.div
//         variants={itemVariants}
//         className="mb-16 md:mb-28 py-12 md:py-20 px-4 md:px-16 bg-[#890C25] container mx-auto"
//       >
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Events */}
//           <motion.div
//             whileInView={{ x: 0, opacity: 1 }}
//             initial={{ x: -50, opacity: 0 }}
//             viewport={{ once: true }}
//             className="w-full"
//           >
//             <h1 className="text-white slab text-2xl md:text-3xl mb-8 md:mb-12">
//               Events
//             </h1>
//             <div>
//               {events.map((event, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ scale: 1.02 }}
//                   className="mb-4 md:mb-6"
//                 >
//                   <h3 className="text-white font-bold text-lg md:text-xl quick mb-1 md:mb-1.5">
//                     {event?.name}
//                   </h3>
//                   <p className="text-white quick text-sm md:text-base">
//                     {event?.description}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Divider - Only shows on larger screens */}
//           <div className="hidden lg:block divider divider-horizontal divider-warning"></div>

//           {/* Sports */}
//           <motion.div
//             whileInView={{ x: 0, opacity: 1 }}
//             initial={{ x: 50, opacity: 0 }}
//             viewport={{ once: true }}
//             className="w-full"
//           >
//             <h1 className="text-white slab text-2xl md:text-3xl mb-8 md:mb-12">
//               Sports
//             </h1>
//             <div>
//               {sports.map((sport, idx) => (
//                 <motion.div
//                   key={idx}
//                   whileHover={{ scale: 1.02 }}
//                   className="mb-4 md:mb-6"
//                 >
//                   <h3 className="text-white font-bold text-lg md:text-xl quick mb-1 md:mb-1.5">
//                     {sport?.name}
//                   </h3>
//                   <p className="text-white quick text-sm md:text-base">
//                     {sport?.details}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Research Works Section */}
//       <motion.div
//         variants={itemVariants}
//         className="mb-16 md:mb-28 px-4 md:px-16"
//       >
//         <motion.h1
//           whileInView={{ scale: 1.05 }}
//           viewport={{ once: true }}
//           className="text-center mb-8 md:mb-12 text-3xl md:text-5xl font-black slab text-[#890C25]"
//         >
//           Research Works
//         </motion.h1>
//         <motion.div
//           whileHover={{ y: -5 }}
//           className="container mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-16"
//         >
//           <h2 className="text-xl md:text-2xl font-semibold text-[#890C25] quick mb-2">
//             {title}
//           </h2>
//           <p className="text-xs md:text-sm text-gray-600 mb-1 quick">
//             <span className="font-bold">University:</span> {university}
//           </p>
//           <p className="text-xs md:text-sm text-gray-600 mb-3 quick">
//             <span className="font-bold">Published:</span> {published}
//           </p>

//           <div className="mb-4">
//             <h3 className="font-bold text-gray-800 quick">Authors:</h3>
//             <ul className="list-disc list-inside text-xs md:text-sm text-gray-700 quick">
//               {authors.map((author, index) => (
//                 <li key={index}>{author}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-800 quick">Summary:</h3>
//             <p className="text-xs md:text-sm text-gray-700 quick">
//               {researchSummary}
//             </p>
//           </div>

//           <motion.a
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-4 px-4 py-2 bg-[#890C25] quick text-white text-xs md:text-sm font-medium rounded-md hover:bg-[#890C25]/90 transition"
//           >
//             View Full Paper
//           </motion.a>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default DetailsPage;

import React from "react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import CollegeName from "../assets/icons/graduate.png";
import star from "../assets/icons/star.png";
import info from "../assets/icons/info.png";
import date from "../assets/icons/date.png";
import sportss from "../assets/icons/sports.png";
import count from "../assets/icons/count.png";
import research from "../assets/icons/research.png";
import eventss from "../assets/icons/events.png";
import paper from "../assets/icons/papers.png";

const DetailsPage = () => {
  // get data from server
  const [detailsData, setDetailsData] = useState({});
  const [researchWork, setResearchWork] = useState({});
  const axiosPublic = useAxiosPublic();
  const params = useParams();
  const id = params.id;

  const {
    _id,
    name,
    image,
    admissionDates,
    events,
    researchHistory,
    sports,
    rating,
    researchCount,
    admissionProcess,
    summary,
    admissionProcessDetails,
  } = detailsData;

  const {
    title,
    authors,
    university,
    published,
    summary: researchSummary,
    link,
  } = researchWork;

  // fetching data from server
  const FetchData = async () => {
    const res = await axiosPublic.get(`/college-details/${id}`);
    setDetailsData(res?.data);
  };

  // fetching research data from server
  const FetchResearchData = async () => {
    const res = await axiosPublic.get(`/research-work?name=${name}`);
    setResearchWork(res?.data);
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    if (detailsData?.name) {
      FetchResearchData();
    }
  }, [detailsData]);

  //   destructuring details data

  // some data to be more simplified
  // steps
  const steps = admissionProcessDetails?.steps;

  // requirements
  const requirements = admissionProcessDetails?.requirements;

  return (
    <div className="my-36">
      {/* header */}
      <div className="bg-white h-[820px] flex flex-col items-center pt-6  container mx-auto">
        <h1 className=" text-8xl font-bold text-[#890C25] text-center slab ">
          Become a Part of <br /> Something Bigger
        </h1>
        <p className="text-lg font-semibold quick w-1/2 text-center my-12 ">
          Discover the difference of an education at{" "}
          <span className="font-black text-[#890C25] ">{name}</span>, where
          you'll find connection, knowledge, and purpose.
        </p>
        <div className="flex items-center">
          <div>
            <p className="quick text-[#890C25] ">{admissionProcess}</p>
          </div>
          <div className="divider divider-horizontal"></div>
          <div>
            <Link>
              {" "}
              <button className="btn border-none rounded-lg bg-[#890C25] quick text-white">
                Apply Online
              </button>
            </Link>
          </div>
        </div>
        <img
          className="absolute top-[600px] w-11/16 h-[700px]"
          src={image}
          alt="College"
        />
      </div>

      {/* details sec */}
      <div className=" bg-[#890C25] pt-64 pb-28 ">
        <div className=" container mx-auto pt-44 flex gap-12 justify-between">
          {/* summary */}
          <div className="border border-white rounded-xl p-5 shadow-2xl w-full">
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img className="w-10" src={CollegeName} alt="Image" />
                <h4 className="quick text-white text-xl font-bold">{name}</h4>
              </div>
              {/* ratings */}
              <div className="border border-white rounded-xl p-2 shadow-2xl flex items-center justify-between gap-1">
                <img className="w-5" src={star} alt="star" />
                <h1 className="quick text-xl text-white font-bold">{rating}</h1>
              </div>
            </div>
            <h1 className="quick text-white text-2xl font-bold my-3">
              Start Small. Dream Big.
            </h1>
            <h5 className="quick underline font-bold text-white">Summary: </h5>
            <p className="quick text-white">{summary}</p>
          </div>

          {/* other information */}
          <div className="border border-white rounded-xl p-5 shadow-2xl w-full">
            <div className="flex items-center gap-2 mb-6">
              <img className="w-6" src={info} alt="Information icon" />
              <h1 className="quick text-white text-2xl font-bold">
                Academic Information
              </h1>
            </div>

            <div className="flex flex-col gap-3">
              {/* admission date */}
              <div className="flex items-center gap-2">
                <img className="w-6" src={date} alt="date" />
                <p className="quick text-lg text-white">
                  <span className="font-bold">Admission Date: </span>
                  {admissionDates}
                </p>
              </div>

              {/* events */}
              <div className="flex items-center gap-2">
                <img className="w-6" src={eventss} alt="events" />
                <p className="quick text-lg text-white flex gap-3">
                  <span className="font-bold">Events: </span>
                  <span className="flex items-center gap-2">
                    {events?.map((event, idx) => (
                      <p key={idx} className="border w-fit px-2">
                        {event?.name}
                      </p>
                    ))}
                  </span>
                </p>
              </div>

              {/* Sports */}
              <div className="flex items-center gap-2">
                <img className="w-6" src={sportss} alt="sports" />
                <p className="quick text-lg text-white flex gap-3">
                  <span className="font-bold">Sports: </span>
                  <span className="flex items-center gap-2">
                    {sports?.map((sport, idx) => (
                      <p key={idx} className="border w-fit px-2">
                        {sport?.name}
                      </p>
                    ))}
                  </span>
                </p>
              </div>

              {/* research history */}
              <div className="flex items-center gap-2">
                <img className="w-6" src={research} alt="research" />
                <p className="quick text-lg text-white flex gap-3">
                  <span className="font-bold">Research History: </span>
                  <span className="flex items-center gap-2">
                    {researchHistory?.map((history, idx) => (
                      <p key={idx} className="border w-fit px-2">
                        {history}
                      </p>
                    ))}
                  </span>
                </p>
              </div>

              {/* research count */}
              <div className="flex items-center gap-2">
                <img className="w-6" src={count} alt="count" />
                <p className="quick text-lg text-white">
                  <span className="font-bold">Research Count: </span>
                  {researchCount}
                </p>
              </div>

              {/* papers */}
              <div className="flex items-center gap-2">
                <img className="w-6" src={paper} alt="count" />
                <p className="quick text-lg text-white">
                  <span className="font-bold">Papers: </span>
                  {title} |{" "}
                  <span className="bg-white text-[#890C25] py-1 px-2 rounded-xl ">
                    <a target="_blank" href={link}>
                      View
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* our admission process */}
      <div className="shadow-sm py-20 px-16 container mx-auto rounded-3xl my-28">
        <h1 className="text-center slab text-[#890C25] font-bold text-5xl mb-12 ">
          Our Admission Process <br /> & Requirements
        </h1>
        <div className="flex justify-between gap-6">
          <div className="border-1 border-[#890C25] rounded-2xl p-6 w-full bg-[#FFF4F6]">
            <h3 className="underline quick font-black text-xl text-center mb-6 ">
              {admissionProcess}
            </h3>
            {/* admission process details */}
            <div className="flex flex-col gap-3">
              {steps?.map((step, idx) => (
                <p className="quick" key={idx}>
                  <span className="font-black">Step-{step?.step}.</span>{" "}
                  <span>{step?.description}</span>
                </p>
              ))}
            </div>
          </div>

          {/* requirements */}
          <div className="border-1 border-[#890C25] rounded-2xl p-6 w-full bg-[#FFF4F6]">
            <h3 className="underline quick font-black text-xl text-center mb-6 ">
              Requirements
            </h3>

            <div className="flex flex-col gap-3">
              <p className="text-[#890C25] quick">
                <span className="font-black">Requirement-1. </span>
                <span>{requirements?.requirement1}</span>
              </p>
              <p className="text-[#890C25] quick">
                <span className="font-black">Requirement-2. </span>
                <span>{requirements?.requirement2}</span>
              </p>
              <p className="text-[#890C25] quick">
                <span className="font-black">Requirement-3. </span>
                <span>{requirements?.requirement3}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* sports and event details */}
      <div className="mb-28 py-20 px-16 bg-[#890C25] container mx-auto">
        <div className="flex justify-between">
          {/* events */}
          <div className="w-full">
            <h1 className="text-white slab text-3xl mb-12">Events</h1>
            <div>
              {events?.map((event, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-white font-bold text-xl quick mb-1.5">
                    {event?.name}
                  </h3>
                  <p className="text-white quick">{event?.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="divider lg:divider-horizontal divider-warning w-full"></div>

          {/* sports */}
          <div className="w-full">
            <h1 className="text-white slab text-3xl mb-12">Sports</h1>

            <div>
              {sports?.map((sport, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-white font-bold text-xl quick mb-1.5">
                    {sport?.name}
                  </h3>
                  <p className="text-white quick">{sport?.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* research and work */}
      <div className="mb-28 px-16">
        <h1 className=" text-center mb-12 text-5xl font-black slab text-[#890C25] ">
          Research Works
        </h1>
        <div className="container mx-auto bg-white rounded-2xl shadow-lg p-16">
          <h2 className="text-2xl font-semibold text-[#890C25] quick mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mb-1 quick">
            <span className="font-bold">University:</span> {university}
          </p>
          <p className="text-sm text-gray-600 mb-3 quick">
            <span className="font-bold ">Published:</span> {published}
          </p>

          <div className="mb-4">
            <h3 className="font-bold text-gray-800 quick">Authors:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 quick">
              {authors?.map((author, index) => (
                <li key={index}>{author}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 quick">Summary:</h3>
            <p className="text-sm text-gray-700 quick">{researchSummary}</p>
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 bg-[#890C25] quick text-white text-sm font-medium rounded-md hover:bg-[#890C25]/90 transition"
          >
            View Full Paper
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
