import React, { useState } from 'react';
import NewContactForm from '../components/NewContactForm';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CONTACT, DELETE_CONTACT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import './AddressBook.css';



function AddressBook() {
  const [showPostcard, setShowPostcard] = useState(false);
  const [postcardData, setPostcardData] = useState({});
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const { data, loading } = useQuery(QUERY_ME);
  const user = data?.me || {};
  
  

  const handleUpdate = async ($id, field, value) => {
    const token = Auth.loggedIn() ? Auth.getAddressBook() : null;
    if (!token) {
      return false;
    }
    try {
      await updateContact({
        variables: {
          id: user.contacts[$id].id,
          input: { [field]: value }, // Replace with your update logic
        }
      });
    } catch (error) {
      console.log('Error updating contact:', error);
    }
  };

  const handleDelete = async ($id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await deleteContact({
        variables: { id: user.contacts[$id].id },
      });
    } catch (error) {
      console.log('Error deleting contact:', error);
    }
  };


  const handleContactSelect = (contact) => {
    setShowPostcard(true);
    setPostcardData(contact);
  };

  const handleClosePostcard = () => {
    setShowPostcard(false);
    setPostcardData({});
  };

  function handleSaveContact() {
    // Save the contact information to localStorage or a state management solution
    // For example, using localStorage:
    localStorage.setItem('newContact', JSON.stringify(postcardData));

    // Navigate to the image search page
    window.location.href = '/imagesearch';
  }

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <>
      <div className='address-ctn'>
        <h1>{user.username}'s Address Book</h1>

        <div className="contact-list">
          
          <div className="contact-cards">
            {user && user.contacts && user.contacts.map((contact, index) => (
              <div className="contact-card" key={index}>
                <h2>{contact.name}</h2>
                <p>{contact.address}</p>
                <p>{contact.email}</p>
                <button className='btnA' onClick={() => {
                  const field = prompt('Enter the field to update (name, email, or address):');
                  const value = prompt(`Enter the new value for ${field}:`);
                  handleUpdate(index, field, value);
                }}>Update</button>
                <button className='btnA' onClick={() => handleDelete(index)}>Delete</button>
                <button className='btnA' onClick={() => handleContactSelect(contact)}>Create Postcard</button>
              </div>
            ))}
          </div>
        </div>



        {showPostcard && (
          <div className="postcard-overlay">
            <div className="postcard-container">
              <h2>{postcardData.name}</h2>
              <p>{postcardData.address}</p>
              <p>{postcardData.email}</p>
              <button className='btnA' onClick={handleSaveContact}>Send Contact</button>
              <button className='btnA' onClick={handleClosePostcard}>Close Postcard</button>
            </div>
          </div>
        )}
        {Auth.loggedIn() && <NewContactForm />}
      </div >

    </>
  );
}

export default AddressBook;