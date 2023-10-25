import { IssueResponseData } from '@/apis/issueService';
import { Issue } from '@/types/issue';

const parseIssue = (issue: IssueResponseData): Issue => ({
  issueId: issue.id,
  issueNumber: issue.number,
  title: issue.title,
  userName: issue.user?.login || 'unknown',
  createdAt: issue.created_at,
  comments: issue.comments,
  avatarUrl: issue.user?.avatar_url || 'https://i.stack.imgur.com/frlIf.png',
  body: issue.body || '',
});

export default parseIssue;
