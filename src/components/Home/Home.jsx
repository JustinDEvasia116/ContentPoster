import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch initial posts data from the server when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/admins/dashboard/view-posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleLoginClick = () => {
    // Navigate to the "/admin" route
    navigate('/admin');
  };

  const handleLike = async (postId) => {
    try {
      // Send a POST request to update the server-side likes count
      
      await axios.put(`http://127.0.0.1:8000/admins/dashboard/${postId}/like/`, { post_id: postId });

      // Update the client-side posts data
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      // Send a POST request to update the server-side dislikes count
      await axios.put(`http://127.0.0.1:8000/admins/dashboard/${postId}/dislike/`, { post_id: postId });

      // Update the client-side posts data
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
        )
      );
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };

  const handleEmojiClick = async (postId) => {
    try {
      // Send a POST request to update the server-side emoji click count
      await axios.put(`http://127.0.0.1:8000/admins/dashboard/${postId}/emoji-click/`, { post_id: postId });

      // Update the client-side posts data
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post,emoji_clicks: post.emoji_clicks+ 1 } : post
        )
      );
    } catch (error) {
      console.error('Error updating emoji click count:', error);
    }
  };

  return (
    <div>
      <header className="app-header">
        <div className="app-title">ContentWriter</div>
        <button className="login-button" onClick={handleLoginClick}>Login</button>
      </header>
      <div className="home-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            {post.image && (
              <div className="post-image">
                <img src={post.image} alt="Post" />
              </div>
            )}
            <div className="post-actions">
              <button onClick={() => handleLike(post.id)}>
                Like ({post.likes})
              </button>
              <button onClick={() => handleDislike(post.id)}>
                Dislike ({post.dislikes})
              </button>
              <div className="emoji-wrapper" onClick={() => handleEmojiClick(post.id)}>
              <img src="src/assets/emoji2.png" alt="Emoji" style={{ height: '1rem' }} /> ({post.emoji_clicks})
              </div>
            </div>
            {/* Other post-related JSX */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
