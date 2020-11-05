import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import { Button, Form } from 'react-bootstrap';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const autoFocus = useCallback(el => el ? el.focus() : null, []);

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
      setFormState({
        email: '',
        password: '',
      });
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  }

  return (
    <Form onSubmit={handleFormSubmit} className='text-center'>
      <h4>Login</h4>
      <Form.Group className='form-group'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          size='lg'
          className='form-input'
          name='email'
          type="email"
          ref={autoFocus}
          placeholder="Enter email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
       </Form.Text>
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          size='lg'
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
      {error && <div><h2 className='error-text'>Login failed</h2></div>}
    </Form>
  );
}

export default Login;
