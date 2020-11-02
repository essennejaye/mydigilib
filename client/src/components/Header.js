import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import styled from 'styled-components';
import { Nav, Navbar } from 'react-bootstrap';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: white;
    &:hover {
      color: orange;
    }
  }
  .navbar-toggler-icon {
    background-color: white;
  }
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
          <Navbar.Brand as={Link} to='/'>My DigiLib</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to={`/books/${localStorage.getItem('user_id')}`}>List My Books
                  </Nav.Link>
                  <Nav.Link as={Link} to='/addbook'>Add a Book
                  </Nav.Link>
                  <Nav.Link as={Link} to='/' onClick={logout}>Logout
                  </Nav.Link>
                </>
              ) : (
                  <>
                    <Nav.Link as={Link} to='/login'>Login
                    </Nav.Link>
                    <Nav.Link as={Link} to='/signup'>Signup
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

// return (
//            <header className="bg-secondary mb-4 py-2 flex-row align-center">
//             <div className="container flex-row justify-space-between-lg justify-center align-center"> 
//           <Link to='/'>
//             <h1>MyDigiLib</h1>
//           </Link>
//           <nav className='text-center'>
//             {Auth.loggedIn() ? (
//               <>
//                 <Link to={`/books/${localStorage.getItem('user_id')}`}>List My Books</Link>
//                 <Link to='/addbook'>Add a Book</Link>
//                 <a href='/' onClick={logout}>
//                   Logout
//             </a>
//               </>
//             ) : (
//                 <>
//                   <Link to='/login'>Login</Link>
//                   <Link to='/signup'>Signup</Link>
//                 </>
//               )}
//           </nav>
//            </div>
//           </header>
// );

export default Header;
