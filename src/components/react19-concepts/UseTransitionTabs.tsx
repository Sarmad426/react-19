import { useState, useTransition, memo } from "react";
import { Link } from "react-router-dom";

type TabType = "about" | "posts" | "contact";

type TabButtonProps = {
  action: () => void;
  children: React.ReactNode;
  isActive: boolean;
};

type SlowPostProps = {
  index: number;
};

export function UseTransitionTabs() {
  const [tab, setTab] = useState<TabType>("about");

  const [isPending, startTransition] = useTransition();

  const tabButtons: { name: TabType; label: string }[] = [
    { name: "about", label: "About" },
    { name: "posts", label: "Posts (slow)" },
    { name: "contact", label: "Contact" },
  ];

  return (
    <div className="p-4 flex items-center justify-center flex-col">
      <p className="text-gray-700 my-12">
        <span className="bg-gray-100 p-2 rounded-md">useTransition</span> is a
        React Hook that lets you render a part of the UI in the background.{" "}
        <Link
          to="https://react.dev/reference/react/useTransition"
          target="_blank"
          className="text-indigo-500 underline"
        >
          View docs
        </Link>
      </p>
      <div className="flex gap-4 mb-4">
        {tabButtons.map(({ name, label }) => (
          <TabButton
            key={name}
            isActive={tab === name}
            action={() => startTransition(() => setTab(name))}
          >
            {label}
          </TabButton>
        ))}
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        {isPending && <p className="text-gray-700">Loading...</p>}
        {!isPending && tab === "about" && <AboutTab />}
        {!isPending && tab === "posts" && <PostsTab />}
        {!isPending && tab === "contact" && <ContactTab />}
      </div>
    </div>
  );
}

const TabButton: React.FC<TabButtonProps> = ({
  action,
  children,
  isActive,
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(action)}
      className={`px-4 py-2 rounded-md transition-colors border ${
        isActive
          ? "bg-black text-white"
          : isPending
          ? "bg-gray-500 text-white"
          : "bg-white text-black"
      }`}
    >
      {children}
    </button>
  );
};

function AboutTab() {
  return <p className="text-gray-700">Welcome to my profile!</p>;
}

const PostsTab = memo(function PostsTab() {
  console.log("[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />");
  return (
    <ul className="list-disc pl-6">
      {Array.from({ length: 500 }, (_, i) => (
        <SlowPost key={i} index={i} />
      ))}
    </ul>
  );
});

const SlowPost: React.FC<SlowPostProps> = ({ index }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {}
  return <li className="text-gray-700">Post #{index + 1}</li>;
};

function ContactTab() {
  return (
    <div className="text-gray-700">
      <p>You can find me online here:</p>
      <div className="pl-6">
        <Link
          to="mailto:sarmadrafique040@gmail.com"
          className="text-indigo-500 underline"
        >
          sarmadrafique040@gmail.com
        </Link>
      </div>
    </div>
  );
}
