import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Issue } from '@/types/issue';
import { IssueInfo } from '@/components/domain/issue';

type Props = {
  issue: Issue;
};

const IssueListItem = ({ issue }: Props) => {
  return (
    <Li>
      <StyledLink to={`/issues/${issue.issueId}`} state={issue}>
        <IssueInfo issue={issue} />
      </StyledLink>
    </Li>
  );
};

export default IssueListItem;

const Li = styled.li`
  list-style: none;

  & + & {
    border-top: 0.5px solid black;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
