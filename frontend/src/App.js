import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';
import Chats from './components/Chats';
import Messages from './components/Messages';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/:id/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
