import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};

export default Toast;