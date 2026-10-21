const BUILD_TAG = "hb-9472";
/* eslint-disable import/first */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedContacts = localStorage.getItem('gk_contacts');
    if (savedContacts) {
      try {
        const parsed = JSON.parse(savedContacts);
        setContacts(parsed);
        setLoading(false);
        return;
      } catch (err) {
        // Fall back to API call if parsing fails
      }
    }

    const controller = new AbortController();
    axios
      .get('/data/contacts.json', { signal: controller.signal })
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_contacts', JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleDelete = (id) => {
    setContacts((prevContacts) => prevContacts.filter((item) => item.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home contacts={contacts} />} />
        <Route
          path="contacts"
          element={
            <ContactList
              contacts={contacts}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="contacts/new"
          element={
            <AddContact
              contacts={contacts}
              onAddContact={handleAddContact}
            />
          }
        />
        <Route
          path="contacts/:id"
          element={<ContactDetail contacts={contacts} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
