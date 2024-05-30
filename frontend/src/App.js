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
      <Routes>
        <Route path="/grp-6/frontend/" element={<Login />} />
        <Route path="/grp-6/frontend/register" element={<Register />} />
        <Route path="/grp-6/frontend/users" element={<Users />} />
        <Route path="/grp-6/frontend/chats" element={<Chats />} />
        <Route path="/grp-6/frontend/chats/:id/messages" element={<Messages />} />
        <Route path="/grp-6/frontend/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
