import React, { useActionState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";

type UpdateResult = {
  name: string | null;
  error: boolean;
  message: string;
};

const updateNameInDB = async (name: string): Promise<UpdateResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!name.trim()) {
    return { name: null, error: true, message: "Name is required" };
  }
  return { name, error: false, message: "Name updated successfully" };
};

export function UseFormStatusHook() {
  const [state, actionFunction, isPending] = useActionState(updateName, {
    name: "",
    error: false,
    message: "",
  });

  const [optimisticName, setOptimisticName] = useOptimistic(state.name);

  async function updateName(
    prevState: UpdateResult,
    formData: FormData
  ): Promise<UpdateResult> {
    const newName = (formData.get("name") as string) || "";
    setOptimisticName(newName);
    try {
      const result = await updateNameInDB(newName);
      return { ...prevState, ...result };
    } catch (error) {
      return { ...prevState, error: true, message: "Update failed" };
    }
  }

  return (
    <>
      <p className="mt-12">
        Current user: <span>{optimisticName}</span>
      </p>

      <form
        action={actionFunction}
        className="flex space-x-4 items-center justify-center mt-2.5"
      >
        <input
          type="text"
          name="name"
          title="name"
          required
          className="outline rounded-md w-[15rem] h-[35px] p-2"
        />
        <Button
          type="submit"
          className="bg-black text-white p-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Update
        </Button>
        {!isPending && state.error && <p className="error">{state.message}</p>}
      </form>
    </>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function Button({ children, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();
  return <button {...rest}>{pending ? "Submitting..." : children}</button>;
}
