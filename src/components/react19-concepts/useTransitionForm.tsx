import { useState, useTransition } from "react";

export function UseTransitionForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState("");

  const updateName = (newName: string): string | null => {
    if (!newName.trim()) return "Name cannot be empty.";
    return null;
  };

  const handleSubmit = () => {
    const validationError = updateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    startTransition(() => {
      setUserName("Updating...");
      setTimeout(() => {
        setUserName(name);
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col items-center gap-12 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold my-5 py-4 text-gray-800">
        {userName || "Enter a name"}
      </h2>
      <div className="flex flex-col items-center">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Type your name"
          className="border border-gray-300 p-3 h-[40px] w-[20rem] rounded-md mx-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="ml-2 link-styles disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Updating..." : "Update"}
        </button>
        {error && <p className="text-red-500 my-2">{error}</p>}
      </div>
      <div className="bg-blue-50 p-4 rounded-md w-[22rem] mt-4">
        <h3 className="font-medium mb-2">How It Works</h3>
        <p className="text-start">
          The <code className="bg-gray-200 p-1 rounded-md">useTransition</code>{" "}
          hook allows us to mark state updates as non-urgent, preventing UI from
          blocking while the transition is in progress.
        </p>
      </div>
    </div>
  );
}
