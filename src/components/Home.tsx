import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="my-5">
        <h3 className="text-3xl md:text-4xl font-semibold mb-5">Hooks</h3>
        <div className="flex gap-6 flex-wrap">
          <Link to="/hooks/useContext" className="link-styles">
            useContext
          </Link>
          <Link to="/hooks/useRef" className="link-styles">
            useRef
          </Link>
        </div>
      </div>
      <div className="my-8">
        <h3 className="text-3xl md:text-4xl font-semibold mb-5">
          React 19 Concepts
        </h3>
        <div className="flex gap-6 flex-wrap">
          <Link
            to="https://react.dev/blog/2024/12/05/react-19"
            target="_blank"
            className="link-styles"
          >
            View Docs
          </Link>
          <Link to="/hooks/useTransition" className="link-styles">
            useTransition
          </Link>
          <Link to="/hooks/useActionState" className="link-styles">
            useActionState
          </Link>
          <Link to="/hooks/useOptimistic" className="link-styles">
            useOptimistic
          </Link>
          <Link to="/hooks/useFormStatus" className="link-styles">
            useFormStatus
          </Link>
          <Link to="/API/use" className="link-styles">
            use() API
          </Link>
        </div>
      </div>
    </div>
  );
}
