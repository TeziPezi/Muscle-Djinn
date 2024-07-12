import React, { useState } from 'react';
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
      <button className="esc_klick" onClick={handleClose}>
    
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Notification;