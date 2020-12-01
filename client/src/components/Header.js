import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import styled from 'styled-components';
import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';

const Styles = styled.div`
  .navbar {
    background-color: black;
  }
  .navbar-toggler-icon {
    background-color: white;
  }
  #dropdown-basic-button {
    background-color: black;
    font-weight: 100; 
    font-size: 24px;
    padding: 9px 8px 0px 8px;
    border: none;
    color: white;
  }
  #dropdown-basic-button:hover {
    color:orange;
  }
  .dropdown-item:hover {
    color: orange;
  }
`;

const StyledLink = styled(Link)`
  color: white !important;
      &:hover {
      color: orange !important;
    }
  font-weight: bold;
  font-size: 24px;
`;

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <>
      <Styles>
        <Navbar expand='lg'>
          <Navbar.Brand as={StyledLink} to='/'><h2>My DigiLib</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={StyledLink} to='/'>Home
                  </Nav.Link>
                  <Nav.Link as={StyledLink} to={`/books/${localStorage.getItem('user_id')}`}>List My Books
                  </Nav.Link>

                  <DropdownButton id="dropdown-basic-button" title="Add New Books">
                    <Dropdown.Item href='/addbookisbn' className='drop-item'>Search for Books with ISBN</Dropdown.Item>
                    <Dropdown.Item href='/addbookmanual' className='drop-item'>Add Books Manually</Dropdown.Item>
                  </DropdownButton>

                  {/* remove before prod
                   <Nav.Link as={StyledLink} to='/addnewbook'>Add New Books
                  </Nav.Link> */}
                  <Nav.Link as={StyledLink} to='/' onClick={logout}>Logout
                  </Nav.Link>
                </>
              ) : (
                  <>
                    <Nav.Link as={StyledLink} to='/login'>Login
                    </Nav.Link>
                    <Nav.Link as={StyledLink} to='/signup'>Signup
                    </Nav.Link>
                  </>
                )}
            </Nav >
          </Navbar.Collapse >
        </Navbar >
      </Styles >
    </>
  );
};

export default Header;
