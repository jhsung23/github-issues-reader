import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getIssues } from '@/apis/octokitService';
import { issuesState } from '@/atoms/issue';

const PER_PAGE = 20;

const useIssues = () => {
  const [{ issues, isLoading, hasNextPage }, setIssuesState] = useRecoilState(issuesState);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchIssues = useCallback(
    async (pageNumber: number) => {
      setIssuesState((prev) => ({ ...prev, isLoading: true }));

      try {
        const responseData = await getIssues(pageNumber, PER_PAGE);
        setIssuesState((prev) => ({
          issues: [...prev.issues, ...responseData],
          isLoading: false,
          hasNextPage: responseData.length < PER_PAGE || responseData.length === 0 ? false : true,
        }));
      } catch (e) {
        window.alert(e);
        setIssuesState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [setIssuesState],
  );

  const fetchNextPage = useCallback(() => {
    setPageNumber(pageNumber + 1);
    fetchIssues(pageNumber + 1);
  }, [pageNumber, fetchIssues]);

  useEffect(() => {
    fetchIssues(1);
  }, [fetchIssues]);

  return { issues, isLoading, hasNextPage, fetchNextPage };
};

export default useIssues;
