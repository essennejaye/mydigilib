import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { Button, Form } from 'react-bootstrap';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // use try/catch instead of promises to handle errors
    try {
      // execute login mutation and pass in variable data from form
      const { data } = await login({
        variables: { ...formState }
      });
      Auth.login(data.login);

    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h4>Login</h4>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className='form-input'
          name='email'
          // id='email'
          type="email"
          placeholder="Enter email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
       </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className='form-input'
          name='password'
          // id='password'
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <div>Login failed</div>}
    </Form>
  );






  // return (
  //   <main className='flex-row justify-center mb-4'>
  //     <div className='col-12 col-md-6'>
  //       <div className='card'>
  //         <h4 className='card-header'>Login</h4>
  //         <div className='card-body'>
  //           <form onSubmit={handleFormSubmit}>
  //             <input
  //               className='form-input'
  //               placeholder='Your email'
  //               name='email'
  //               type='email'
  //               id='email'
  //               value={formState.email}
  //               onChange={handleChange}
  //             />
  //             <input
  //               className='form-input'
  //               placeholder='******'
  //               name='password'
  //               type='password'
  //               id='password'
  //               value={formState.password}
  //               onChange={handleChange}
  //             />
  //             <button className='btn d-block w-100' type='submit'>
  //               Submit
  //               </button>
  //           </form>
  //           {error && <div>Login failed</div>}
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // )
}

export default Login;
