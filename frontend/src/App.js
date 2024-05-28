import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';
import Chats from './components/Chats';
import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
