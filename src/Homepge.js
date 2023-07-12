import React from 'react';
import { Link } from 'react-router-dom';

const HomePge = () => {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>Click the button below to order a pizza:</p>
      <Link to="/pizza" id="order-pizza">Order Pizza</Link>
    </div>
  );
}

export default HomePge;
