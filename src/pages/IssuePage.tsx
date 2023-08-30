import { Fragment } from 'react';
import styled from 'styled-components';

import useIssueQuery, { IssuesResponseData } from '@/apis/useIssueQuery';
import { Ad, Loading } from '@/components/common';
import { IssueListItem, ListFallback } from '@/components/domain/issue';
import { useIntersectionObserver } from '@/hooks';
import { Issue } from '@/types/issue';

const PER_LIST = 5;

const IssuePage = () => {
  const { issues, isLoading, hasNextPage, fetchMoreIssues } = useIssueQuery();
  const ref = useIntersectionObserver(fetchMoreIssues, { threshold: 0.3 });

  return (
    <>
      {issues.length ? (
        <>
          <IssueList>
            {issues.map((issue, order) => {
              const filteredIssue = getFilteredIssue(issue);
              return (
                <Fragment key={filteredIssue.issueId}>
                  <IssueListItem issue={filteredIssue} />
                  {(order + 1) % PER_LIST === 0 && <Ad />}
                </Fragment>
              );
            })}
          </IssueList>
          {!isLoading && hasNextPage && <div ref={ref}></div>}
          {isLoading && <Loading />}
        </>
      ) : (
        <ListFallback />
      )}
    </>
  );
};

const getFilteredIssue = (issue: IssuesResponseData[number]): Issue => ({
  issueId: issue.id,
  issueNumber: issue.number,
  userName: issue.user ? issue.user.login : '알 수 없음',
  title: issue.title,
  createdAt: new Date(issue.created_at),
  comments: issue.comments,
  avatarUrl: issue.user ? issue.user.avatar_url : 'https://i.stack.imgur.com/frlIf.png',
  body: issue.body ?? '',
});

export default IssuePage;

const IssueList = styled.ul`
  width: 100%;
`;
