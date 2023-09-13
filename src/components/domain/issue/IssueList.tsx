import { Fragment } from 'react';
import styled from 'styled-components';

import { Ad, Loading } from '@/components/common';
import { IssueListItem, ListFallback } from '@/components/domain/issue';
import { useIssues, useIntersectionObserver } from '@/hooks';
import { parseIssue } from '@/utils';

const PER_LIST = 4;

const IssueList = () => {
  const { issues, isLoading, hasNextPage, fetchNextPage } = useIssues();
  const [observerRef] = useIntersectionObserver({ threshold: 0.1 }, fetchNextPage);

  return (
    <>
      {issues.length ? (
        <>
          <Ul>
            {issues.map((issue, order) => {
              const parsedIssue = parseIssue(issue);
              return (
                <Fragment key={parsedIssue.issueId}>
                  <IssueListItem issue={parsedIssue} />
                  {(order + 1) % PER_LIST === 0 && <Ad />}
                </Fragment>
              );
            })}
          </Ul>
          {!isLoading && hasNextPage && <div ref={observerRef}></div>}
          {isLoading && <Loading />}
        </>
      ) : (
        <ListFallback />
      )}
    </>
  );
};

export default IssueList;

const Ul = styled.ul`
  width: 100%;
`;
