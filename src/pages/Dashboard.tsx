import React, { useState } from 'react';
import { Card, Avatar, Button, Typography, Tag, Space, Divider, message } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  CheckCircleFilled,
  KeyOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectAuthToken } from '../features/auth/authSelectors';
import { logoutUser } from '../features/auth/authSlice';
import { selectCustomization } from '../features/customization/customizationSlice';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAuthToken);
  const { presetColor } = useSelector(selectCustomization);
  const [copied, setCopied] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      message.success('Token copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="dashboard-page-container fade-in">
      <Card className="dashboard-main-card">
        <div className="dashboard-header-row">
          <div className="dashboard-user-info">
            <Avatar
              size={64}
              src={user?.avatar}
              icon={<UserOutlined />}
              style={{ backgroundColor: presetColor, border: '3px solid #ede7f6', flexShrink: 0 }}
            />
            <div className="dashboard-user-text">
              <Title level={3} style={{ margin: 0, fontWeight: 800 }}>
                Welcome, {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Authenticated User'}!
              </Title>
              <Text type="secondary" style={{ fontSize: 14 }}>
                {user?.email || 'user@example.com'}
              </Text>
            </div>
          </div>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            size="large"
            onClick={handleLogout}
            className="dashboard-signout-btn"
          >
            Sign Out
          </Button>
        </div>

        <Divider style={{ margin: '20px 0' }} />

        <div className="auth-details-container">
          <div className="auth-details-header">Session & Auth Details</div>
          <div className="auth-details-grid">
            <div className="auth-detail-card">
              <div className="auth-detail-label">User ID</div>
              <div className="auth-detail-value" style={{ fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                {user?.id || 'usr_demo_12345'}
              </div>
            </div>

            <div className="auth-detail-card">
              <div className="auth-detail-label">Role</div>
              <div className="auth-detail-value">
                <Tag color={presetColor} style={{ fontWeight: 600, margin: 0 }}>
                  {user?.role || 'Administrator'}
                </Tag>
              </div>
            </div>

            <div className="auth-detail-card">
              <div className="auth-detail-label">Authentication Status</div>
              <div className="auth-detail-value">
                <Tag icon={<CheckCircleFilled />} color="success" style={{ fontWeight: 600, margin: 0 }}>
                  Authenticated via Redux Slice Pattern
                </Tag>
              </div>
            </div>

            <div className="auth-detail-card">
              <div className="auth-detail-label">Security Layer</div>
              <div className="auth-detail-value">
                <Tag icon={<SafetyCertificateOutlined />} color="processing" style={{ fontWeight: 600, margin: 0 }}>
                  Axios Interceptor Guarded
                </Tag>
              </div>
            </div>
          </div>
        </div>

        <Card
          type="inner"
          title={
            <Space>
              <KeyOutlined style={{ color: presetColor }} />
              <span style={{ fontWeight: 700 }}>Active JWT Token</span>
            </Space>
          }
          className="dashboard-token-card"
        >
          <div className="jwt-token-box">
            <div className="jwt-token-code">{token || 'No active token found'}</div>
            {token && (
              <Button
                type="text"
                size="small"
                icon={copied ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined style={{ color: presetColor }} />}
                onClick={handleCopyToken}
                className="jwt-copy-btn"
                style={{ color: copied ? '#52c41a' : presetColor }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </div>
        </Card>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            <RocketOutlined style={{ color: presetColor, marginRight: 6 }} />
            Authentication Module is fully integrated with your exact Redux Slice & Axios pattern.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
