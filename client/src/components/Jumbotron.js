import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import digbook1 from '../assets/digbook1.jpg';

const Styles = styled.div`
  .jumbo {
    background: url(${digbook1}) no-repeat;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay"></div>
      <Container>
        <h1 className='title'>My DigiLib</h1>
        <p>Digitally catalog your home library</p>
      </Container>
    </Jumbo>
  </Styles>
)