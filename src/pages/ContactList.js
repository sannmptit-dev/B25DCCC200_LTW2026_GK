import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';

const ContactList = ({ contacts = [], onDelete, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Tất cả');

  const handleQueryShift = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      contact.name.toLowerCase().includes(query) ||
      contact.phone.includes(query);
    const matchesGroup =
      selectedGroup === 'Tất cả' || contact.group === selectedGroup;
    return matchesQuery && matchesGroup;
  });

  return (
    <div className="contact-list-page">
      <FilterBar
        searchQuery={searchQuery}
        handleQueryShift={handleQueryShift}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
      />
      <p>{`Tìm thấy ${filteredContacts.length} liên hệ`}</p>
      {filteredContacts.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <ContactTable
          contacts={filteredContacts}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
};

export default ContactList;
