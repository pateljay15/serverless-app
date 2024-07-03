import React from 'react';
import './App.css';
import Nav from './Navbar/Nav';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} /> // Add the Profile route here
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
