import { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';

const Fallback = ({ error }: FallbackProps) => {
  return <Container>{error.message}</Container>;
};

export default Fallback;

const Container = styled.div`
  padding: 2rem;
`;
