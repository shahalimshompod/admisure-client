import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1
        className="slab text-6xl md:text-8xl font-bold mb-6"
        style={{ color: "#890C25" }}
      >
        404
      </h1>
      <h2
        className="slab text-3xl md:text-5xl mb-4"
        style={{ color: "#890C25" }}
      >
        Page Not Found
      </h2>
      <p className="quick text-lg md:text-xl max-w-xl text-gray-700">
        Oops! The page you are looking for does not exist or has been moved.
        Please check the URL or return to the homepage.
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-3 bg-[#890C25] text-white rounded-md hover:bg-[#6f081c] transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
