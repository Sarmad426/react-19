import { useState, useTransition, useOptimistic } from "react";

export function UseTransitionForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [userName, setUserName] = useState("");
  const [optimisticUserName, addOptimisticUserName] = useOptimistic(
    userName,
    (state, newValue: string) => newValue
  );

  const handleFormAction = async (formData: FormData) => {
    const inputName = formData.get("name") as string;
    if (!inputName.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    setError(null);

    // Optimistically update UI
    addOptimisticUserName(inputName);
    setName("");

    startTransition(async () => {
      try {
        // Simulate API call
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

        // Update the actual state after the API call succeeds
        setUserName(inputName);
      } catch (error) {
        setError("Failed to update name. Please try again.");
        setName(inputName); // Restore the previous input
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold my-4 py-2 text-gray-800">
        {optimisticUserName || "Enter a name"}
      </h2>
      <div className="flex flex-col items-center">
        <form action={handleFormAction}>
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type your name"
            className="border border-gray-300 p-2 h-10 w-80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={isPending}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </form>
        {error && <p className="text-red-500 my-2">{error}</p>}
      </div>
      <div className="bg-blue-50 p-4 rounded-md w-80 mt-2">
        <h3 className="font-medium mb-2">How It Works</h3>
        <p className="text-sm">
          The <code className="bg-gray-200 p-1 rounded-md">useOptimistic</code>{" "}
          hook shows immediate UI updates based on the base state ({" "}
          <code className="bg-gray-200 p-1 rounded-md">userName</code>
          ), while{" "}
          <code className="bg-gray-200 p-1 rounded-md">useTransition</code>{" "}
          manages the async update process.
        </p>
      </div>
    </div>
  );
}
