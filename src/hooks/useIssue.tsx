import { RequestError } from 'octokit';
import { useCallback, useEffect, useReducer } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { IssueResponseData, getIssueDetail } from '@/apis/issueService';
import { getErrorMessage } from '@/utils';

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
  const { showBoundary } = useErrorBoundary();
  const isFirstLoad = issue === undefined;

  const loadIssueDetail = useCallback(
    async (issueNumber: number) => {
      dispatch({ type: 'requestIssue' });

      try {
        const issueResponse = await getIssueDetail(issueNumber);
        dispatch({ type: 'loadIssue', issue: issueResponse });
      } catch (e) {
        dispatch({ type: 'loadIssue', issue: undefined });
        if (e instanceof RequestError) {
          showBoundary(getErrorMessage(e.status));
        }
      }
    },
    [showBoundary],
  );

  useEffect(() => {
    if (isNaN(issueNumber)) {
      throw new Error(getErrorMessage(404));
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
