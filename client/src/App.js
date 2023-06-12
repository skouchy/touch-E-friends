import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// Stores current request object
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Footer from './components/Footer';
// import AddressBook from './pages/AddressBook';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserHomeContacts from './pages/UserHomeContacts';
// import ImageSearch from './pages/ImageSearch';
import Navbar from './components/Navbar';
// import Postcard from './components/Postcard';

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

      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            {/* <Route path="/home" Component={<Home />} /> */}
            <Route path="/signup" Component={SignUp} />
            <Route path="/login" Component={Login} />
            <Route path="/myaddressbook" Component={UserHomeContacts} />
            {/* <Route path="/addressbook" Component={<AddressBook />} /> */}
            {/* <Route path="/imagesearch" Component={<ImageSearch />} /> */}
            {/* <Route path="/postcard" Component={<Postcard />} /> */}
            <Route path="/" Component={Home} />
          </Routes>
        </div>
        <Footer />
      </Router>

    </ApolloProvider>
  );
}

export default App;
