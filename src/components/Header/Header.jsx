import React from 'react';
import { MessageSquare, LogIn, LogOut, Plus } from 'lucide-react';
import './Header.css';

const Header = ({ user, onAuthClick, onNewPostClick, onLogout }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <MessageSquare className="header-icon" />
          <h1 className="header-title">Muro Interactivo</h1>
        </div>
        
        <div className="header-actions">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button onClick={onNewPostClick} className="btn btn-primary">
                <Plus className="btn-icon" />
                <span className="btn-text-desktop">Nuevo Post</span>
              </button>
              <button onClick={onLogout} className="btn btn-danger">
                <LogOut className="btn-icon" />
                <span className="btn-text-desktop">Salir</span>
              </button>
            </>
          ) : (
            <button onClick={onAuthClick} className="btn btn-primary">
              <LogIn className="btn-icon" />
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;