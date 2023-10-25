import { IssueResponseData } from '@/apis/octokitService';

export type Issue = {
  issueId: IssueResponseData['id'];
  issueNumber: IssueResponseData['number'];
  title: IssueResponseData['title'];
  userName: Exclude<IssueResponseData['user'], null>['login'];
  createdAt: IssueResponseData['created_at'];
  comments: IssueResponseData['comments'];
  avatarUrl: Exclude<IssueResponseData['user'], null>['avatar_url'];
  body: IssueResponseData['body'];
};
