import type { RegisterOptions, UseFormWatch } from 'react-hook-form';

export const emailValidatorOptions: RegisterOptions<any, 'email'> = {
  required: {
    value: true,
    message: 'Email is required'
  },
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Please enter a valid email address'
  }
};

export const firstNameValidatorOptions: RegisterOptions<any, 'firstName'> = {
  required: {
    value: true,
    message: 'First name is required'
  }
};

export const lastNameValidatorOptions: RegisterOptions<any, 'lastName'> = {
  required: {
    value: true,
    message: 'Last name is required'
  }
};

export const descriptionValidatorOptions: RegisterOptions<any, 'description'> = {
  required: {
    value: true,
    message: 'Description is required'
  }
};

export const phoneNumberValidatorOptions: RegisterOptions<
  any,
  'phoneNumber'
> = {
  required: {
    value: true,
    message: 'Phone number is required'
  },
  pattern: {
    value: /^\d+$/i,
    message: 'Only digits are allowed'
  }
};