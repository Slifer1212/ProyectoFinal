import React from 'react';
import PostCard from '../PostCard/PostCards';
import { MessageSquare } from 'lucide-react';
import './PostList.css';

const PostList = ({ posts, loading, user }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <MessageSquare className="empty-icon" />
        <h2 className="empty-title">No hay publicaciones aún</h2>
        <p className="empty-text">
          {user 
            ? "¡Sé el primero en publicar algo!" 
            : "Inicia sesión para crear la primera publicación"}
        </p>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2 className="posts-title">Publicaciones Recientes</h2>
        <p className="posts-subtitle">
          {user 
            ? "Comparte tus ideas con la comunidad" 
            : "Explora las publicaciones o inicia sesión para participar"}
        </p>
      </div>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;