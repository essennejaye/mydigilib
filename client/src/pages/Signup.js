import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import { Button, Form } from 'react-bootstrap';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser);
    } catch (e) {
      setFormState({
        username: '',
        email: '',
        password: ''
      })
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit} className='text-center'>
      <h4>Signup</h4>
      <Form.Group className="form-group">
        <Form.Label>Your Username</Form.Label>
        <Form.Control
          size='lg'
          className='form-input'
          name='username'
          id='username'
          type="text"
          ref={autoFocus}
          placeholder="Your username"
          value={formState.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label size='lg'>Email address</Form.Label>
        <Form.Control
          size='lg'
          className='form-input'
          name='email'
          id='email'
          type="email"
          placeholder="Enter email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
       </Form.Text>
      </Form.Group>
      <Form.Group className='form-group'>
        <Form.Label size='lg'>Password</Form.Label>
        <Form.Control
          className='form-input'
          name='password'
          id='password'
          size='lg'
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <div><h2 className='error-text'>Signup failed</h2></div>}
    </Form>
  );
};

export default Signup;
