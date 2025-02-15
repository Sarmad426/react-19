import React, { useRef, useState, useEffect } from "react";

const UseRefExample: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0); // For tracking a value without re-renders
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1); // Track renders

    // Accessing the input element (after the first render)
    if (inputRef.current) {
      console.log("Input Value (Direct):", inputRef.current.value);
    }
  }, [inputValue]); // Effect runs when inputValue changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const incrementCount = () => {
    countRef.current++; // Increment without causing a re-render
    console.log("Count (without re-render):", countRef.current);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-bold mb-6 text-center">useRef Example</h2>

      <div className="mb-6">
        <label
          htmlFor="inputField"
          className="block text-gray-700 font-medium mb-2"
        >
          Input:
        </label>
        <input
          type="text"
          id="inputField"
          ref={inputRef} // Assign the ref to the input element
          value={inputValue}
          onChange={handleInputChange}
          className="border rounded-md p-3 w-full focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={focusInput}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Focus Input
        </button>
        <button
          onClick={incrementCount}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Increment Count
        </button>
      </div>

      <p>Input Value (State): {inputValue}</p>
      <p>Render Count: {renderCount}</p>
    </div>
  );
};

export default UseRefExample;
