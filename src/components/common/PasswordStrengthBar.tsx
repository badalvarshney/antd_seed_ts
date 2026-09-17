import React from 'react';
import { Tag } from 'antd';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCustomization } from '../../features/customization/customizationSlice';
import { MIN_PASSWORD_LENGTH } from '../../config/themeConfig';

export interface PasswordStrengthBarProps {
  password?: string;
}

export const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ password = '' }) => {
  const { mode } = useSelector(selectCustomization);
  const isDarkMode = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const criteria = [
    { label: `At least ${MIN_PASSWORD_LENGTH} characters`, met: password.length >= MIN_PASSWORD_LENGTH },
    { label: 'Uppercase & Lowercase letters', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'At least one number (0-9)', met: /\d/.test(password) },
    { label: 'Special character (@$!%*?&)', met: /[@$!%*?&]/.test(password) },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  let label = 'Enter password';
  let color = '#94a3b8';
  let tagBg = isDarkMode ? 'rgba(148, 163, 184, 0.15)' : '#f1f5f9';
  let tagColor = isDarkMode ? '#cbd5e1' : '#475569';
  let tagBorder = isDarkMode ? '1px solid rgba(148, 163, 184, 0.25)' : '1px solid #cbd5e1';
  let percentage = 0;

  if (password.length > 0) {
    if (metCount === 0 || metCount === 1) {
      label = 'Very Weak';
      color = '#ff4d4f';
      tagBg = isDarkMode ? 'rgba(255, 77, 79, 0.18)' : '#fff2f0';
      tagColor = isDarkMode ? '#ff7875' : '#ff4d4f';
      tagBorder = isDarkMode ? '1px solid rgba(255, 77, 79, 0.35)' : '1px solid #ffccc7';
      percentage = 25;
    } else if (metCount === 2) {
      label = 'Weak';
      color = '#ff7a45';
      tagBg = isDarkMode ? 'rgba(255, 122, 69, 0.18)' : '#fff2e8';
      tagColor = isDarkMode ? '#ff9c6e' : '#ff7a45';
      tagBorder = isDarkMode ? '1px solid rgba(255, 122, 69, 0.35)' : '1px solid #ffd596';
      percentage = 50;
    } else if (metCount === 3) {
      label = 'Medium';
      color = '#faad14';
      tagBg = isDarkMode ? 'rgba(250, 173, 20, 0.18)' : '#fffbe6';
      tagColor = isDarkMode ? '#ffc53d' : '#d48806';
      tagBorder = isDarkMode ? '1px solid rgba(250, 173, 20, 0.35)' : '1px solid #ffe58f';
      percentage = 75;
    } else if (metCount === 4) {
      label = 'Strong';
      color = '#52c41a';
      tagBg = isDarkMode ? 'rgba(82, 196, 26, 0.18)' : '#f6ffed';
      tagColor = isDarkMode ? '#73d13d' : '#389e0d';
      tagBorder = isDarkMode ? '1px solid rgba(82, 196, 26, 0.35)' : '1px solid #b7eb8f';
      percentage = 100;
    }
  }

  return (
    <div className="password-strength-container fade-in" style={{ marginTop: 10, marginBottom: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
          fontSize: 12.5,
        }}
      >
        <span style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontWeight: 600 }}>
          Password Strength:
        </span>
        <Tag
          style={{
            margin: 0,
            fontWeight: 700,
            fontSize: 11,
            borderRadius: 4,
            padding: '2px 8px',
            backgroundColor: tagBg,
            color: tagColor,
            border: tagBorder,
          }}
        >
          {label}
        </Tag>
      </div>

      <div
        className="password-strength-bar"
        style={{
          height: 6,
          borderRadius: 3,
          backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
          overflow: 'hidden',
          marginBottom: 10,
        }}
      >
        <div
          className="password-strength-fill"
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: color,
            transition: 'width 0.3s ease, background-color 0.3s ease',
            borderRadius: 3,
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px 12px',
          fontSize: 11.5,
          color: isDarkMode ? '#94a3b8' : '#64748b',
        }}
      >
        {criteria.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: item.met ? (isDarkMode ? '#69b1ff' : '#1677ff') : isDarkMode ? '#64748b' : '#94a3b8',
              fontWeight: item.met ? 600 : 400,
              transition: 'color 0.2s ease',
            }}
          >
            {item.met ? (
              <CheckCircleFilled style={{ color: '#52c41a', fontSize: 13 }} />
            ) : (
              <CloseCircleOutlined style={{ color: isDarkMode ? '#334155' : '#cbd5e1', fontSize: 12 }} />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
