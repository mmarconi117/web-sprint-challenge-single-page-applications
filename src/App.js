import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePge from './Homepge';
import OrderForm from './OrderForm';
import './App.css'; // Import the app.css file



const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePge />} />
        <Route path="/pizza" element={<OrderForm />} />
      </Routes>
    </div>
  );
};

export default App;
