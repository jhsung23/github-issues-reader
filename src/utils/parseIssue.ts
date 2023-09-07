import { IssuesResponseData } from '@/apis/octokitService';
import { Issue } from '@/types/issue';

const parseIssue = (issue: IssuesResponseData[number]): Issue => ({
  issueId: issue.id,
  issueNumber: issue.number,
  userName: issue.user ? issue.user.login : '알 수 없음',
  title: issue.title,
  createdAt: new Date(issue.created_at),
  comments: issue.comments,
  avatarUrl: issue.user ? issue.user.avatar_url : 'https://i.stack.imgur.com/frlIf.png',
  body: issue.body ?? '',
});

export default parseIssue;
