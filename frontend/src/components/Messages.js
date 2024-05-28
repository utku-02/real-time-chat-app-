import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/grp-6/chat/chats/${id}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/grp-6/chat/chats/${id}/messages`, { content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message</label>
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
