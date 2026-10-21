import React from 'react';
import { Link } from 'react-router-dom';

const ContactRow = ({ contact, onDelete, onToggleFavorite }) => {
  const { id, name, phone, email, group, favorite } = contact;

  return (
    <tr className={favorite ? 'favorite-row' : ''}>
      <td>
        <Link to={`/contacts/${id}`}>{name}</Link>
      </td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{group}</td>
      <td>
        <button type="button" onClick={() => onToggleFavorite(id)}>
          {favorite ? 'Bỏ yêu thích' : 'Yêu thích'}
        </button>
        <button type="button" onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ContactRow;
