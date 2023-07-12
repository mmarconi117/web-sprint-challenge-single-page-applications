// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePge from './Homepge';
// import OrderForm from './OrderForm';
// import './App.css'; // Import the app.css file



// const App = () => {
//   return (
//     <div className="app">
//       <Routes>
//         <Route path="/" element={<HomePge />} />
//         <Route path="/pizza" element={<OrderForm />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";




const Home = props => {
  return (
    <div>
      <h2>Home Screen</h2>
      <Link to='pizza'>
        <button id='order-pizza'>
          <h3>Order Pizza</h3>
        </button>
      </Link>
    </div>
  );
};

const initialFormState = {
	name: '',
	size: '',
	hasPepperoni: false,
	hasMushroom: false,
	hasGreenPepper: false,
	hasOlives: false,
	specialText: ''
}

const initialErrorsState = {
	name: ''
}

const formSchema = yup.object().shape({
	name: yup
	  .string()
    .trim()
	  .min(2, "name must be at least 2 characters")
    .required(),
  });

 function Pizza() {


	const [formValues, setFormValues] = useState(initialFormState);
	const [errors, setErrors] = useState(initialErrorsState);
	const onValueChange = (e) => {
		if (e.target.type === 'checkbox') {
			setFormValues({...formValues, [e.target.name]: !formValues[e.target.name]})
		} else {
			setFormValues({...formValues, [e.target.name]: e.target.value})
		}

		if (e.target.name === 'name') {
			yup.reach(formSchema, 'name').validate(e.target.value)
			.then(() => setErrors({name: ''}))
			.catch((err) => setErrors({name: err.errors[0]}))
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();
		axios.post('https://reqres.in/api/orders', formValues).then(res => {
			console.log(res);
		})
	}
	return (
		<form onSubmit={onSubmit} id="pizza-form">
			<div>
				<input onChange={onValueChange} value={formValues.name} name="name" id="name-input" />
				<p>{errors.name}</p>
			</div>
			<div>
				<select onChange={onValueChange} value={formValues.size} name="size" id="size-dropdown">
					<option value=""></option>
					<option value="Small">Small</option>
					<option value="Medium">Medium</option>
					<option value="Large">Large</option>
				</select>
			</div>
			<div>
				<input onChange={onValueChange} checked={formValues.hasPepperoni} name="hasPepperoni" type="checkbox" />
				Pepperoni
			</div>
			<div>
				<input onChange={onValueChange} checked={formValues.hasMushroom} name="hasMushroom" type="checkbox" />
				Mushroom
			</div>
			<div>
				<input onChange={onValueChange} checked={formValues.hasGreenPepper} name="hasGreenPepper" type="checkbox" />
				Green Pepper
			</div>
			<div>
				<input onChange={onValueChange} checked={formValues.hasOlives} name="hasOlives" type="checkbox" />
				Olives
			</div>
			<div>
				<input onChange={onValueChange} value={formValues.specialText} name="specialText" id="special-text"/>
			</div>
			<button id="order-button">Submit</button>
		</form>
	);
}

const App = () => {

  return (
    <>
      <h1>BloomTech Eats</h1>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='pizza' element={<Pizza />} />
      </Routes>
    </>
  );
};
export default App;
