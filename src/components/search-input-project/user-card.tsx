import { GitHubUser } from "../../custom-hooks/fetch-github-users";

export function UserCard({ user }: { user: GitHubUser }) {
  return (
    <div className="flex items-center p-4 bg-white shadow-lg rounded-xl space-x-4">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
        <p className="text-gray-500">@{user.login}</p>
        <p className="text-sm">{user.bio || "No bio available."}</p>
        <p className="text-blue-600 text-sm">{user.followers || 0} followers</p>
      </div>
    </div>
  );
}
