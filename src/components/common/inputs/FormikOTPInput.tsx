import React from 'react';
import { Form, Input, Flex } from 'antd';
import type { FormikProps } from 'formik';

export interface FormikOTPInputProps {
  name: string;
  label?: React.ReactNode;
  formik: FormikProps<any>;
  length?: number;
  required?: boolean;
  style?: React.CSSProperties;
  className?: string;
  autoFocus?: boolean;
  onlyNumbers?: boolean;
}

export const FormikOTPInput: React.FC<FormikOTPInputProps> = ({
  name,
  label,
  formik,
  length = 6,
  required = false,
  style,
  className = 'otp-form-item',
  autoFocus = false,
  onlyNumbers = true,
}) => {
  const isTouched = Boolean(formik.touched[name] || formik.submitCount > 0);
  const errorMessage = formik.errors[name] as string | undefined;
  const hasError = Boolean(isTouched && errorMessage);
  const value = (formik.values[name] as string) || '';

  const cleanDigits = (str: string) => {
    const raw = (str || '').trim();
    return onlyNumbers ? raw.replace(/\D/g, '') : raw;
  };

  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={hasError ? 'error' : ''}
      className={className}
      style={{ marginBottom: 18, width: '100%', ...style }}
    >
      <Flex vertical align="center" justify="center" gap="small" style={{ width: '100%' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Input.OTP
            length={length}
            formatter={(str) => cleanDigits(str)}
            value={value}
            autoFocus={autoFocus}
            onChange={(val) => {
              const digits = cleanDigits(val || '');
              formik.setFieldValue(name, digits, true);
              formik.setFieldTouched(name, true, false);
            }}
            onInput={(cells) => {
              const combined = cleanDigits((cells || []).join(''));
              formik.setFieldValue(name, combined, true);
              formik.setFieldTouched(name, true, false);
            }}
            status={hasError ? 'error' : undefined}
            size="large"
          />
        </div>
        {hasError && (
          <div key={`${name}-otp-error-static`} className="form-error-text-fixed">
            {errorMessage}
          </div>
        )}
      </Flex>
    </Form.Item>
  );
};

export default FormikOTPInput;
