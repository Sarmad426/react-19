import { useActionState, useOptimistic } from "react";

type State = {
  name: string | null;
  message: string;
  error: boolean;
} | null;

export const UseOptimisticHook = () => {
  const updateNameAction = async (prevState: State, formData: FormData) => {
    const name = formData.get("name")?.toString() || "";

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API delay

    if (!name)
      return {
        name: prevState?.name ?? null,
        message: "Name is required.",
        error: true,
      };
    if (name.length < 3)
      return {
        name: prevState?.name ?? null,
        message: "Name should be at least 3 characters.",
        error: true,
      };

    return { name, message: "Name updated successfully!", error: false };
  };

  const [state, formAction, isPending] = useActionState(updateNameAction, null);

  // Optimistic UI handling
  const [optimisticName, setOptimisticName] = useOptimistic(
    state?.name ?? "Anonymous user"
  );

  return (
    <form
      action={(formData) => {
        setOptimisticName(formData.get("name")?.toString() || "Anonymous user"); // Optimistic update before API call
        formAction(formData);
      }}
      className="flex flex-col items-center justify-center space-y-4 h-screen"
    >
      <h3>Name: {optimisticName}</h3>
      <input
        type="text"
        name="name"
        title="name"
        className="outline rounded-md w-[15rem] h-[35px] p-2"
      />
      <button
        className="bg-black text-white p-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Submit"}
      </button>
      {state?.message && (
        <p className={`${!state.error ? "text-emerald-600" : "text-red-500"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
};
