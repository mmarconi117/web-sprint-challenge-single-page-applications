import React, { useState, useEffect } from 'react';
import { validationSchema } from './Schema';
import axios from 'axios';

const initialForm = {
  name: '',
  size: '',
  toppings: [],
  pepperoni: false,
  mushrooms: false,
  olives: false,
  onions: false,
  special: ''
};

const OrderForm = () => {
  const [form, setForm] = useState(initialForm);
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    validationSchema.isValid(form).then(valid => setDisabled(!valid));
  }, [form]);

  const handleChange = evt => {
    const { name, value, checked, type } = evt.target;
    const newVal = type === 'checkbox' ? checked : value;

    if (type === 'checkbox') {
      if (checked) {
        setForm(prevForm => ({ ...prevForm, toppings: [...prevForm.toppings, value] }));
      } else {
        setForm(prevForm => ({ ...prevForm, toppings: prevForm.toppings.filter(t => t !== value) }));
      }
    } else {
      setForm({ ...form, [name]: newVal });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.name.length < 2) {
      setErrorMessage({ ...errorMessage, name: 'name must be at least 2 characters' });
      return;
    } else {
      setErrorMessage({ ...errorMessage, name: '' });
    }

    try {
      const response = await axios.post('https://reqres.in/api/orders', form);
      console.log(response.data);
      setForm(initialForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Order Pizza</h2>
      <form id="pizza-form" onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name:</label>
        <p>{errorMessage.name}</p>
        <input
          placeholder='Enter Name'
          name='name'
          type="text"
          id="name-input"
          value={form.name}
          onChange={handleChange}
        />
        <label htmlFor="size-dropdown">Pizza Size:</label>
        <select
          name='size'
          id="size-dropdown"
          value={form.size}
          onChange={handleChange}
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
              checked={form.toppings.includes('pepperoni')}
              onChange={handleChange}
            />
            Pepperoni
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="mushrooms"
              checked={form.toppings.includes('mushrooms')}
              onChange={handleChange}
            />
            Mushrooms
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="onions"
              checked={form.toppings.includes('onions')}
              onChange={handleChange}
            />
            Onions
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="olives"
              checked={form.toppings.includes('olives')}
              onChange={handleChange}
            />
            Olives
          </label>
        </div>

        <label htmlFor="special-text">Special Instructions:</label>
        <input
          name='special'
          type="text"
          id="special-text"
          value={form.special}
          onChange={handleChange}
        />

        {errorMessage.name && <div className="error-message">{errorMessage.name}</div>}

        <button type="submit" id="order-button" disabled={disabled}>Add to Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
