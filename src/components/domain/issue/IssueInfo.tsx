import styled from 'styled-components';

import { Heading } from '@/components/atom';
import { Issue } from '@/types/issue';
import { getFormatDateString } from '@/utils';

type Props = {
  issue: Issue;
};

const IssueInfo = ({ issue }: Props) => {
  const { issueNumber, title, userName, createdAt, comments } = issue;

  return (
    <Container>
      <Info>
        <Heading size="large">
          #{issueNumber} {title}
        </Heading>
        <Heading size="small">
          작성자: {userName}, 작성일: {getFormatDateString(new Date(createdAt))}
        </Heading>
      </Info>
      <Comment>코멘트: {comments}</Comment>
    </Container>
  );
};

export default IssueInfo;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.2rem 1rem;
`;

const Info = styled.div`
  flex-grow: 1;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: medium;
  min-width: 90px;
`;
