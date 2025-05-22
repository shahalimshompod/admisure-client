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
      <div className="bg-[#890C25] p-20 rounded-3xl flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-5">
          <p className="quick border px-2 py-0.5 rounded-sm text-white border-white">
            Happy Gallery
          </p>
          <h2 className="slab text-white font-semibold text-5xl">A Walk Through Our Visual Stories</h2>
        </div>
        <div className="grid grid-cols-3 rounded-3xl gap-6">
          <img className="rounded-xl" src={image1} alt="" />
          <img className="rounded-xl" src={image2} alt="" />
          <img className="rounded-xl" src={image3} alt="" />
          <img className="rounded-xl" src={image4} alt="" />
          <img className="rounded-xl" src={image5} alt="" />
          <img className="rounded-xl" src={image6} alt="" />
          <img className="rounded-xl" src={image7} alt="" />
          <img className="rounded-xl" src={image8} alt="" />
          <img className="rounded-xl" src={image9} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
