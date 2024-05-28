import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [otherUserId, setOtherUserId] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('/grp-6/chat/chats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/grp-6/chat/chats', { otherUserId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setChats([...chats, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Chats</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Other User ID</label>
          <input type="text" value={otherUserId} onChange={(e) => setOtherUserId(e.target.value)} required />
        </div>
        <button type="submit">Create Chat</button>
      </form>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.id}/messages`}>Chat with {chat.users.join(', ')}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
