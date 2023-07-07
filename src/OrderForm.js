import React, { useState, useEffect } from 'react';
import validationSchema from './Schema';


const OrderForm = () => {
  const [nameInput, setName] = useState('');
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (nameInput.length > 0 && nameInput.length < 2) {
//       setErrorMessage('name must be at least 2 characters');
//     } else {
//       setErrorMessage('');
//     }
//   }, [nameInput]);



  const handleNameChange = (event) => {
    if(validationSchema){
        setName(event.target.value);
    }

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form fields here before submitting
    // if (nameInput.length < 2) {
    //   setErrorMessage('name must be at least 2 characters');
    // }

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
        <p>{errorMessage}</p>
        <input
          type="text"
          id="name-input"
          value={nameInput}
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
          <div>{errorMessage}</div>
        )}

        <button type="submit" id="order-button">Add to Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
