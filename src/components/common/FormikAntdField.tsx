import React from 'react';
import { Form } from 'antd';
import type { FormikProps } from 'formik';

export interface FormikAntdFieldProps {
  name: string;
  label?: React.ReactNode;
  formik: FormikProps<any>;
  children: React.ReactNode | ((fieldProps: any) => React.ReactNode);
  required?: boolean;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Custom Formik wrapper for Ant Design Form.Item
 * Seamlessly connects Formik touched & error state to Ant Design field validation.
 */
export const FormikAntdField: React.FC<FormikAntdFieldProps> = ({
  name,
  label,
  formik,
  children,
  required = false,
  extra,
  style,
  className,
}) => {
  const isTouched = formik.touched[name];
  const errorMessage = formik.errors[name] as string | undefined;
  const hasError = Boolean(isTouched && errorMessage);

  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={hasError ? 'error' : ''}
      help={hasError ? errorMessage : extra}
      style={{ marginBottom: 18, ...style }}
      className={className}
    >
      {typeof children === 'function' ? children(formik.getFieldProps(name)) : children}
    </Form.Item>
  );
};

export default FormikAntdField;
