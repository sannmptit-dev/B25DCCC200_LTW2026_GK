import React from 'react';

const Home = ({ contacts = [] }) => {
  const totalContacts = contacts.reduce((acc) => acc + 1, 0);
  const favoriteContacts = contacts.reduce(
    (acc, contact) => (contact.favorite ? acc + 1 : acc),
    0
  );
  const gmailContacts = contacts.reduce((acc, contact) => {
    return contact.email && contact.email.endsWith('@gmail.com') ? acc + 1 : acc;
  }, 0);

  return (
    <div className="home-page">
      <h1>Danh bạ</h1>
      <p>{`Tổng số liên hệ: ${totalContacts}`}</p>
      <p>{`Số liên hệ yêu thích: ${favoriteContacts}`}</p>
      <p>{`Số liên hệ dùng Gmail: ${gmailContacts}`}</p>
    </div>
  );
};

export default Home;
