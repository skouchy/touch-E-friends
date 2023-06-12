import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ADD_CONTACT } from '../utils/mutations';

// import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/Auth';
import Login from './Login';

const UserHomeContacts = () => {
    const { username: userParam } = useParams();
    const [addContact] = useMutation(ADD_CONTACT);
    const { loading, data } = useQuery(QUERY_ME, {
      variables: { username: userParam }
    });
  
    const user = data?.me || data?.user || {};
  
    // redirect to personal profile page if username is the logged-in user's
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return <Link to="/myaddressbook" />;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user?.username) {
      return (
        <h4>
          You need to be logged in to see this page. Use the navigation links above to sign up or log in!
        </h4>
      );
    };
  
    const handleClick = async () => {
      try {
        await addContact({
          variables: { id: user._id }
        });
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block">
            Viewing {userParam ? `${user.username}'s` : 'your'} profile.
          </h2>
          {userParam && (
            <button className="btn ml-auto" onClick={handleClick}>
              Add Contact
            </button>
          )}
        </div>
        <div className="flex-row justify-space-between mb-3">
  {/* {loggedIn && userData ? ( */}
          <div className="col-12 mb-3 col-lg-6">
            <ContactList
              username={user.username}
              contactCount={user.contactCount}
              contacts={user.contacts}
            />
            
          </div>


{/* ) : null} */}
</div>
        <div className="mb-3">{!userParam && <Login />}</div>
      </div>
    );
  };
  
  export default UserHomeContacts;