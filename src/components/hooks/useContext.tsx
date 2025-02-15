import React, { createContext, useContext, useState } from "react";

// If we are using it in a separate module then we need to export the MyContext component
const MyContext = createContext<{
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  message: "",
  setMessage: () => {},
});

const UseContextHook: React.FC = () => {
  const [message, setMessage] = useState("Hello from Parent!");

  return (
    <MyContext.Provider value={{ message, setMessage }}>
      <p className="text-start text-lg text-gray-700 w-4/6 mx-auto my-5">
        The useContext hook in React lets you access context values directly in
        a functional component. It is a way of data sharing between components
        It makes it easier to use context without wrapping components in a
        Consumer. This is helpful for sharing data like themes, user info, or
        settings across the component tree without passing props manually. It
        avoids prop drilling (manually passing props through multiple levels of
        components).
      </p>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Context Example
        </h1>
        <div className="mb-8">
          <label
            htmlFor="message"
            className="text-lg font-medium text-gray-700"
          >
            Message:
          </label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-black mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Child1 />
      </div>
    </MyContext.Provider>
  );
};

const Child1: React.FC = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Child 1</h2>
      <Child2 />
    </div>
  );
};

const Child2: React.FC = () => {
  // If we were in a separate component we need to import the MyContext
  const { message, setMessage } = useContext(MyContext);

  return (
    <div className="bg-blue-200 p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Child 2</h2>
      <p className="text-xl text-blue-800 mb-6">
        Message from Parent: <span className="font-semibold">{message}</span>
      </p>
      <button
        onClick={() => setMessage("Message from Child 3")}
        className="px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Change Message
      </button>
    </div>
  );
};

export default UseContextHook;
