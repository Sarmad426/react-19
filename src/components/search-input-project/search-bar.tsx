import { useState, useTransition, useDeferredValue } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    startTransition(() => {
      onSearch(e.target.value);
    });
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search GitHub Users..."
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
    />
  );
}
