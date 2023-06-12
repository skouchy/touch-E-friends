import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Postcard.css'; 

function Postcard() {
  const { state } = useLocation();
  const [savedContact, setSavedContact] = useState(null);

  useEffect(() => {
    // Retrieve the saved contact information from localStorage
    const savedContactData = localStorage.getItem('savedContact');

    if (savedContactData) {
      // Parse the JSON string back into an object
      const savedContactObj = JSON.parse(savedContactData);
      setSavedContact(savedContactObj);
    }
  }, []);

  const handleBuyStamp = ()=>{
    window.location.href = "/stripe"

  };

  return (
    <>
      <Navbar />
      <div className="postcard-container">
        <h1>Postcard Preview</h1>
        <div className="front-container">
          <h2>Front</h2>
          <img src={state.selectedImage.urls.small} alt={state.selectedImage.alt_description} />
        </div>
        <div className="back-container">
          <h2>Back</h2>
          {/* Display contact info here */} 
          {savedContact && (
            <div>
              <h2>{savedContact.name}</h2>
              <p>{savedContact.address}</p>
              <p>{savedContact.email}</p>
            </div>
          )}
        </div>
        <br></br>
        <button onClick={handleBuyStamp}>Buy Stamp</button>
      </div>
      <Footer />
    </>
  );
}

export default Postcard;








