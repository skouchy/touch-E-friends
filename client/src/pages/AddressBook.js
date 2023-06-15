import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import './AddressBook.css';


function AddressBook() {
  const [showPostcard, setShowPostcard] = useState(false);
  const [postcardData, setPostcardData] = useState({});
  const { data, loading } = useQuery(QUERY_ME);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [addContact] = useMutation(ADD_CONTACT);
  const [newContact, setNewContact] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });


  const userData = data?.me || {};

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewContact({
      ...newContact,
      [name]: value
    });
  };

  const handleNewContact = async event => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await addContact({
        variables: { ...newContact }
      });

    } catch (error) {
      console.log('Error adding contact:', error);
    }
  };

  const handleUpdate = async ($id, field, value) => {
    const token = Auth.loggedIn() ? Auth.getAddressBook() : null;
    if (!token) {
      return false;
    }
    try {
      await updateContact({
        variables: {
          id: userData.contacts[$id].id,
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
        variables: { id: userData.contacts[$id].id },
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
        <h1>{userData.username}'s Address Book</h1>

        <div className="contact-list">
          <div className='form-box'>
            <h3>Expand your network!</h3>
            <form className='col-12 mx-4' onSubmit={handleNewContact}>
              <label className="new-contact-form">Name:</label>
              <input className='form-input' type="name" name="name" value={newContact.name} onChange={handleChange} />
              <br></br>
              <label className="new-contact-form">Email:</label>
              <input className="form-input" type="email" name="email" value={newContact.email} onChange={handleChange} />
              <br></br>
              <label className="new-contact-form">Address:</label>
              <input className="form-input" type="text" name="address" value={newContact.address} onChange={handleChange} />
              <br></br>
              <label className="new-contact-form">Phone:</label>
              <input className="form-input" type="text" name="phone" value={newContact.phone} onChange={handleChange} />

              <button className='btnA' onClick={handleNewContact}>New Contact</button>
            </form>
          </div>
          <div className="contact-cards">
            {userData.contacts.map((contact, index) => (
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
      </div >

    </>
  );
}

export default AddressBook;