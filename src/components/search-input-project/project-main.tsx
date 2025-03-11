import { useState, useMemo } from "react";
import { useGitHubUsers } from "../../custom-hooks/fetch-github-users";
import { SearchBar } from "./search-bar";
import { UserCard } from "./user-card";

export function SearchProject() {
  const { data: users, isLoading, error } = useGitHubUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((user) =>
      user.login.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">GitHub Users</h1>
      <SearchBar onSearch={setSearchQuery} />

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error loading data.</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="text-center text-gray-500 col-span-2">
              No users found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
