import React from 'react';
import { Container } from 'react-bootstrap';
// import styled from 'styled-components';

// const LayoutColor = styled.div` 
// background:  #c9c5b9;
// `;

export const Layout = (props) => (
  <Container fluid>
    {/* <LayoutColor> */}
    {props.children}
    {/* </LayoutColor> */}
  </Container>
  
);
export default Layout;