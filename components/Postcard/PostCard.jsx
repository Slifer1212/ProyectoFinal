import React from 'react';
import { User } from 'lucide-react';
import { formatDate } from '../../utils/Helpers';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <div className="post-author">
          <User className="author-icon" />
          <span>{post.authorName}</span>
        </div>
        <time className="post-date">{formatDate(post.timestamp)}</time>
      </div>
    </article>
  );
};

export default PostCard;