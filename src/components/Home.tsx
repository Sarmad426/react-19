import { Link } from "react-router-dom";

export default function Home() {
  const linkStyles =
    "flex items-center justify-center bg-black text-white px-4 py-2 rounded-md h-[45px] w-[150px]";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h3 className="text-3xl md:text-4xl font-semibold mb-5">Hooks</h3>
      <div className="flex gap-6 flex-wrap">
        <Link to="/hooks/useContext" className={linkStyles}>
          useContext
        </Link>
        <Link to="/hooks/useTransition" className={linkStyles}>
          useTransition
        </Link>
        <Link to="/hooks/useRef" className={linkStyles}>
          useRef
        </Link>
      </div>
    </div>
  );
}
