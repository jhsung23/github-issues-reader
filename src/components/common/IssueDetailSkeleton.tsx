import styled from 'styled-components';

import { Skeleton } from '.';

const IssueDetailSkeleton = () => {
  return (
    <Container>
      <Title>
        <Skeleton width="100px" height="100px" />
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Skeleton width="100%" style={{ flexGrow: 2 }} />
          <Skeleton width="80%" style={{ flexGrow: 1 }} />
          <Skeleton width="40%" style={{ flexGrow: 1 }} />
        </div>
      </Title>
      <Main>
        <Skeleton width="100%" height="36px" />
        <Skeleton width="100%" height="36px" />
        <Skeleton width="100%" height="36px" />
      </Main>
    </Container>
  );
};

export default IssueDetailSkeleton;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 16px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 10px;
`;
