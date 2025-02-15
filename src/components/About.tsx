import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="links">
      <Link className="link-button" to="/learn-react-19/useTransition">
        useTransition
      </Link>
    </div>
  );
};

export default About;
