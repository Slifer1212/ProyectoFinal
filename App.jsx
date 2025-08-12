import React, { useState } from 'react';
import Header from './components/Header/Header';
import PostList from './components/PostList/PostLists';  // Corregido: PostList con L mayúscula
import AuthModal from './components/AuthModal/AuthModal';
import NewPostModal from './components/NewPostModal/NewPostModal';
import Toast from './components/Toast/Toast';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';  // Corregido: usePosts, no usePost
import { authService } from './services/authService';  // Corregido: authService, no AuthServices
import { postService } from './services/postService';
import './App.css';


function App() {
  const { user, loading: authLoading } = useAuth();
  const { posts, loading: postsLoading, refreshPosts } = usePosts();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleAuth = async (formData, isRegistering) => {
    try {
      if (isRegistering) {
        await authService.register(formData.email, formData.password, {
          nombre: formData.nombre,
          apellido: formData.apellido
        });
        showToast('¡Cuenta creada exitosamente!', 'success');
      } else {
        await authService.login(formData.email, formData.password);
        showToast('¡Sesión iniciada exitosamente!', 'success');
      }
      setShowAuthModal(false);
    } catch (error) {
      const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'Este correo ya está registrado'
        : error.code === 'auth/weak-password'
        ? 'La contraseña debe tener al menos 6 caracteres'
        : error.code === 'auth/invalid-credential'
        ? 'Credenciales incorrectas'
        : 'Error en la autenticación';
      
      showToast(errorMessage, 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      showToast('Sesión cerrada exitosamente', 'info');
    } catch (error) {
      showToast('Error al cerrar sesión', 'error');
    }
  };

  const handleNewPost = async (postData) => {
    try {
      await postService.createPost(postData, user);
      showToast('¡Post publicado exitosamente!', 'success');
      setShowNewPostModal(false);
      refreshPosts();
    } catch (error) {
      showToast('Error al publicar el post', 'error');
    }
  };

  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onNewPostClick={() => setShowNewPostModal(true)}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        <PostList 
          posts={posts} 
          loading={postsLoading} 
          user={user} 
        />
      </main>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
      
      <NewPostModal 
        isOpen={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
        onSubmit={handleNewPost}
      />
      
      <Toast 
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />
    </div>
  );
}

export default App;