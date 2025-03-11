import { useState, useRef, useEffect } from "react";

export const UseRefExamples = () => {
  // Example 1: DOM element reference
  const inputRef = useRef<HTMLInputElement>(null);

  // Example 2: Storing previous state
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>(0);

  // Example 3: Mutable value that doesn't cause re-renders
  const renderCountRef = useRef<number>(0);

  // Example 4: Timer reference for cleanup
  const timerRef = useRef<number | null>(null);

  // Update previous count after render
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  // Track render count
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // Focus the input
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  // Start a timer that updates every second
  const startTimer = () => {
    if (timerRef.current !== null) return; // Prevent multiple timers

    timerRef.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">useRef Examples</h1>

      {/* Example 1: DOM Reference */}
      <div className="mb-8 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold mb-3">1. DOM Element Reference</h2>
        <div className="flex items-center space-x-2 mb-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Focus me!"
            className="px-3 py-2 border border-gray-300 rounded-md flex-grow"
          />
          <button
            onClick={handleFocusInput}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Focus Input
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Click the button to focus the input field using useRef
        </p>
      </div>

      {/* Example 2: Previous State */}
      <div className="mb-8 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold mb-3">
          2. Storing Previous State
        </h2>
        <p className="mb-2">
          Current count: <span className="font-medium">{count}</span>
        </p>
        <p className="mb-4">
          Previous count:{" "}
          <span className="font-medium">{prevCountRef.current}</span>
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Increment
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Example 3: Render Count */}
      <div className="mb-8 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold mb-3">
          3. Mutable Value Without Re-renders
        </h2>
        <p className="text-gray-700">
          This component has rendered{" "}
          <span className="font-bold text-purple-600">
            {renderCountRef.current}
          </span>{" "}
          times.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          The counter updates without triggering additional re-renders
        </p>
      </div>

      {/* Example 4: Timer Reference */}
      <div className="p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold mb-3">
          4. Timer Cleanup Reference
        </h2>
        <p className="mb-4">
          Timer count: <span className="font-medium">{count}</span>
        </p>
        <div className="flex space-x-2">
          <button
            onClick={startTimer}
            className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
            disabled={timerRef.current !== null}
          >
            Start Timer
          </button>
          <button
            onClick={stopTimer}
            className="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            disabled={timerRef.current === null}
          >
            Stop Timer
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          The timer reference allows proper cleanup when stopped or unmounted
        </p>
      </div>
    </div>
  );
};
