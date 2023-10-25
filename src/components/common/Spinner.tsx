import styled from 'styled-components';

import spinner from '@/assets/spinner.gif';

const Spinner = () => {
  return (
    <Wrapper>
      <Img src={spinner} alt="spinner" />
    </Wrapper>
  );
};

export default Spinner;

const Wrapper = styled.div`
  background-color: transparent;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 50%;
  height: 50%;
`;
