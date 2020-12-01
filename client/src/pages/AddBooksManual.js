import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_BOOK } from '../utils/mutations';
import { Form, Button, Container, FormControl } from 'react-bootstrap';
import Auth from '../utils/auth';

const AddBooksManual = () => {

  // create state for holding form data
  const [bookFormState, setBookFormState] = useState({
    user_id: localStorage.getItem('user_id'), title: '', authors: [], description: '', image: '',
    pages: 0, bookISBN: '', datePublish: '', category: ['None']
  });

  // mutation for adding a book to the catalog
  const [addBook, { error }] = useMutation(ADD_BOOK);

  const autoFocus = useCallback(el => el ? el.focus() : null, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.name === 'image') {
      var image = e.target.files[0];
      if (image) {
        var reader = new FileReader();
        reader.addEventListener('load', async function (e) {
          var dataUrl = e.target.result;
          setBookFormState({ ...bookFormState, [name]: dataUrl })
        });
        reader.readAsDataURL(image);
      }
    }
     else {
      setBookFormState({
        ...bookFormState,
        [name]: value
      })
    }
  }

  // create function to cancel adding book to database
  const handleClearBook = async () => {
    setBookFormState(null);
    window.location.assign('/addbookmanual');
    return;
  }

  const manualAddBook = async () => {

    const bookData = bookFormState;
    bookData.pages = parseInt(bookData.pages);
    console.log('book data is ', bookData);

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    
    try {
      // execute addBook mutation and pass in data from form
      await addBook({
        variables: { bookData: bookData }
      })
      window.location.assign(`/books/${localStorage.getItem('user_id')}`)
      setBookFormState(null);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    // Form for manual book entry
    <>
      <Container fluid className='manual-book'>
        <Form className='text-center'>
          <Form.Group className='manual-form-group'>
            <Form.Label>Book Title</Form.Label>
            <FormControl
              className='form-input'
              name='title'
              id='title'
              ref={autoFocus}
              type='input'
              placeholder='Title'
              required
              value={setBookFormState.title}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              This field is required!
            </Form.Text>
          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Author(s)</Form.Label>
            <FormControl
              className='form-input'
              name='authors'
              id='authors'
              type='text'
              required
              placeholder='Author(s) or "Unknown"'
              value={setBookFormState.authors}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              This field is required!
            </Form.Text>
          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Description</Form.Label>
            <FormControl
              className='form-input'
              name='description'
              id='description'
              as='textarea'
              placeholder='Please enter a brief description of what this book is about'
              required
              value={setBookFormState.description}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              This field is required!
            </Form.Text>
          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Number of Pages</Form.Label>
            <FormControl
              className='form-input'
              name='pages'
              id='pages'
              type='number'
              placeholder='Numbers only'
              value={setBookFormState.pages}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Category</Form.Label>
            <div className='book-options'>
              <select name='category' value={setBookFormState.category} onChange={handleChange}>
                <option value="none">None</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-Fiction</option>
              </select>
            </div>

            {/* future more category selections mapping */}
            {/*{['checkbox'].map((type) => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Check
                  type={type}
                  id={`default-${type}`}
                  label={`default ${type}`}
                  checked={setBookFormState.category}
                  onChange={handleChange}
                />
              </div>
            ))} */}

          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Date/Year Published</Form.Label>
            <FormControl
              className='form-input'
              name='datePublish'
              id='datePublish'
              type='text'
              placeholder='MM/DD/YYYY or YYYY'
              value={setBookFormState.datePublish}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Book ISBN</Form.Label>
            <FormControl
              className='form-input'
              name='bookISBN'
              id='bookISBN'
              type='text'
              placeholder='10 or 13 digit ISBN'
              value={setBookFormState.bookISBN}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='manual-form-group'>
            <Form.Label>Book Image</Form.Label>
            <Form.File
              className='centered-file-input'
              name='image'
              id='image'
              type='file'
              accept="image/png, image/jpeg, image/jpg, image/gif"
              value={setBookFormState.image}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Please upload an image from your files!
            </Form.Text>
          </Form.Group>

          <>
            {Auth.loggedIn() && (
              <>
                <Button
                  variant='primary'
                  className='manual-button'
                  onClick={() => manualAddBook()}>
                  Add This Book
                </Button>
                <Button
                  variant='danger'
                  className='manual-button'
                  onClick={() => handleClearBook()}>
                  Cancel/Clear Form
                </Button>
              </>
            )}
          </>
        </Form>
      </Container>
      { error && <div><h2>Oops, something went wrong</h2></div>}
    </>
  )
}

export default AddBooksManual;
