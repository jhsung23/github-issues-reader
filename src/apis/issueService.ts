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

const ISSUE_ENDPOINT = `${ENDPOINT}/{issue_number}` as const;

export type IssueResponse = Endpoints[typeof ISSUE_ENDPOINT]['response'];
export type IssueResponseData = IssueResponse['data'];

export const getIssueDetail = async (issueNumber: number) => {
  const response = await octokitInstance().request(ISSUE_ENDPOINT, {
    owner: REPO.OWNER,
    repo: REPO.NAME,
    issue_number: issueNumber,
  });

  return response.data;
};
