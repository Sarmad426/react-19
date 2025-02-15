import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            React 19
          </Link>
          <Link to="/learn-react-19" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link
            to="/hooks/useTransition"
            className="text-white hover:text-gray-300"
          >
            UseTransition
          </Link>
          <Link
            to="/hooks/useContext"
            className="text-white hover:text-gray-300"
          >
            UseContext
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
