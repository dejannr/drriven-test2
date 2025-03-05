// frontend/src/components/Posts.js
import React, { useState, useEffect } from 'react';

function Posts({ token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/posts/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [token]);

  const toggleLike = (postId) => {
    fetch(`http://localhost:8000/api/posts/${postId}/toggle_like/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? { ...post, likes_count: data.likes_count, liked: data.liked }
              : post
          )
        );
      })
      .catch(error => console.error('Error toggling like:', error));
  };

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>{post.subject}</h2>
          <p>{post.description}</p>
          <p>Likes: {post.likes_count}</p>
          <button onClick={() => toggleLike(post.id)}>
            {post.liked ? 'Unlike' : 'Like'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Posts;
