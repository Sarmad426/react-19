import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our contexts
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

type UserType = {
  name: string;
  role: string;
};

type UserContextType = {
  user: UserType;
  login: () => void;
  logout: () => void;
};

// Create contexts with default values
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

const UserContext = createContext<UserContextType>({
  user: { name: "", role: "" },
  login: () => {},
  logout: () => {},
});

// Provider component that wraps our app
const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<UserType>({ name: "", role: "" });

  const toggleTheme = () => setIsDark((prev) => !prev);
  const login = () => setUser({ name: "John Doe", role: "Admin" });
  const logout = () => setUser({ name: "", role: "" });

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

// Example components using context
const Header: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <header
      className={`p-4 ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-xl font-bold">My App</h2>
      {user.name ? <p>Welcome, {user.name}</p> : <p>Please log in</p>}
    </header>
  );
};

const Controls: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { user, login, logout } = useContext(UserContext);

  return (
    <div className="p-4 mt-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
      >
        Switch to {isDark ? "Light" : "Dark"} Theme
      </button>

      {user.name ? (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={login}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Login
        </button>
      )}
    </div>
  );
};

// Main component that demonstrates useContext
const UseContextExample: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        useContext Hook Example
      </h1>

      <p className="text-center text-lg text-gray-700 mx-auto my-5">
        The useContext hook in React lets you access context values directly in
        functional components. It helps share data like themes, user
        information, or application settings across your component tree without
        complex nesting. This creates a centralized store of data that any
        component can access easily.
      </p>

      <AppProviders>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Header />
          <Controls />

          <div className="p-4 bg-blue-50 m-4 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">How It Works</h3>
            <p className="text-blue-700">
              Both the Header and Controls components use the same context
              values. Try toggling the theme or logging in to see how they stay
              in sync!
            </p>
          </div>
        </div>
      </AppProviders>
    </div>
  );
};

export default UseContextExample;
