import { useActionState } from "react";

const loginAction = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  const { email, password } = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (email === "" || password === "") {
    return { success: false, message: "Please fill in all fields." };
  } else if (email === "admin@email.com" && password === "abc") {
    return { success: true, message: "Login successful!" };
  } else {
    return { success: false, message: "Invalid credentials." };
  }
};
export const Practice = () => {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  return (
    <form
      action={formAction}
      className="flex flex-col items-center space-y-5 justify-center h-screen"
    >
      <input
        type="email"
        title="email"
        placeholder="email"
        name="email"
        className="outline rounded-md p-1.5 h-[40px] w-[15rem]"
      />
      <input
        type="password"
        name="password"
        title="password"
        placeholder="password"
        className="outline rounded-md p-1.5 h-[40px] w-[15rem]"
      />
      <button
        type="submit"
        className="bg-black min-w-[130px] h-[45px] px-2 py-1 text-white rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isPending}
      >
        {!isPending ? "Submit" : "Logging in..."}
      </button>
      {state && (
        <div>
          <p>{state.message}</p>
        </div>
      )}
    </form>
  );
};
