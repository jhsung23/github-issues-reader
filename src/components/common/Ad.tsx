import styled from 'styled-components';

import ad from '@/assets/ad.png';
import { Img } from '@/components/atom';

const Ad = () => {
  return (
    <Container>
      <a href="https://github.com/jhsung23" target="_blank">
        <Img src={ad} height={'100px'} />
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
