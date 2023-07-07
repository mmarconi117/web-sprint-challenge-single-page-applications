import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Homepge';
import OrderForm from './OrderForm';
import './App.css'; // Import the app.css file

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderForm />} />
      </Routes>
    </div>
  );
};

export default App;
