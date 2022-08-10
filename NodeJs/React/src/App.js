import Login from './Routes/Login/Login.js';
import MainPage from './Routes/MainPage/MainPage';
import Register from './Routes/Login/Register/Register';
import Forgot from './Routes/Login/Forgot/Forgot.js';
import Club from './Routes/Club/Club.js';
import Club2 from './Routes/Club/club2.js';
import { Routes, Route, Outlet, /* Outlet, useParams, */ } from 'react-router-dom'
import React from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot" element={<Forgot />} />
        <Route path="/login/register" element={<Register />} />
        
        <Route path="club" element={<Club />}/>
        <Route path="club2" element={<Club2 />}/>

      </Routes>
    </>
  );
}

export default App;
