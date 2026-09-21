import React, { useEffect, useState } from 'react';
import { Form, Button, Result, Spin, Input, Flex } from 'antd';
import { MailOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import FormikAntdField from '../../components/common/FormikAntdField';
import { FormikOTPInput } from '../../components/common/inputs';
import { AppButton } from '../../components/common/buttons';
import { verifyEmailSchema } from '../../utils/validationSchemas';
import { verifyEmail, resendVerificationCode, clearMessages } from '../../features/auth/authSlice';
import { selectVerifyEmailState, selectAuthSuccessMessage } from '../../features/auth/authSelectors';

export const DEFAULT_RESEND_TIME_SECONDS = 10;

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export interface VerifyEmailProps {
  initialTimerSeconds?: number;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ initialTimerSeconds = DEFAULT_RESEND_TIME_SECONDS }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const urlToken = params.token || searchParams.get('token');
  const { isLoading, success } = useSelector(selectVerifyEmailState);
  const successMessage = useSelector(selectAuthSuccessMessage);

  const [resendCooldown, setResendCooldown] = useState(initialTimerSeconds);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(clearMessages());
    if (urlToken) {
      dispatch(verifyEmail({ token: urlToken }) as any);
    }
  }, [dispatch, urlToken]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: verifyEmailSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const codeStr = String(values.code || '').trim();
      await dispatch(verifyEmail({ code: codeStr }) as any);
    },
  });

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(initialTimerSeconds);
    await dispatch(resendVerificationCode() as any);
  };

  if (urlToken && isLoading) {
    return (
      <Flex vertical align="center" justify="center" style={{ padding: '40px 0' }} className="fade-in">
        <Spin size="large" />
        <p style={{ marginTop: 16, color: '#64748b', fontWeight: 500 }}>
          Verifying your email address, please wait...
        </p>
      </Flex>
    );
  }

  if (success) {
    return (
      <div className="fade-in">
        <Result
          status="success"
          title="Email Verified Successfully!"
          subTitle={successMessage || 'Thank you! Your email address has been verified. You can now access all features.'}
          extra={[
            <Button
              type="primary"
              key="dashboard"
              onClick={() => navigate('/')}
              icon={<CheckCircleOutlined />}
            >
              Go to Dashboard
            </Button>,
          ]}
        />
      </div>
    );
  }

  const hasErrorCode = Boolean((formik.touched.code || formik.submitCount > 0) && formik.errors.code);

  return (
    <Flex gap="middle" align="flex-start" vertical className="fade-in">
      <AuthHeader
        title="Verify Your Email"
        subtitle="Please enter the 6-digit verification code sent to your registered email address."
      />

      <Form layout="vertical" onFinish={formik.handleSubmit} style={{ width: '100%' }}>
        <FormikOTPInput
          name="code"
          label="6-Digit Verification Code"
          formik={formik}
          length={6}
          required
        />

        <AppButton
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          icon={<MailOutlined />}
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          Verify Email
        </AppButton>

        <Flex justify="center" style={{ marginTop: 12, width: '100%' }}>
          <AppButton
            type="link"
            disabled={resendCooldown > 0}
            onClick={handleResend}
            icon={<ReloadOutlined />}
            style={{ color: resendCooldown > 0 ? '#94a3b8' : 'var(--primary-color, #673ab7)', fontWeight: 600 }}
          >
            {resendCooldown > 0
              ? `Resend code in ${formatTime(resendCooldown)}`
              : "Didn't receive code? Resend Email"}
          </AppButton>
        </Flex>
      </Form>
    </Flex>
  );
};

export default VerifyEmail;
