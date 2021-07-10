import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import './App.css';

interface OverlayProps {
  visible: boolean
}

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: ${({ visible } : OverlayProps) => visible ? 'initial' : 'none'};
  height: 100vh;
  position: absolute;
  width: 100vw;
`

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  height: 300px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
`

function App() {
  const delay = 2000
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, delay)
  }, [])

  return (
    <Overlay visible={isVisible}>
      <Container>
      </Container>
    </Overlay>
  );
}

export default App;
