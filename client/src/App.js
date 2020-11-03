import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Layout from './components/Layout';
import Header from './components/Header';
import Footer from './components/Footer';
import Jumbotron from './components/Jumbotron';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import BookList from './pages/BookList';
import SingleBook from './pages/SingleBook';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Signup from './pages/Signup';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path='/books/:user_id' component={BookList} />
              <Route exact path="/addbook" component={AddBook} />
              <Route exact path="/book/:_id" component={SingleBook} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </Layout>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
