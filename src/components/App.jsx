import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const findDubleContact = name => {
    const dubleContact = contacts.find(contact => contact.name === name);

    if (dubleContact) {
      return true;
    }
    return false;
  };

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (findDubleContact(name)) {
      alert(`${name} is already in contacts`);

      return false;
    }

    setContacts([contact, ...contacts]);
    return true;
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getUpdateContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    setContacts(prevContacts => {
      let newContactsList = prevContacts.filter(contact => contact.id !== id);
      return newContactsList;
    });
  };

  return (
    <div>
      <h1
        style={{
          display: 'block',
          fontSize: 32,
          color: '#010101',
          margin: 30,
        }}
      >
        Phonebook
      </h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2
        style={{
          display: 'block',
          fontSize: 32,
          color: '#010101',
          margin: 30,
        }}
      >
        Contacts
      </h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={getUpdateContacts} onDelete={handleDelete} />
    </div>
  );
};
