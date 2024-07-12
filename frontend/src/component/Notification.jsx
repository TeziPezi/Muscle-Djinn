import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="notification">
      <p>{message}</p>
      <button className="close-btn" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Notification;