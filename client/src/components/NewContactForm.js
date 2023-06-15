import { useMutation } from "@apollo/client";
import React, { useState } from "react";
// import { QUERY_ME } from '../utils/queries'
import { ADD_CONTACT } from "../utils/mutations";



const NewContactForm = ({input}) => {
    // const { me } = useQuery(QUERY_ME);
    // const user = data?.me || {};
    
    const [newContact, setNewContact] = useState({
        name: '',
        address: '',
        email: '',
        phone: ''
    });
    const [addContact, { error }] = useMutation(ADD_CONTACT)

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setNewContact({
            ...newContact,
            [name]: value
        });
    };
    
    
    const handleNewContact = async (event) => {
        event.preventDefault();
        console.log("name bitch");
        console.log("name bitch");
        console.log("name bitch");
        console.log("name bitch");
        console.log(newContact.name);
        try {
            await addContact({
                variables: { 
                    input: { ...newContact }
                }
            });
        } catch (error) {
            console.error(error);
        }
    
    }
    return (
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

                <button className='btnA' type="submit" onSubmit={handleNewContact}> New Contact </button>
            </form>
            {error && <span className="ml-2">Something went wrong...</span>}
        </div>
    );
};

export default NewContactForm;
