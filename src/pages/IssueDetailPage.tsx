import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { IssueInfo } from '@/components/domain/issue';
import { Issue } from '@/types/issue';
import { Img } from '@/components/atom';
import { MarkdownViewer } from '@/components/common';

const IssueDetailPage = () => {
  const { state: issue }: { state: Issue } = useLocation();

  return (
    <Article>
      <ArticleInfo>
        <Img src={issue.avatarUrl} height={'50px'} width={'50px'} />
        <IssueInfo issue={issue} />
      </ArticleInfo>
      <MarkdownViewer content={issue.body} />
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
