import React from 'react';
import styled from 'styled-components';
import books from '../assets/books.jpg'
import { Container } from 'react-bootstrap';

const Styles = styled.div`
  .homepage {
    background: url(${books}) no-repeat;
    background-size: cover;
    color: white;
    position: relative;
    z-index: -2;
  }
  .text-box {
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 10px
  }
  .overlay {
    background-color: #000;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

const Home = () => {
  return (
    <Styles>
      <div className='homepage'>
        <div className='overlay'></div>
        <Container fluid className='text-box'>
          <h2>WHY CATALOG BOOKS IN YOUR PERSONAL LIBRARY?</h2>
          <br />
          <h4>I can be both obsessive and proud when it comes to my book collection, but there are benefits to knowing exactly what books you have and where you have them.</h4>
          <br />
          <h5>
            1. Having your library accessible in an app or doc means never forgetting what you already own and never purchasing unwanted duplicates.<br /><br />
            2. When you lend a book out, make a note, add a tag, or (in some apps) mark the book as checked out so you never lose a borrowed book.<br /><br />
            3. If you ever lose the library due to fire, flood, or other disaster you can use the list to rebuild your collection and (depending on your insurance) possibly recuperate some of the money lost.<br /><br />
            4. Share the list with your family/friends and they’ll never buy you a book you already own.<br /><br />
            5. If you’ve decided to ban yourself from buying new books, well every time you’re in a bookstore, look at your list and admire all the unread books you already own.<br /><br />
            6. Track where/when you bought the book, and help preserve memories associated with the purchase.<br /><br />
          </h5>
          <p>Taken from an article by Emma Nichols | Jan 14, 2016<br />Photo by Perfecto Capucine from Pexels </p>
        </Container>
      </div>
    </Styles>
  )
}

export default Home;
