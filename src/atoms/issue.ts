import { atom } from 'recoil';

import { IssuesResponseData } from '@/apis/octokitService';

type IssuesState = {
  issues: IssuesResponseData;
  isLoading: boolean;
  hasNextPage: boolean;
};

export const issuesState = atom<IssuesState>({
  key: 'issuesState',
  default: {
    issues: [],
    isLoading: false,
    hasNextPage: false,
  },
});
