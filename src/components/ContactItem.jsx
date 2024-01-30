import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsApi';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const deleteContactHandler = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <span>{contact.name}: {contact.number}</span>
      <button onClick={() => deleteContactHandler(contact.id)}>Delete</button>
    </div>
  );
};

export default ContactItem;
