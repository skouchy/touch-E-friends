import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CONTACT } from '../utils/queries';
import ContactList from './ContactList';

import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Postcard.css'; 

function Postcard() {
  // const { id: contactId} = useParams();

  const { loading, data } = useQuery(QUERY_CONTACT, {
    variables: { id: _id }
  });

  const contact = data?.contact || {};

  if (loading) {
    return <div>Loading...</div>
  }
  const { state } = useLocation();
  // const [savedContact, setSavedContact] () => useState(null);

  // useEffect(() => {
  //   // Retrieve the saved contact information from localStorage
  //   const savedContactData = localStorage.getItem('savedContact');

  //   if (savedContactData) {
  //     // Parse the JSON string back into an object
  //     const savedContactObj = JSON.parse(savedContactData);
  //     setSavedContact(savedContactObj);
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <div className="postcard-container">
        <h2>Postcard Preview</h2>
        <div className="front-container">
          <img src={state.selectedImage.urls.small} alt={state.selectedImage.alt_description} />
        </div>
        <div className="back-container">
          {/* Display contact info here */} 
          {/* {contact && ( */}
            <div>
              <span style={{ fontweight: 700 }}>
                {contact.name}</span>
              <p>{contact.address}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
          {/* )} */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Postcard;




