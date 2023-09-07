import { Fragment, useEffect } from 'react';
import styled from 'styled-components';

import useIssueQuery from '@/apis/useIssueQuery';
import { Ad, Loading } from '@/components/common';
import { IssueListItem, ListFallback } from '@/components/domain/issue';
import { useIntersectionObserver } from '@/hooks';
import { parseIssue } from '@/utils';

const PER_LIST = 4;

const IssueList = () => {
  const { issues, isLoading, hasNextPage, fetchNextPageIssues } = useIssueQuery();
  const [observerRef, inView] = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (!isLoading && inView) fetchNextPageIssues();
  }, [isLoading, inView, fetchNextPageIssues]);

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
