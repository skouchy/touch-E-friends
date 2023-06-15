import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import AddressBook from './pages/AddressBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ImageSearch from './pages/ImageSearch';
import Postcard from './components/Postcard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



const httpLink = createHttpLink({
  uri: '/graphql', // Adjust the GraphQL API endpoint URL accordingly
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // performs requests efficiently
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/address" element={<AddressBook />} />
            <Route path="/imagesearch" element={<ImageSearch />} />
            <Route path="/postcard" element={<Postcard />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
