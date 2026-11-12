import React, { useState } from 'react';
import { Card, Avatar, Typography, Tag, Space, Divider, message, App } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  CheckCircleFilled,
  KeyOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  CopyOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
  SaveOutlined,
  DeleteOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, selectAuthToken } from '../features/auth/authSelectors';
import { logoutUser } from '../features/auth/authSlice';
import { selectCustomization } from '../features/customization/customizationSlice';
import { AppButton } from '../components/common/buttons';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { modal } = App.useApp();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectAuthToken);
  const { presetColor } = useSelector(selectCustomization);
  const [copied, setCopied] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleLogout = () => {
    modal.confirm({
      title: 'Sign Out',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: 'Are you sure you want to sign out of your account?',
      okText: 'Yes, Sign Out',
      cancelText: 'Cancel',
      okButtonProps: {
        danger: true,
        style: { borderRadius: 6 },
      },
      cancelButtonProps: {
        style: { borderRadius: 6 },
      },
      centered: true,
      autoFocusButton: 'cancel',
      maskClosable: true,
      onOk: () => {
        dispatch(logoutUser() as any);
      },
    });
  };

  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      message.success('Token copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTriggerLoadingDemo = () => {
    setDemoLoading(true);
    setTimeout(() => {
      setDemoLoading(false);
      message.success('Action simulated successfully!');
    }, 2000);
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
          <AppButton
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="dashboard-signout-btn"
          >
            Sign Out
          </AppButton>
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
            <Space size={6}>
              <KeyOutlined style={{ color: presetColor }} />
              <span style={{ fontWeight: 700 }}>Active JWT Token</span>
            </Space>
          }
          className="dashboard-token-card"
        >
          <div className="jwt-token-box">
            <div className="jwt-token-code">{token || 'No active token found'}</div>
            {token && (
              <AppButton
                type="text"
                size="small"
                icon={copied ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined style={{ color: presetColor }} />}
                onClick={handleCopyToken}
                className="jwt-copy-btn"
                style={{ color: copied ? '#52c41a' : presetColor }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </AppButton>
            )}
          </div>
        </Card>

        {/* Master Reusable AppButton Showcase */}
        <Card
          type="inner"
          title={
            <Space size={6}>
              <RocketOutlined style={{ color: presetColor }} />
              <span style={{ fontWeight: 700 }}>Reusable AppButton Component Showcase</span>
            </Space>
          }
          style={{ marginTop: 24, borderRadius: 12 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Status Variants */}
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#64748b', fontSize: 13 }}>
                1. Status & Theme Variants
              </Text>
              <Space wrap size={[10, 10]}>
                <AppButton status="primary">Primary Brand</AppButton>
                <AppButton status="success" icon={<SaveOutlined />}>Success Action</AppButton>
                <AppButton status="warning" icon={<WarningOutlined />}>Warning Alert</AppButton>
                <AppButton status="danger" icon={<DeleteOutlined />}>Danger Destructive</AppButton>
                <AppButton status="info" icon={<InfoCircleOutlined />}>Info Action</AppButton>
                <AppButton status="default">Default Neutral</AppButton>
              </Space>
            </div>

            {/* Icons & Loading States */}
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#64748b', fontSize: 13 }}>
                2. Trailing Icon (endIcon) & Dynamic Loading
              </Text>
              <Space wrap size={[10, 10]}>
                <AppButton
                  endIcon={<ArrowRightOutlined />}
                  onClick={() => message.info('Navigating to next step...')}
                >
                  Continue Next
                </AppButton>
                <AppButton
                  loading={demoLoading}
                  loadingText="Saving Data..."
                  icon={<SyncOutlined />}
                  onClick={handleTriggerLoadingDemo}
                >
                  Click To Load (2s)
                </AppButton>
              </Space>
            </div>

            {/* Built-in Tooltips & Popconfirm */}
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#64748b', fontSize: 13 }}>
                3. Built-in Tooltip (Works on Disabled) & Built-in Popconfirm
              </Text>
              <Space wrap size={[10, 10]}>
                <AppButton
                  tooltip="Quick action tooltip shortcut"
                  status="info"
                  variant="outlined"
                >
                  Hover Me (Tooltip)
                </AppButton>

                <AppButton
                  disabled
                  tooltip="Disabled buttons still show tooltips seamlessly!"
                >
                  Disabled with Tooltip
                </AppButton>

                <AppButton
                  status="danger"
                  confirm="Are you sure you want to perform this irreversible action?"
                  onClick={() => message.success('Action confirmed and executed!')}
                >
                  Click to Confirm (Popconfirm)
                </AppButton>
              </Space>
            </div>

            {/* Button Group */}
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#64748b', fontSize: 13 }}>
                4. AppButton.Group
              </Text>
              <AppButton.Group>
                <AppButton type="default">Weekly</AppButton>
                <AppButton type="primary">Monthly</AppButton>
                <AppButton type="default">Yearly</AppButton>
              </AppButton.Group>
            </div>
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
