import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../utils/mutations';
import Auth from '../utils/Auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AddressBook.css';


function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const { loading, data, error } = useQuery(QUERY_ME);
  const [addContact] = useMutation(ADD_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [showPostcard, setShowPostcard] = useState(false);
  const [postcardData, setPostcardData] = useState({});

  

  useEffect(() => {
    if (data) {
      setContacts(data.contacts);
    }
  }, [data]);

  const handleUpdate = async (id) => {
    try {
      const updatedContact = await updateContact({
        variables: {
          id: contacts[id].id,
          input: { name: 'Updated Contact' }, // Replace with your update logic
        },
      });
      const updatedContacts = contacts.map((contact, index) => {
        if (index === id) {
          return updatedContact.data.updateContact;
        }
        return contact;
      });
      setContacts(updatedContacts);
    } catch (error) {
      console.log('Error updating contact:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact({
        variables: { id: contacts[id].id },
      });
      const updatedContacts = contacts.filter((contact, index) => index !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.log('Error deleting contact:', error);
    }
  };

  const handleNewContact = async () => {
    try {
      const newContact = {
        name: 'New Contact',
        address: 'New Address',
        email: 'newcontact@example.com',
      };
      const addedContact = await addContact({
        variables: { input: newContact },
      });
      setContacts([...contacts, addedContact.data.addContact]);
    } catch (error) {
      console.log('Error adding contact:', error);
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
    localStorage.setItem('savedContact', JSON.stringify(postcardData));
  
    // Navigate to the image search page
    window.location.href = '/imagesearch';
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className='address-ctn'>
        <h1>Address Book Page</h1>

        <div className="contact-list">
          <button className='btnA' onClick={handleNewContact}>New Contact</button>

          <div className="contact-cards">
            {contacts.map((contact, index) => (
              <div className="contact-card" key={index}>
                <h2>{contact.name}</h2>
                <p>{contact.address}</p>
                <p>{contact.email}</p>
                <button className='btnA' onClick={() => handleUpdate(index)}>Update</button>
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
      </div>

      <Footer />
    </>
  );
}

export default AddressBook;
