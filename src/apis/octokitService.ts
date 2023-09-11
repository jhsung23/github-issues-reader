import { Endpoints } from '@octokit/types';

import octokitInstance from '@/apis/octokitInstance';
import { REPO } from '@/constants';

const ENDPOINT = 'GET /repos/{owner}/{repo}/issues' as const;

export type IssuesResponse = Endpoints[typeof ENDPOINT]['response'];
export type IssuesResponseData = IssuesResponse['data'];

export const getIssues = async (pageNumber: number, perPage: number) => {
  const response = await octokitInstance().request(ENDPOINT, {
    owner: REPO.OWNER,
    repo: REPO.NAME,
    page: pageNumber,
    per_page: perPage,
    state: 'open',
    sort: 'comments',
  });

  return response.data;
};
