import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';
import FormikAntdField from '../FormikAntdField';
import type { FormikProps } from 'formik';

export interface FormikPasswordInputProps extends Omit<InputProps, 'name'> {
  name: string;
  label?: React.ReactNode;
  formik: FormikProps<any>;
  required?: boolean;
  extra?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
}

export const FormikPasswordInput: React.FC<FormikPasswordInputProps> = ({
  name,
  label,
  formik,
  required = false,
  extra,
  wrapperStyle,
  wrapperClassName,
  ...inputProps
}) => {
  return (
    <FormikAntdField
      name={name}
      label={label}
      formik={formik}
      required={required}
      extra={extra}
      style={wrapperStyle}
      className={wrapperClassName}
    >
      {(fieldProps) => <Input.Password {...fieldProps} {...inputProps} />}
    </FormikAntdField>
  );
};

export default FormikPasswordInput;
