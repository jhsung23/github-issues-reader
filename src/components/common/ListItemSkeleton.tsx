import styled from 'styled-components';

import { Skeleton } from '@/components/common';

const ListItemSkeleton = () => {
  return (
    <Container>
      <Skeleton width={'100%'} height={'36px'} />
      <Skeleton width={'40%'} height={'24px'} />
    </Container>
  );
};

export default ListItemSkeleton;

const Container = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  padding: 16px;
`;
