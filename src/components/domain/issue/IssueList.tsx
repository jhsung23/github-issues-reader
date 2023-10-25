import { Fragment } from 'react';
import styled from 'styled-components';

import { Ad, ListSkeleton, Spinner } from '@/components/common';
import { IssueListItem, NoListItem } from '@/components/domain/issue';
import { useIntersectionObserver, useIssues } from '@/hooks';
import { parseIssue } from '@/utils';

const PER_LIST = 4;

const IssueList = () => {
  const { issues, isFirstLoad, isFetching, hasNextPage, fetchNextPage } = useIssues();
  const [observerRef] = useIntersectionObserver({ threshold: 0.1 }, fetchNextPage);
  const isFetchable = !isFetching && hasNextPage;

  if (isFirstLoad) return <ListSkeleton />;

  return (
    <>
      {issues && issues.length ? (
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
          {isFetchable && <div ref={observerRef}></div>}
          {isFetching && <Spinner />}
        </>
      ) : (
        <NoListItem />
      )}
    </>
  );
};

export default IssueList;

const Ul = styled.ul`
  width: 100%;
`;
