import styled from 'styled-components';

const ListFallback = () => {
  return <Container>issue가 없습니다.</Container>;
};

export default ListFallback;

const Container = styled.div`
  padding: 2rem;
`;
