import { Link } from "react-router-dom";

export const UseTransitionLinks = () => {
  return (
    <div className="flex items-center justify-center gap-6 h-screen">
      <Link to="/hooks/useTransition/form" className="link-styles">
        useTransition form
      </Link>
      <Link to="/hooks/useTransition/tabs" className="link-styles">
        useTransition tabs
      </Link>
    </div>
  );
};
