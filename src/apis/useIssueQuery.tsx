import { useCallback, useEffect, useReducer, useState } from 'react';
import { IssuesResponseData, getIssues } from './octokitService';

const PER_PAGE = 20;

type IssueQueryState = {
  issues: IssuesResponseData;
  isLoading: boolean;
  hasNextPage: boolean;
};

const useIssueQuery = () => {
  const [{ issues, isLoading, hasNextPage }, dispatch] = useReducer(issueReducer, {
    issues: [],
    isLoading: false,
    hasNextPage: false,
  });
  const [pageNumber, setPageNumber] = useState(1);

  const fetchIssues = useCallback(async (pageNumber: number) => {
    try {
      const responseData = await getIssues(pageNumber, PER_PAGE);
      dispatch({
        type: 'loadIssue',
        issues: responseData,
        hasNextPage: responseData.length < PER_PAGE || responseData.length === 0 ? false : true, // FIXME
      });
    } catch (e) {
      window.alert(e);
    }
  }, []);

  const fetchNextPageIssues = useCallback(() => {
    setPageNumber(pageNumber + 1);
    dispatch({ type: 'requestIssue' });
    fetchIssues(pageNumber + 1);
  }, [pageNumber, fetchIssues]);

  useEffect(() => {
    dispatch({ type: 'requestIssue' });
    fetchIssues(1);
  }, [fetchIssues]);

  return { issues, isLoading, hasNextPage, fetchNextPageIssues };
};

const issueReducer = (
  state: IssueQueryState,
  action:
    | {
        type: 'loadIssue';
        issues: IssuesResponseData;
        hasNextPage: boolean;
      }
    | {
        type: 'requestIssue';
      },
): IssueQueryState => {
  switch (action.type) {
    case 'requestIssue': {
      return { ...state, isLoading: true };
    }
    case 'loadIssue': {
      return {
        ...state,
        issues: [...state.issues, ...action.issues!],
        isLoading: false,
        hasNextPage: action.hasNextPage!,
      };
    }
    default: {
      throw new Error();
    }
  }
};

export default useIssueQuery;
