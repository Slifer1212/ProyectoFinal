import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/Helpers';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onAuth }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (isRegistering) {
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
      if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAuth(formData, isRegistering);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', nombre: '', apellido: '' });
    setErrors({});
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>
        
        <div className="form-group">
          {isRegistering && (
            <>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`form-input ${errors.nombre ? 'error' : ''}`}
              />
              {errors.nombre && <span className="error-text">{errors.nombre}</span>}
              
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={`form-input ${errors.apellido ? 'error' : ''}`}
              />
              {errors.apellido && <span className="error-text">{errors.apellido}</span>}
            </>
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
          
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        
        <button onClick={handleSubmit} className="submit-btn">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
        
        <div className="modal-footer">
          <button onClick={toggleMode} className="toggle-btn">
            {isRegistering 
              ? '¿Ya tienes cuenta? Inicia sesión' 
              : '¿No tienes cuenta? Regístrate'}
          </button>
          
          <button onClick={onClose} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;