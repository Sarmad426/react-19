import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        404 - Page Not Found
      </h1>
      <Link to="/" className="text-lg bg-amber-600 p-5 rounded-md text-white">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
