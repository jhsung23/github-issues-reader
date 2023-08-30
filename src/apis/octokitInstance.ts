import { Octokit } from 'octokit';

const octokitInstance = () => {
  return new Octokit({ auth: import.meta.env.VITE_GITHUB_AUTH_TOKEN });
};

export default octokitInstance;
