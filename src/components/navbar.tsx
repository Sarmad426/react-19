import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    const updateNavigationState = () => {
      setCanGoBack(window.history.length > 1);
      setCanGoForward(historyIndex < window.history.length - 1);
    };

    const handleNavigation = () => {
      updateNavigationState();
    };

    window.addEventListener("popstate", handleNavigation);
    updateNavigationState(); // Initial check

    return () => window.removeEventListener("popstate", handleNavigation);
  }, [historyIndex]);

  const handleBack = () => {
    navigate(-1);
    setHistoryIndex((prev) => prev - 1);
  };

  const handleForward = () => {
    navigate(1);
    setHistoryIndex((prev) => prev + 1);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-4.5 text-white">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className={`text-2xl p-0 -mt-1 ${
              canGoBack
                ? "cursor-pointer hover:text-gray-300"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            &larr;
          </button>
          <div className="text-lg font-bold">React 19 basics</div>
          <button
            onClick={handleForward}
            disabled={!canGoForward}
            className={`text-2xl p-0 -mt-1 ${
              canGoForward
                ? "cursor-pointer hover:text-gray-300"
                : "cursor-not-allowed opacity-50"
            }`}
          >
            &rarr;
          </button>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            React 19
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
