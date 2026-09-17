import * as Yup from 'yup';
import { MIN_PASSWORD_LENGTH } from '../config/themeConfig';

// Dynamic Password Regex based on MIN_PASSWORD_LENGTH in themeConfig.ts
const minLen = Math.max(0, MIN_PASSWORD_LENGTH ?? 8);
export const passwordRules = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${minLen},}$`);

const getPasswordSchema = (label = 'Password') => {
  let schema = Yup.string().required(`${label} is required`);
  if (minLen > 0) {
    schema = schema.min(minLen, `${label} must be at least ${minLen} characters`);
  }
  return schema;
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: getPasswordSchema('Password'),
  rememberMe: Yup.boolean(),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),
  email: Yup.string()
    .lowercase('Email must be in lowercase')
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: getPasswordSchema('Password').matches(
    passwordRules,
    minLen > 0
      ? `Password must contain uppercase, lowercase, number & special char`
      : 'Password must contain uppercase, lowercase, number & special char'
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match exactly')
    .required('Please confirm your password'),
  agreeToTerms: Yup.boolean(),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .lowercase('Email must be in lowercase')
    .email('Please enter a valid email address')
    .required('Email address is required'),
});

export const resetPasswordSchema = Yup.object().shape({
  password: getPasswordSchema('New password').matches(
    passwordRules,
    minLen > 0
      ? `Password must contain uppercase, lowercase, number & special char`
      : 'Password must contain uppercase, lowercase, number & special char'
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match exactly')
    .required('Please confirm your new password'),
});

export const verifyEmailSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, 'Verification code must be exactly 6 digits')
    .matches(/^\d+$/, 'Verification code must contain only numbers')
    .required('Verification code is required'),
});
