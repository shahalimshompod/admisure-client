import React from "react";

const ResearchPaperCard = ({ data }) => {
  // destructuring datas
  const { _id, title, authors, university, published, summary, link } = data;

  console.log(authors);

  return (
    <div className="card bg-[#890C25] text-primary-content w-full">
      <div className="card-body">
        <h2 className="card-title quick font-black text-xl">{university}</h2>
        <h2 className="slab text-xl">
          <span className="font-bold underline">Title:</span> {title}
        </h2>
        <p className="quick">
          <span className="font-bold underline">Summary:</span> {summary}
        </p>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap">
            <div>
              <p className="quick font-bold underline">Authors: </p>
            </div>
            {authors?.map((author, idx) => (
              <p
                className="quick border rounded text-center mb-1 ml-1 text-xsm"
                key={idx}
              >
                {author}
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <a href={link} target="_blank">
                <button className="btn border-none quick font-bold bg-[#FFF4F6] w-32">
                  View Paper
                </button>
              </a>
            </div>
            <div>
                <p className="quick "><span className="font-black">Published:</span> {published}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPaperCard;
