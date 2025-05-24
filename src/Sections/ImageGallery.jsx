import React from "react";
import image1 from "../assets/images/student-1.webp";
import image2 from "../assets/images/student-2.jpg";
import image3 from "../assets/images/student3.jpg";
import image4 from "../assets/images/student4.webp";
import image5 from "../assets/images/student5.avif";
import image6 from "../assets/images/student-6.jpg";
import image7 from "../assets/images/student-7.jpg";
import image8 from "../assets/images/student-8.jpg";
import image9 from "../assets/images/student9.jpg";

const ImageGallery = () => {
  return (
    <div>
      <div className="bg-[#890C25] p-10 sm:p-16 md:p-20 rounded-3xl flex flex-col items-center gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-4 sm:gap-5 max-w-4xl px-4 text-center">
          <p className="quick border px-3 py-1 rounded-sm text-white border-white text-sm sm:text-base">
            Happy Gallery
          </p>
          <h2 className="slab text-white font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight">
            A Walk Through Our Visual Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 rounded-3xl w-full max-w-7xl px-4 sm:px-0">
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image1}
            alt="Gallery image 1"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image2}
            alt="Gallery image 2"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image3}
            alt="Gallery image 3"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image4}
            alt="Gallery image 4"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image5}
            alt="Gallery image 5"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image6}
            alt="Gallery image 6"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image7}
            alt="Gallery image 7"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image8}
            alt="Gallery image 8"
          />
          <img
            className="rounded-xl object-cover w-full h-48 sm:h-56 md:h-64"
            src={image9}
            alt="Gallery image 9"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
