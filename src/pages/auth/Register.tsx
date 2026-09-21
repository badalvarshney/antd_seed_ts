import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import FormikAntdField from '../../components/common/FormikAntdField';
import { FormikTextInput, FormikEmailInput, FormikPasswordInput } from '../../components/common/inputs';
import { AppButton } from '../../components/common/buttons';
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
            <FormikTextInput
              name="firstName"
              label="First Name"
              formik={formik}
              required
              prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
              placeholder="John"
            />
          </Col>
          <Col xs={24} sm={12}>
            <FormikTextInput
              name="lastName"
              label="Last Name"
              formik={formik}
              required
              prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Doe"
            />
          </Col>
        </Row>

        <FormikEmailInput
          name="email"
          label="Email Address"
          formik={formik}
          required
          placeholder="john.doe@example.com"
          autoComplete="email"
          style={{ textTransform: 'lowercase' }}
          onChange={(e) => {
            formik.setFieldValue('email', e.target.value.toLowerCase());
          }}
        />

        <FormikPasswordInput
          name="password"
          label="Password"
          formik={formik}
          required
          wrapperStyle={{ marginBottom: 6 }}
          prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Create a strong password"
          autoComplete="new-password"
        />
        <PasswordStrengthBar password={formik.values.password} />

        <FormikPasswordInput
          name="confirmPassword"
          label="Confirm Password"
          formik={formik}
          required
          prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

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

        <AppButton
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          icon={<UserAddOutlined />}
          style={{ marginTop: 16 }}
        >
          Create Account
        </AppButton>
      </Form>
    </div>
  );
};

export default Register;
