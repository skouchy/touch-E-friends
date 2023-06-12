import React from 'react';
import { Link } from 'react-router-dom';
// import { QUERY_ME } from '../utils/queries';
// import { useQuery } from '@apollo/client';


const ContactList = ({ contactCount, contacts }) => {
    // const { data } = useQuery(QUERY_ME);
    console.log(`MY DATAAAAAA ${contacts}`);



    if (!contacts || !contacts.length ){
        return <h3>No Contacts Yet</h3>;
    }

    return (
        <div>
            {/* <h2>{username}'s Contacts : </h2> */}
            <h3>{contactCount} { contactCount === 1 ? 'Contact' : 'Contacts'}</h3>
            {contacts.map(contact => (
                    <div className="card w-100 display-block mb-2" key={contact._id}>
                        <Link to={`/myaddressbook`}>
                            <h4 className="card-header">
                                {contact.name}
                            </h4>
                        <div className="card-body">
                            <p>{contact.phone}</p>
                            <p>{contact.address}</p>
                            <p>{contact.email}</p>

                        </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default ContactList;