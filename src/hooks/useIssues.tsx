import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getIssues } from '@/apis/issueService';
import { issuesState } from '@/atoms/issue';

const PER_PAGE = 20;

const useIssues = () => {
  const [{ issues, isFetching, hasNextPage }, setIssuesState] = useRecoilState(issuesState);
  const [pageNumber, setPageNumber] = useState(1);
  const isFirstLoad = issues === undefined;

  const fetchIssues = useCallback(
    async (pageNumber: number) => {
      setIssuesState((prev) => ({
        ...prev,
        isFetching: true,
      }));

      try {
        const responseData = await getIssues(pageNumber, PER_PAGE);
        console.log(responseData);
        setIssuesState((prev) => ({
          issues: prev.issues ? [...prev.issues, ...responseData] : [...responseData],
          isFetching: false,
          hasNextPage: responseData.length < PER_PAGE || responseData.length === 0 ? false : true,
        }));
      } catch (e) {
        window.alert(e);
        setIssuesState((prev) => ({ ...prev, isFetching: false }));
      }
    },
    [setIssuesState],
  );

  const fetchNextPage = useCallback(() => {
    setPageNumber(pageNumber + 1);
    fetchIssues(pageNumber + 1);
  }, [pageNumber, fetchIssues]);

  useEffect(() => {
    if (isFirstLoad) {
      fetchIssues(1);
    }
  }, [isFirstLoad, fetchIssues]);

  return { issues, isFirstLoad, isFetching, hasNextPage, fetchNextPage };
};

export default useIssues;
