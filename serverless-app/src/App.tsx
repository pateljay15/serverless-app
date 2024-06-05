import React, { useEffect, useState } from 'react';
import './App.css';
import Nav from './Navbar/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Auth/Signup';
import Login from './Pages/Auth/Login';
import Home from './Pages/Home';

function App() {
  const [posts, setPosts] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Signup />} /> 
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} /> 
        </Routes>
        <Routes>
          <Route path="/home" element={<Home />} /> 
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
