import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import '@/App.css';
import { Header } from '@/components/common';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  max-width: 724px;
  margin: auto;
  padding-bottom: 80px;
`;
