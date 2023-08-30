import { Endpoints } from '@octokit/types';
import { useCallback, useEffect, useState } from 'react';

import octokitInstance from '@/apis/octokitInstance';
import { REPO } from '@/constants';

// eslint-disable-next-line react-refresh/only-export-components
const ENDPOINT = 'GET /repos/{owner}/{repo}/issues' as const;
const PER_PAGE = 20;

type IssuesResponse = Endpoints[typeof ENDPOINT]['response'];
export type IssuesResponseData = IssuesResponse['data'];

const useIssueQuery = () => {
  const [issues, setIssues] = useState<IssuesResponseData>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getIssues = useCallback(async () => {
    await octokitInstance()
      .request(ENDPOINT, {
        owner: REPO.OWNER,
        repo: REPO.NAME,
        page: pageNumber,
        per_page: PER_PAGE,
        state: 'open',
        sort: 'comments',
      })
      .then((res) => {
        if (res.data.length < PER_PAGE || res.data.length === 0) setHasNextPage(false);
        setIssues((prev) => [...prev, ...res.data]);
        setIsLoading(false);
      });
  }, [pageNumber]);

  const fetchMoreIssues = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    if (hasNextPage) {
      setIsLoading(true);
      getIssues();
    }
  }, [hasNextPage, getIssues]);

  return { issues, isLoading, hasNextPage, fetchMoreIssues };
};

export default useIssueQuery;
