import React, { useEffect } from 'react';
import { Form, Input, Button, Result } from 'antd';
import { MailOutlined, SendOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import FormikAntdField from '../../components/common/FormikAntdField';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import { forgotPassword, clearMessages } from '../../features/auth/authSlice';
import { selectForgotPasswordState, selectAuthSuccessMessage } from '../../features/auth/authSelectors';

export const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, success } = useSelector(selectForgotPasswordState);
  const successMessage = useSelector(selectAuthSuccessMessage);

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await dispatch(forgotPassword(values) as any);
    },
  });

  if (success) {
    return (
      <div className="fade-in">
        <Result
          status="success"
          title="Reset Link Sent!"
          subTitle={successMessage || `We have sent password reset instructions to ${formik.values.email}.`}
          extra={[
            <Link to="/login" key="login">
              <Button type="primary" size="large" icon={<ArrowLeftOutlined />}>
                Return to Sign In
              </Button>
            </Link>,
            <Button
              key="resend"
              size="large"
              onClick={() => formik.handleSubmit()}
              loading={isLoading}
              style={{ marginTop: 8 }}
            >
              Resend Email
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <AuthHeader
        title="Forgot Password?"
        subtitle="Don't worry! Enter your registered email address and we'll send you reset instructions."
      />

      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <FormikAntdField name="email" label="Email Address" formik={formik} required>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
              placeholder="name@company.com"
              size="large"
              autoComplete="email"
              style={{ textTransform: 'lowercase' }}
              onChange={(e) => {
                formik.setFieldValue('email', e.target.value.toLowerCase());
              }}
            />
          )}
        </FormikAntdField>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isLoading}
          icon={<SendOutlined />}
          style={{ marginTop: 16, marginBottom: 20 }}
        >
          Send Reset Link
        </Button>

        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>
            <ArrowLeftOutlined style={{ marginRight: 6 }} /> Back to Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
