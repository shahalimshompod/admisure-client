import React from "react";
import Banner from "../Sections/Banner";
import HomeClgCardContainer from "../Sections/HomeClgCardContainer";
import ImageGallery from "../Sections/ImageGallery";
import ResearchPapers from "../Sections/ResearchPapers";
import Reviews from "../Sections/Reviews";

const HomeLayout = () => {
  return (
    <div>
      <Banner />
      <div className="container mx-auto ">
        <HomeClgCardContainer />
        <ImageGallery />
        <ResearchPapers />
        <Reviews />
      </div>
    </div>
  );
};

export default HomeLayout;
