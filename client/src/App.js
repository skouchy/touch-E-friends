import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddressBook from './pages/AddressBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ImageSearch from './pages/ImageSearch';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: '/graphql', // Adjust the GraphQL API endpoint URL accordingly
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/address" element={<AddressBook />} />
            <Route path="/imagesearch" element={<ImageSearch />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
