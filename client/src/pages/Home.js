import React from 'react';
import styled from 'styled-components';
import digitalBook from '../assets/digitalBook.svg'

const Styles = styled.div`
  div.background {
    background: url(${digitalBook}) repeat;
    background-size: 40px ;
    border: 2px solid black
  }
  div.transbox {
    margin: 20px;
    background-color: #ffffff;
    border: 1px solid black;
    opacity: 0.9;
  }
  .transbox-text {
    color: black;
    font-weight: bold;
    margin: 5%;
  }
`;
const Home = () => {
  return (
    <Styles>
      <div className='background'>
        <div className='transbox'>
          <div className='transbox-text'>
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
          <p>Taken from an article by Emma Nichols | Jan 14, 2016 </p>
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default Home;
