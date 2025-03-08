import { useActionState } from "react";

async function loginAction(prevState: any, formData: FormData) {
  console.log(prevState);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === "admin@example.com" && password === "password123") {
    return { success: true, message: "Login successful!" };
  } else {
    return { success: false, message: "Invalid credentials." };
  }
}

export function UseActionState() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-black min-w-[130px] h-[45px] px-2 py-1 text-white rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      {state && (
        <p
          className={`mt-4 text-center ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
