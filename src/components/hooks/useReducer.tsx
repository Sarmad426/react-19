import { useReducer } from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-sm text-center space-y-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Counter</h2>
        <p className="text-5xl font-bold text-indigo-600">{state.count}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => dispatch({ type: "decrement" })}
            className="px-5 py-2 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
          >
            -
          </button>
          <button
            onClick={() => dispatch({ type: "increment" })}
            className="px-5 py-2 rounded-xl bg-green-100 text-green-600 font-medium hover:bg-green-200 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
