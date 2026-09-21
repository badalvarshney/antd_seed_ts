import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import FormikAntdField from '../FormikAntdField';
import type { FormikProps } from 'formik';

export interface FormikEmailInputProps extends Omit<InputProps, 'name'> {
  name: string;
  label?: React.ReactNode;
  formik: FormikProps<any>;
  required?: boolean;
  extra?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
  showPrefixIcon?: boolean;
}

export const FormikEmailInput: React.FC<FormikEmailInputProps> = ({
  name,
  label,
  formik,
  required = false,
  extra,
  wrapperStyle,
  wrapperClassName,
  showPrefixIcon = true,
  prefix,
  ...inputProps
}) => {
  const emailPrefix = prefix || (showPrefixIcon ? <MailOutlined style={{ color: '#bfbfbf' }} /> : undefined);

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
      {(fieldProps) => (
        <Input
          type="email"
          prefix={emailPrefix}
          {...fieldProps}
          {...inputProps}
        />
      )}
    </FormikAntdField>
  );
};

export default FormikEmailInput;
