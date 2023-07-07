import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import { GetUserIdProvider } from './components/Context/GetUserIdContext';

const App = () => {
  return (
    <div className="bg">
      <GetUserIdProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </GetUserIdProvider>
    </div>
  );
};

export default App;
