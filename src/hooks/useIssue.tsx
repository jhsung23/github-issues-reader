import { useCallback, useEffect, useReducer } from 'react';

import { IssueResponseData, getIssueDetail } from '@/apis/octokitService';

type IssueQueryState = {
  issue: undefined | IssueResponseData;
  isLoading: boolean;
};

const initialIssueQueryState: IssueQueryState = {
  issue: undefined,
  isLoading: false,
};

const useIssue = (issueNumber: number) => {
  const [{ issue, isLoading }, dispatch] = useReducer(issueReducer, initialIssueQueryState);
  const isFirstLoad = issue === undefined;

  const loadIssueDetail = useCallback(async (issueNumber: number) => {
    dispatch({ type: 'requestIssue' });

    try {
      const issueResponse = await getIssueDetail(issueNumber);
      dispatch({ type: 'loadIssue', issue: issueResponse });
    } catch (e) {
      dispatch({ type: 'loadIssue', issue: undefined });
      window.alert(e);
    }
  }, []);

  useEffect(() => {
    if (isNaN(issueNumber)) {
      throw new Error();
    }
    loadIssueDetail(issueNumber);
  }, [issueNumber, loadIssueDetail]);

  return { issue, isFirstLoad, isLoading };
};

const issueReducer = (
  state: IssueQueryState,
  action: { type: 'loadIssue'; issue: IssueQueryState['issue'] } | { type: 'requestIssue' },
): IssueQueryState => {
  switch (action.type) {
    case 'loadIssue': {
      return {
        ...state,
        isLoading: false,
        issue: action.issue,
      };
    }
    case 'requestIssue': {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      throw new Error();
    }
  }
};

export default useIssue;
