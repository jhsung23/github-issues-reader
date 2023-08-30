import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Img } from '@/components/atom';
import { MarkdownViewer } from '@/components/common';
import { IssueInfo } from '@/components/domain/issue';
import { useScrollTop } from '@/hooks';
import { Issue } from '@/types/issue';

const IssueDetailPage = () => {
  useScrollTop();

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
