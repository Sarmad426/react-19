import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  followers?: number;
}

const fetchGitHubUsers = async (): Promise<GitHubUser[]> => {
  const { data } = await axios.get("https://api.github.com/users");
  return data;
};

export const useGitHubUsers = () => {
  return useQuery({
    queryKey: ["githubUsers"],
    queryFn: fetchGitHubUsers,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};
