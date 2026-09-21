import React, { useEffect } from 'react';
import { Form, Input, Button, Result } from 'antd';
import { LockOutlined, CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import FormikAntdField from '../../components/common/FormikAntdField';
import { FormikPasswordInput } from '../../components/common/inputs';
import { AppButton } from '../../components/common/buttons';
import PasswordStrengthBar from '../../components/common/PasswordStrengthBar';
import { resetPasswordSchema } from '../../utils/validationSchemas';
import { resetPassword, clearMessages } from '../../features/auth/authSlice';
import { selectResetPasswordState, selectAuthSuccessMessage } from '../../features/auth/authSelectors';

export const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const token = params.token || searchParams.get('token') || 'demo_reset_token';

  const { isLoading, success } = useSelector(selectResetPasswordState);
  const successMessage = useSelector(selectAuthSuccessMessage);

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      await dispatch(
        resetPassword({
          token,
          password: values.password,
        }) as any
      );
    },
  });

  if (success) {
    return (
      <div className="fade-in">
        <Result
          status="success"
          title="Password Reset Complete!"
          subTitle={successMessage || 'Your password has been reset successfully. You can now sign in with your new credentials.'}
          extra={[
            <Button
              type="primary"
              key="login"
              onClick={() => navigate('/login')}
              icon={<CheckOutlined />}
            >
              Proceed to Sign In
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="fade-in">
      <AuthHeader
        title="Reset Your Password"
        subtitle="Choose a strong new password for your account"
      />

      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <FormikPasswordInput
          name="password"
          label="New Password"
          formik={formik}
          required
          wrapperStyle={{ marginBottom: 6 }}
          prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Enter new password"
          autoComplete="new-password"
        />
        <PasswordStrengthBar password={formik.values.password} />

        <FormikPasswordInput
          name="confirmPassword"
          label="Confirm New Password"
          formik={formik}
          required
          prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
          placeholder="Confirm new password"
          autoComplete="new-password"
        />

        <AppButton
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          icon={<CheckOutlined />}
          style={{ marginTop: 16, marginBottom: 20 }}
        >
          Reset Password
        </AppButton>

        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>
            <ArrowLeftOutlined style={{ marginRight: 6 }} /> Back to Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassword;
