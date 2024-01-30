import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../redux/contactsSelectors';
import ContactItem from './ContactItem';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
