import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const FootStyles = styled(Navbar)`
  a, div, .navbar-nav .nav-link {
    color: black;
    &:hover {
      color: orange;
    }
  }

`

const Footer = () => {
  return (
    <>
      <FootStyles>
          <div>© 2020 Essenne Jaye</div>
          <div style={{ float: 'right' }} className='ml-auto'>
            <Nav.Link as={Link} to='/'>MyDigiLib</Nav.Link>
          </div>
      </FootStyles>
    </>
  );
};

export default Footer;