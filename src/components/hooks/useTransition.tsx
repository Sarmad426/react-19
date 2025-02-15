import { useState, useTransition } from "react";

export default function Home() {
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
    <div className="flex flex-col items-center gap-12">
      <h2 className="text-3xl my-5 py-4">{userName || "Enter a name"}</h2>
      <div>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Type your name"
          className="border p-3 h-[40px] w-[20rem] rounded-md mx-3"
        />
        <button onClick={handleSubmit} disabled={isPending} className="ml-2">
          {isPending ? "Updating..." : "Update"}
        </button>
        {error && <p className="text-red-500 my-2 md:-ml-60">{error}</p>}
      </div>
    </div>
  );
}
