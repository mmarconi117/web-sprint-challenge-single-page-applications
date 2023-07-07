import React, { useState } from 'react';


const OrderForm = () => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setToppings([...toppings, value]);
    } else {
      setToppings(toppings.filter((topping) => topping !== value));
    }
  };

  const handleSpecialInstructionsChange = (event) => {
    setSpecialInstructions(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form fields here before submitting
    if (name.length < 2) {
      setErrorMessage('name must be at least 2 characters');
      return;
    }

    // Submit the form or perform other actions
    // ...

    // Reset the form fields
    setName('');
    setSize('');
    setToppings([]);
    setSpecialInstructions('');
  };

  return (
    <div>
      <h2>Order Pizza</h2>
      <form id="pizza-form" onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name:</label>
        <input
          type="text"
          id="name-input"
          value={name}
          onChange={handleNameChange}
        />

        <label htmlFor="size-dropdown">Pizza Size:</label>
        <select
          id="size-dropdown"
          value={size}
          onChange={handleSizeChange}
        >
          <option value="">-- Select Size --</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <label>Choose Toppings (Select at least 4):</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="pepperoni"
              checked={toppings.includes('pepperoni')}
              onChange={handleToppingChange}
            />
            Pepperoni
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="mushrooms"
              checked={toppings.includes('mushrooms')}
              onChange={handleToppingChange}
            />
            Mushrooms
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="onions"
              checked={toppings.includes('onions')}
              onChange={handleToppingChange}
            />
            Onions
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="olives"
              checked={toppings.includes('olives')}
              onChange={handleToppingChange}
            />
            Olives
          </label>
        </div>

        <label htmlFor="special-text">Special Instructions:</label>
        <input
          type="text"
          id="special-text"
          value={specialInstructions}
          onChange={handleSpecialInstructionsChange}
        />

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <button type="submit" id="order-button">Add to Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
