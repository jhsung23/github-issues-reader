import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { IssueResponseData } from '@/apis/octokitService';
import { Img } from '@/components/atom';
import { IssueDetailSkeleton, MarkdownViewer } from '@/components/common';
import { IssueInfo } from '@/components/domain/issue';
import { useIssue } from '@/hooks';
import { Issue } from '@/types/issue';

const IssueDetailPage = () => {
  const { id } = useParams();
  const { issue, isFirstLoad, isLoading } = useIssue(Number(id));
  const parsedIssue = issue ? parseIssue(issue) : undefined;

  if (isFirstLoad || isLoading) return <IssueDetailSkeleton />;

  return (
    <Article>
      <ArticleInfo>
        <Img src={parsedIssue?.avatarUrl} height={'50px'} width={'50px'} />
        <IssueInfo issue={parsedIssue!} />
      </ArticleInfo>
      <MarkdownViewer content={parsedIssue?.body as string} />
    </Article>
  );
};

export default IssueDetailPage;

const Article = styled.article`
  width: 100%;
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
`;

const parseIssue = (issue: IssueResponseData): Issue => ({
  issueId: issue.id,
  issueNumber: issue.number,
  title: issue.title,
  userName: issue.user?.login || 'unknown',
  createdAt: issue.created_at,
  comments: issue.comments,
  avatarUrl: issue.user?.avatar_url || '',
  body: issue.body || '',
});
