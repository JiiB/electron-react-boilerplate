import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const App: React.FC = () => {
  return <Wrapper>hello there</Wrapper>;
};

export default App;
