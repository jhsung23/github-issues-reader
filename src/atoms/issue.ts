import { atom } from 'recoil';

import { IssuesResponseData } from '@/apis/issueService';

type IssuesState = {
  issues: IssuesResponseData | undefined;
  isFetching: boolean;
  hasNextPage: boolean;
};

export const issuesState = atom<IssuesState>({
  key: 'issuesState',
  default: {
    issues: undefined,
    isFetching: false,
    hasNextPage: false,
  },
});
