import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import FormikAntdField from '../../components/common/FormikAntdField';
import PasswordStrengthBar from '../../components/common/PasswordStrengthBar';
import { registerSchema } from '../../utils/validationSchemas';
import { registerUser, clearMessages } from '../../features/auth/authSlice';
import { selectRegisterState, selectIsAuthenticated } from '../../features/auth/authSelectors';
import { selectCustomization } from '../../features/customization/customizationSlice';

export const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(selectRegisterState);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { presetColor } = useSelector(selectCustomization);

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: true,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const result: any = await dispatch(registerUser(values) as any);
      if (result?.success) {
        navigate('/verify-email', { replace: true });
      }
    },
  });

  return (
    <div className="fade-in">
      <AuthHeader
        title="Create Account"
        subtitle="Sign up in seconds to start using Cloud Auth"
        linkLabel="Already have an account?"
        linkText="Sign In"
        linkTo="/login"
      />

      <SocialAuthButtons actionText="sign up" />

      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <FormikAntdField name="firstName" label="First Name" formik={formik} required>
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                  placeholder="John"
                  size="large"
                />
              )}
            </FormikAntdField>
          </Col>
          <Col xs={24} sm={12}>
            <FormikAntdField name="lastName" label="Last Name" formik={formik} required>
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                  placeholder="Doe"
                  size="large"
                />
              )}
            </FormikAntdField>
          </Col>
        </Row>

        <FormikAntdField name="email" label="Email Address" formik={formik} required>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
              placeholder="john.doe@example.com"
              size="large"
              autoComplete="email"
              style={{ textTransform: 'lowercase' }}
              onChange={(e) => {
                formik.setFieldValue('email', e.target.value.toLowerCase());
              }}
            />
          )}
        </FormikAntdField>

        <FormikAntdField name="password" label="Password" formik={formik} required style={{ marginBottom: 6 }}>
          {(fieldProps) => (
            <Input.Password
              {...fieldProps}
              prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Create a strong password"
              size="large"
              autoComplete="new-password"
            />
          )}
        </FormikAntdField>
        <PasswordStrengthBar password={formik.values.password} />

        <FormikAntdField name="confirmPassword" label="Confirm Password" formik={formik} required>
          {(fieldProps) => (
            <Input.Password
              {...fieldProps}
              prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Re-enter your password"
              size="large"
              autoComplete="new-password"
            />
          )}
        </FormikAntdField>

        <Form.Item style={{ marginBottom: 20 }}>
          <Checkbox
            checked={formik.values.agreeToTerms}
            onChange={(e) => formik.setFieldValue('agreeToTerms', e.target.checked)}
          >
            I agree to the{' '}
            <span style={{ color: presetColor, fontWeight: 600, cursor: 'pointer' }}>Terms of Service</span> and{' '}
            <span style={{ color: presetColor, fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span>
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isLoading}
          icon={<UserAddOutlined />}
          style={{ marginTop: 16 }}
        >
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default Register;
