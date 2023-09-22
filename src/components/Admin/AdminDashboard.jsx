import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the CSS for styling

const AdminDashboard = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content && !image) {
      alert('Please fill in either the content or select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
      const response = await axios.post('http://127.0.0.1:8000/admins/dashboard/create-post/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Post created successfully!');
        console.log('Post created:', response.data);
        setContent('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            required
            rows={6}
            style={{ width: '80%', maxWidth: '80%', maxHeight: "200px" }}
          />
        </div>

        <div className="form-field">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button" onClick={handleSubmit}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
