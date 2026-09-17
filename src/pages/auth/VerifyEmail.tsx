import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Result, Spin } from 'antd';
import { MailOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import FormikAntdField from '../../components/common/FormikAntdField';
import { verifyEmailSchema } from '../../utils/validationSchemas';
import { verifyEmail, resendVerificationCode, clearMessages } from '../../features/auth/authSlice';
import { selectVerifyEmailState, selectAuthSuccessMessage } from '../../features/auth/authSelectors';

export const DEFAULT_RESEND_TIME_SECONDS = 10;

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

interface CustomOtpInputProps {
  value?: string;
  onChange: (val: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const CustomOtpInput: React.FC<CustomOtpInputProps> = ({ value = '', onChange, onBlur }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array(6).fill('').map((_, i) => value[i] || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = e.target.value;
    const digit = rawVal.replace(/\D/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = digit;
    const combined = newDigits.join('');

    onChange(combined);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
        e.preventDefault();
      } else if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
        e.preventDefault();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="custom-otp-container">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => { inputRefs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          onBlur={onBlur}
          className="custom-otp-box"
          autoComplete="off"
        />
      ))}
    </div>
  );
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
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const codeStr = String(values.code || '').trim();
      if (codeStr.length !== 6 || !/^\d{6}$/.test(codeStr)) {
        setShowError(true);
        formik.setFieldError(
          'code',
          codeStr.length === 0
            ? 'Verification code is required'
            : 'Verification code must be exactly 6 digits'
        );
        return;
      }
      await dispatch(verifyEmail({ code: codeStr }) as any);
    },
  });

  const currentCode = String(formik.values.code || '').trim();
  const isCodeValid = currentCode.length === 6 && /^\d{6}$/.test(currentCode);

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(initialTimerSeconds);
    await dispatch(resendVerificationCode() as any);
  };

  const handleFormSubmit = () => {
    setShowError(true);
    if (!isCodeValid) {
      formik.setFieldError(
        'code',
        currentCode.length === 0
          ? 'Verification code is required'
          : 'Verification code must be exactly 6 digits'
      );
      return;
    }
    formik.handleSubmit();
  };

  if (urlToken && isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }} className="fade-in">
        <Spin size="large" />
        <p style={{ marginTop: 16, color: '#64748b', fontWeight: 500 }}>
          Verifying your email address, please wait...
        </p>
      </div>
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
              size="large"
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

  return (
    <div className="fade-in">
      <AuthHeader
        title="Verify Your Email"
        subtitle="Please enter the 6-digit verification code sent to your registered email address."
      />

      <Form layout="vertical" onFinish={handleFormSubmit}>
        <FormikAntdField
          name="code"
          label="6-Digit Verification Code"
          formik={formik}
          required
          className="otp-form-item"
        >
          {() => (
            <div>
              <CustomOtpInput
                value={formik.values.code}
                onChange={(val) => {
                  setShowError(false);
                  formik.setFieldValue('code', val, false);
                }}
              />
              {showError && formik.errors.code && (
                <div className="otp-error-wrapper">
                  <span className="otp-error-text">{formik.errors.code}</span>
                </div>
              )}
            </div>
          )}
        </FormikAntdField>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isLoading}
          icon={<MailOutlined />}
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          Verify Email
        </Button>

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Button
            type="link"
            disabled={resendCooldown > 0}
            onClick={handleResend}
            icon={<ReloadOutlined />}
            style={{ color: resendCooldown > 0 ? '#94a3b8' : 'var(--primary-color, #673ab7)', fontWeight: 600 }}
          >
            {resendCooldown > 0
              ? `Resend code in ${formatTime(resendCooldown)}`
              : "Didn't receive code? Resend Email"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default VerifyEmail;
