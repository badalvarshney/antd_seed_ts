import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialAuthButtons from '../../components/auth/SocialAuthButtons';
import FormikAntdField from '../../components/common/FormikAntdField';
import { loginSchema } from '../../utils/validationSchemas';
import { loginUser, clearMessages } from '../../features/auth/authSlice';
import { selectLoginState, selectIsAuthenticated } from '../../features/auth/authSelectors';
import { selectCustomization } from '../../features/customization/customizationSlice';
import { hexToRgba } from '../../utils/colorUtils';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading } = useSelector(selectLoginState);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { presetColor } = useSelector(selectCustomization);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result: any = await dispatch(loginUser(values) as any);
      if (result?.success) {
        navigate(from, { replace: true });
      }
    },
  });

  const handleQuickFill = () => {
    formik.setValues({
      email: 'demo.user@cloudauth.com',
      password: 'Password123!',
      rememberMe: true,
    });
  };

  return (
    <div className="fade-in">
      <AuthHeader
        title="Sign In"
        subtitle="Enter your credentials to access your account"
        linkLabel="Don't have an account?"
        linkText="Sign Up"
        linkTo="/register"
      />

      <SocialAuthButtons actionText="sign in" />

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

        <FormikAntdField name="password" label="Password" formik={formik} required>
          {(fieldProps) => (
            <Input.Password
              {...fieldProps}
              prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Enter your password"
              size="large"
              autoComplete="current-password"
            />
          )}
        </FormikAntdField>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Form.Item name="rememberMe" valuePropName="checked" noStyle>
            <Checkbox
              checked={formik.values.rememberMe}
              onChange={(e) => formik.setFieldValue('rememberMe', e.target.checked)}
            >
              Keep me logged in
            </Checkbox>
          </Form.Item>
          <Link to="/forgot-password" style={{ fontSize: 13, fontWeight: 600, color: presetColor }}>
            Forgot password?
          </Link>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isLoading}
          icon={<ArrowRightOutlined />}
          style={{ marginTop: 8, marginBottom: 12 }}
        >
          Sign In
        </Button>

        <Button
          type="dashed"
          block
          icon={<ThunderboltOutlined style={{ color: '#faad14' }} />}
          onClick={handleQuickFill}
          style={{ borderColor: hexToRgba(presetColor, 0.4), color: presetColor }}
        >
          Quick Fill Demo Credentials
        </Button>
      </Form>
    </div>
  );
};

export default Login;
