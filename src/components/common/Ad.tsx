import styled from 'styled-components';

import { Img } from '@/components/atom';

const Ad = () => {
  return (
    <Container>
      <a href="https://www.wanted.co.kr/" target="_blank">
        <Img
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
          height={'80px'}
        />
      </a>
    </Container>
  );
};

export default Ad;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
`;
