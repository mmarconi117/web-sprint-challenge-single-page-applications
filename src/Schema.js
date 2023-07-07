import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  size: yup.string().required('Pizza size is required'),
  toppings: yup
    .array()
    .min(4, 'Select at least 4 toppings')
    .required('Select at least 4 toppings'),
  specialInstructions: yup.string().optional(),
});

export default validationSchema;
