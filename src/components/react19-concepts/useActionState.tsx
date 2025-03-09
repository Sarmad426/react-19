import { useActionState } from "react";

const dbUser = { email: "admin@email.com", password: "abc" };

type state = Record<string, boolean | string> | null;

async function loginAction(prevState: state, formData: FormData) {
  "use server";

  console.log("Previous State: ", prevState);
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = dbUser.email === email && dbUser.password === password;

  if (user) return { success: true, message: "Login successful!" };

  return { success: false, message: "Invalid credentials." };
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-black transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          Login
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
