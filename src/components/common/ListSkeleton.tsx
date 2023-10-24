import styled from 'styled-components';

import ListItemSkeleton from './ListItemSkeleton';

const NUMBER_OF_SKELETON = 10;

const ListSkeleton = () => {
  return (
    <Ul>
      {Array.from({ length: NUMBER_OF_SKELETON }).map((_, idx) => (
        <ListItemSkeleton key={idx} />
      ))}
    </Ul>
  );
};

export default ListSkeleton;

const Ul = styled.ul`
  width: 100%;
  height: auto;
`;
