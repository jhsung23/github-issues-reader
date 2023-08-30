import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { REPO } from '@/constants';

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        {REPO.OWNER}/{REPO.NAME}
      </StyledLink>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 4rem;
  background-color: white;
  font-size: x-large;
  font-weight: bold;
  border-bottom: 1px solid gray;
  z-index: 50;
  position: sticky;
  top: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
