import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './NewPostModal.css';

const NewPostModal = ({ isOpen, onClose, onSubmit }) => {
  const [postData, setPostData] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!postData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }
    
    if (!postData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(postData);
      setPostData({ title: '', content: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content new-post-modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Crear Nueva Publicación</h2>
        
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Título del post"
            value={postData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            maxLength={100}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
          
          <textarea
            name="content"
            placeholder="¿Qué quieres compartir?"
            value={postData.content}
            onChange={handleChange}
            className={`form-textarea ${errors.content ? 'error' : ''}`}
            maxLength={500}
          />
          {errors.content && <span className="error-text">{errors.content}</span>}
          
          <div className="char-count">
            {postData.content.length}/500 caracteres
          </div>
        </div>
        
        <div className="modal-actions">
          <button onClick={handleSubmit} className="submit-btn">
            <Send className="btn-icon" />
            Publicar
          </button>
          <button onClick={onClose} className="cancel-btn-secondary">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;