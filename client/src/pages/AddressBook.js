import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import {ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../utils/mutations';
import { GET_CONTACTS } from '../utils/queries';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AddressBook.css';

function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const { data, loading, error } = useQuery(GET_CONTACTS);
  const [addContact] = useMutation(ADD_CONTACT);
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);

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
              </div>
            ))}
          </div>
        </div>

        <Link to="/imageSearch">
          <button className='btnA'>Image Search</button>
        </Link>
      </div>

      <Footer />
    </>
  );
}

export default AddressBook;






// TODO: Update for Address Book 

// import React from 'react';
// import {
//   Container,
//   Card,
//   Button,
//   Row,
//   Col
// } from 'react-bootstrap';

// import { useQuery, useMutation } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';
// import { REMOVE_BOOK } from '../utils/mutations';
// import { removeBookId } from '../utils/localStorage';

// import Auth from '../utils/auth';

// const SavedBooks = () => {
//   const { loading, data } = useQuery(QUERY_ME);
//   const [removeBook, { error }] = useMutation(REMOVE_BOOK);

//   const userData = data?.me || {};

//   // create function that accepts the book's mongo _id value as param and deletes the book from the database
//   const handleDeleteBook = async (bookId) => {
//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await removeBook({
//         variables: { bookId },
//       });

//       // upon success, remove book's id from localStorage
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div fluid className="text-light bg-dark p-5">
//         <Container>
//           <h1>Viewing {userData.username}'s books!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedBooks?.length
//             ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'
//             }:`
//             : 'You have no saved books!'}
//         </h2>
//         <div>
//           <Row>
//             {userData.savedBooks?.map((book) => {
//               return (
//                 <Col md="4">
//                   <Card key={book.bookId} border="dark">
//                     {book.image ? (
//                       <Card.Img
//                         src={book.image}
//                         alt={`The cover for ${book.title}`}
//                         variant="top"
//                       />
//                     ) : null}
//                     <Card.Body>
//                       <Card.Title>{book.title}</Card.Title>
//                       <p className="small">Authors: {book.authors}</p>
//                       <Card.Text>{book.description}</Card.Text>
//                       <Button
//                         className="btn-block btn-danger"
//                         onClick={() => handleDeleteBook(book.bookId)}
//                       >
//                         Delete this Book!
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               );
//             })}
//           </Row>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default SavedBooks;