import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import AddressBook from './pages/AddressBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ImageSearch from './pages/ImageSearch';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Postcard from './components/Postcard';

const httpLink = createHttpLink({
  uri: '/graphql', // Adjust the GraphQL API endpoint URL accordingly
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // performs requests efficiently
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className='container'>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/address" element={<AddressBook />} />
              <Route path="/imagesearch" element={<ImageSearch />} />
              <Route path="/postcard" element={<Postcard />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
