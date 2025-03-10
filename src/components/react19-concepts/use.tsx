"use client";

import { use, Suspense } from "react";

// Define the API response type
type DogApiResponse = {
  message: string;
  status: string;
};

// ✅ Store the fetch promise at the module level to persist it across renders
const fetchDogImage: Promise<DogApiResponse> = fetch(
  "https://dog.ceo/api/breeds/image/random"
)
  .then((res) => res.json())
  .catch((err) => {
    console.error("Failed to fetch dog image", err);
    return { message: "", status: "error" } as DogApiResponse;
  });

function DogImage() {
  const dog = use(fetchDogImage); // `use()` consumes the pre-fetched promise

  if (!dog.message) return <p className="text-red-500">Error loading image</p>;

  return (
    <div className="flex flex-col items-center">
      <img
        src={dog.message}
        alt="Random Dog"
        className="w-64 h-64 object-cover rounded-lg shadow-md"
      />
      <p className="mt-2 text-gray-700">Enjoy a random dog picture! 🐶</p>
    </div>
  );
}

export function UseAPI() {
  return (
    <Suspense
      fallback={
        <p className="text-center text-gray-500">Loading dog image...</p>
      }
    >
      <DogImage />
    </Suspense>
  );
}
