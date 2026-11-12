import React, { useState } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Radio,
  Switch,
  Tag,
  Select,
  Tooltip,
  message,
  Avatar,
  Badge,
} from 'antd';
import {
  EditOutlined,
  CopyOutlined,
  CheckOutlined,
  CodeOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GlobalOutlined,
  DollarOutlined,
  SearchOutlined,
  CheckCircleFilled,
  KeyOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  SendOutlined,
  ThunderboltOutlined,
  LinkOutlined,
  AppstoreOutlined,
  SafetyOutlined,
  CreditCardOutlined,
  ReloadOutlined,
  ApiOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { selectCustomization } from '../features/customization/customizationSlice';
import { AppInput } from '../components/common/inputs';
import { PasswordStrengthBar, AppPageHeader } from '../components/common';

const { Text, Paragraph } = Typography;
const { Option } = Select;

export const InputsPage: React.FC = () => {
  const { presetColor } = useSelector(selectCustomization);

  // Playground State
  const [playVariant, setPlayVariant] = useState<'outlined' | 'filled' | 'borderless'>('outlined');
  const [playSize, setPlaySize] = useState<'large' | 'middle' | 'small'>('middle');
  const [playStatus, setPlayStatus] = useState<'' | 'error' | 'warning'>('');
  const [playAllowClear, setPlayAllowClear] = useState<boolean>(true);
  const [playDisabled, setPlayDisabled] = useState<boolean>(false);
  const [playLoading, setPlayLoading] = useState<boolean>(false);
  const [playRequired, setPlayRequired] = useState<boolean>(true);
  const [playWithPrefix, setPlayWithPrefix] = useState<boolean>(true);
  const [playWithTooltip, setPlayWithTooltip] = useState<boolean>(true);
  const [playLabel, setPlayLabel] = useState<string>('Corporate Work Email');
  const [playPlaceholder, setPlayPlaceholder] = useState<string>('name@company.com');
  const [playHelperText, setPlayHelperText] = useState<string>('We will never share your email with third parties.');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Interactive Demo States
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>('AntdSecurePass!2026');
  const [otpValue, setOtpValue] = useState<string>('842915');
  const [isCopiedKey, setIsCopiedKey] = useState<boolean>(false);

  // Formik Demo Form
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      bio: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(3, 'Minimum 3 characters').required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
      bio: Yup.string().max(120, 'Max 120 characters'),
    }),
    onSubmit: (values, { resetForm }) => {
      message.success(`Form submitted successfully for ${values.fullName}!`);
      resetForm();
    },
  });

  // Generated code string for playground
  const generatedCode = `<AppInput
  label="${playLabel}"${playRequired ? '\n  required' : ''}
  variant="${playVariant}"
  size="${playSize}"${playStatus ? `\n  status="${playStatus}"` : ''}${playAllowClear ? '\n  allowClear' : ''}${playDisabled ? '\n  disabled' : ''}${playLoading ? '\n  loading' : ''}${playWithPrefix ? '\n  prefix={<MailOutlined />}' : ''}${playWithTooltip ? '\n  tooltip="Must be an active work email domain"' : ''}
  placeholder="${playPlaceholder}"
  helperText="${playHelperText}"
/>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    message.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSearchSubmit = (value: string) => {
    if (!value) {
      message.warning('Please enter a search query');
      return;
    }
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
      message.success(`Found 42 results matching "${value}"`);
    }, 1000);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('mock_api_secret_key_8429103847');
    setIsCopiedKey(true);
    message.success('Production API Key copied to clipboard!');
    setTimeout(() => setIsCopiedKey(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', paddingBottom: 40 }}>
      {/* Unified Page Header */}
      <AppPageHeader
        icon={<EditOutlined />}
        title="Input & Form Field Showcase"
        description="Comprehensive catalog of Ant Design form controls and the master AppInput component supporting built-in labels, validation helpers, password entropy meter, OTP verification, and custom addons."
        tags={
          <>
            <Tag color={presetColor}>Ant Design 6</Tag>
            <Tag color="cyan">AppInput Master</Tag>
            <Tag color="purple">TypeScript Safe</Tag>
          </>
        }
        extra={
          <Button
            type="primary"
            icon={<CodeOutlined />}
            onClick={() => {
              const el = document.getElementById('playground-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Interactive Playground
          </Button>
        }
      />

      <Row gutter={[20, 20]}>
        {/* 1. Core Visual Variants */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <AppstoreOutlined style={{ color: presetColor }} />
                <span>1. Core Design Variants</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Three distinct border treatments tailored for high-contrast forms, modern card interfaces, and minimal inline grids.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AppInput
                label="Outlined Variant (Default Standard)"
                variant="outlined"
                placeholder="High-contrast border for enterprise forms"
                prefix={<GlobalOutlined style={{ color: presetColor }} />}
                defaultValue="https://production.cluster.cloud"
                allowClear
                helperText="Standard border-radius with primary color focus ring."
              />

              <AppInput
                label="Filled Variant (Modern Soft Tint)"
                variant="filled"
                placeholder="Soft tinted background with hover transition"
                prefix={<UserOutlined style={{ color: presetColor }} />}
                defaultValue="sarah_jenkins_dev"
                allowClear
                helperText="Subtle background fill for clean, modern dashboard layouts."
              />

              <AppInput
                label="Borderless Variant (Inline & Table Editing)"
                variant="borderless"
                placeholder="Click here to type inline without borders..."
                defaultValue="Sprint 24: Core Ant Design UI Refactoring"
                allowClear
                style={{ borderBottom: '1px dashed var(--ant-color-border, #cbd5e1)', borderRadius: 0, paddingLeft: 0 }}
                helperText="Minimalist presentation ideal for spreadsheet tables and inline title editing."
              />

              <AppInput
                label="Disabled Read-Only State"
                variant="outlined"
                disabled
                defaultValue="system-root-daemon@internal-cluster.local"
                helperText="Non-editable field with dimmed contrast and blocked interaction."
              />
            </div>
          </Card>
        </Col>

        {/* 2. Sizing & Density */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ThunderboltOutlined style={{ color: presetColor }} />
                <span>2. Field Sizing & Layout Density</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Three size presets adapt smoothly across hero marketing pages, standard business dashboards, and compact data tables.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong style={{ fontSize: 13 }}>Large Size (40px)</Text>
                  <Tag color="blue">Hero / Auth Screens</Tag>
                </div>
                <AppInput
                  size="large"
                  placeholder="Enter full legal name"
                  prefix={<UserOutlined style={{ color: presetColor }} />}
                  allowClear
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong style={{ fontSize: 13 }}>Middle Size (32px)</Text>
                  <Tag color="cyan">Standard Business Forms</Tag>
                </div>
                <AppInput
                  size="middle"
                  placeholder="Enter project repository name"
                  prefix={<GlobalOutlined style={{ color: presetColor }} />}
                  allowClear
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong style={{ fontSize: 13 }}>Small Size (24px)</Text>
                  <Tag color="purple">Dense Data Tables & Filters</Tag>
                </div>
                <AppInput
                  size="small"
                  placeholder="Filter table rows..."
                  prefix={<SearchOutlined style={{ color: presetColor }} />}
                  allowClear
                />
              </div>
            </div>
          </Card>
        </Col>

        {/* 3. Search & Command Inputs */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SearchOutlined style={{ color: presetColor }} />
                <span>3. Global Search & Command Inputs</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Instant search inputs supporting loading feedback, enter button actions, and quick-filter tags.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AppInput.Search
                placeholder="Search components, API routes, or users..."
                enterButton="Search"
                loading={searchLoading}
                onSearch={handleSearchSubmit}
                allowClear
                prefix={<SearchOutlined style={{ color: presetColor }} />}
              />
              <AppInput.Search
                size="large"
                placeholder="Large command palette query..."
                enterButton={<Button type="primary" size="large" icon={<SearchOutlined />}>Query</Button>}
                onSearch={handleSearchSubmit}
              />
              <div>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>Popular quick filters:</Text>
                <Space size={6} wrap>
                  <Tag color="blue" style={{ cursor: 'pointer' }} onClick={() => handleSearchSubmit('Authentication')}>#authentication</Tag>
                  <Tag color="purple" style={{ cursor: 'pointer' }} onClick={() => handleSearchSubmit('Checkout')}>#checkout</Tag>
                  <Tag color="cyan" style={{ cursor: 'pointer' }} onClick={() => handleSearchSubmit('Dark Mode')}>#dark-mode</Tag>
                  <Tag color="green" style={{ cursor: 'pointer' }} onClick={() => handleSearchSubmit('Webhooks')}>#webhooks</Tag>
                </Space>
              </div>
            </div>
          </Card>
        </Col>

        {/* 4. Prefix & Suffix Adornments */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <LinkOutlined style={{ color: presetColor }} />
                <span>4. Leading & Trailing Adornments (Prefix / Suffix)</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Leading icons clarify data context, while trailing suffix slots handle tooltips, clear buttons, and verification stamps.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AppInput
                label="Corporate User ID"
                prefix={<UserOutlined style={{ color: presetColor }} />}
                placeholder="alexander_smith"
                defaultValue="alex.smith.admin"
                allowClear
              />

              <AppInput
                label="Custom Production Domain"
                prefix={<GlobalOutlined style={{ color: '#10b981' }} />}
                suffix={
                  <Tooltip title="SSL TLS 1.3 Active & DNS Verified">
                    <CheckCircleFilled style={{ color: '#10b981', fontSize: 15 }} />
                  </Tooltip>
                }
                defaultValue="api.platform.enterprise.com"
                helperText="Verified green checkmark suffix confirms active HTTPS routing."
              />

              <AppInput
                label="Monthly Infrastructure Allocation"
                prefix={<DollarOutlined style={{ color: '#06b6d4' }} />}
                tooltip="Amount in USD, invoiced on the 1st of every month"
                placeholder="45,000.00"
                defaultValue="18,450.00"
                allowClear
              />

              <AppInput
                label="Namespace Availability Check"
                prefix={<SafetyCertificateOutlined style={{ color: presetColor }} />}
                loading
                defaultValue="global-cluster-mesh.internal"
                helperText="Animated loading spinner indicates asynchronous validation in progress..."
              />
            </div>
          </Card>
        </Col>

        {/* 5. Prepend & Append Addons */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SettingOutlined style={{ color: presetColor }} />
                <span>5. Prepend & Append Addons (Before / After)</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Attach protocols, currency pickers, country dropdowns, or action buttons directly to input fields.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AppInput
                label="Custom Subdomain URL"
                addonBefore="https://"
                addonAfter=".antd-seed.io"
                defaultValue="acme-corp"
                helperText="Prepend and append static text directly to input bounds."
              />

              <AppInput
                label="International Phone Number with Country Select"
                addonBefore={
                  <Select defaultValue="+1" style={{ width: 85 }}>
                    <Option value="+1">🇺🇸 +1</Option>
                    <Option value="+91">🇮🇳 +91</Option>
                    <Option value="+44">🇬🇧 +44</Option>
                    <Option value="+81">🇯🇵 +81</Option>
                  </Select>
                }
                placeholder="555-0192"
                defaultValue="842-1920"
              />

              <AppInput
                label="Multi-Currency Amount Addon"
                addonBefore={
                  <Select defaultValue="USD" style={{ width: 85 }}>
                    <Option value="USD">$ USD</Option>
                    <Option value="EUR">€ EUR</Option>
                    <Option value="GBP">£ GBP</Option>
                    <Option value="INR">₹ INR</Option>
                  </Select>
                }
                defaultValue="12,500.00"
                addonAfter={<Button size="small" type="link">Auto Convert</Button>}
              />

              <AppInput
                label="Sharable Invite Token with Action Button"
                defaultValue="https://app.domain.com/join?token=SEC_DEV_2026"
                readOnly
                addonAfter={
                  <Button
                    size="small"
                    type="primary"
                    icon={<CopyOutlined />}
                    onClick={() => message.success('Invite link copied to clipboard!')}
                  >
                    Copy
                  </Button>
                }
              />
            </div>
          </Card>
        </Col>

        {/* 6. Password & Credentials Security */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SafetyOutlined style={{ color: presetColor }} />
                <span>6. Password Credentials & Strength Bar</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Visibility toggle controls with real-time entropy calculation and password criteria indicators.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <AppInput.Password
                  label="Account Master Password"
                  required
                  placeholder="Enter secure password"
                  prefix={<LockOutlined style={{ color: presetColor }} />}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  allowClear
                />
                <div style={{ marginTop: 8 }}>
                  <PasswordStrengthBar password={passwordValue} />
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                  <Text type="secondary" style={{ fontSize: 12, color: passwordValue.length >= 8 ? '#10b981' : undefined }}>
                    {passwordValue.length >= 8 ? '✓' : '•'} 8+ characters
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12, color: /[A-Z]/.test(passwordValue) ? '#10b981' : undefined }}>
                    {/[A-Z]/.test(passwordValue) ? '✓' : '•'} 1 Uppercase
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12, color: /[0-9]/.test(passwordValue) ? '#10b981' : undefined }}>
                    {/[0-9]/.test(passwordValue) ? '✓' : '•'} 1 Number
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12, color: /[^A-Za-z0-9]/.test(passwordValue) ? '#10b981' : undefined }}>
                    {/[^A-Za-z0-9]/.test(passwordValue) ? '✓' : '•'} 1 Special symbol
                  </Text>
                </div>
              </div>

              <Divider style={{ margin: '8px 0' }} />

              <AppInput.Password
                label="Hardware Security Key Token (Locked Visibility)"
                defaultValue="Secr3tToken#2026!HardwareKey"
                prefix={<KeyOutlined style={{ color: '#f59e0b' }} />}
                visibilityToggle={{ visible: false }}
                disabled
                helperText="Password visibility toggle disabled according to enterprise compliance policy."
              />
            </div>
          </Card>
        </Col>

        {/* 7. 2FA OTP & Token Verification */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <KeyOutlined style={{ color: presetColor }} />
                <span>7. 2FA OTP Tokens & Security PIN</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              High-security multi-factor authentication with auto-jump focus, length restriction, and PIN masking.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 13 }}>6-Digit SMS / Authenticator Token</Text>
                  <Tag color="success">Auto-verified on 6 digits</Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '4px 0' }}>
                  <AppInput.OTP
                    value={otpValue}
                    onChange={(val) => {
                      setOtpValue(val);
                      if (val.length === 6) {
                        message.success(`OTP verified successfully: ${val}`);
                      }
                    }}
                    length={6}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Didn't receive code?</Text>
                  <Button size="small" type="link" onClick={() => message.info('New verification code sent!')}>
                    Resend Code (42s)
                  </Button>
                </div>
              </div>

              <Divider style={{ margin: '4px 0' }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 13 }}>4-Digit Wallet Security PIN (Masked)</Text>
                  <Tag color="purple">Masked PIN</Tag>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '4px 0' }}>
                  <AppInput.OTP
                    mask="•"
                    length={4}
                    onChange={(val) => {
                      if (val.length === 4) {
                        message.success('Wallet PIN accepted');
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 8. Contextual Form: User Profile Settings */}
        <Col xs={24} lg={12}>
          <Card
            
            hoverable
            title={
              <Space>
                <UserOutlined style={{ color: presetColor }} />
                <span>8. Contextual Form: User Profile Settings</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <Badge dot status="success" offset={[-4, 42]}>
                <Avatar
                  size={52}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  style={{ border: '2px solid #ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                />
              </Badge>
              <div>
                <Text strong style={{ fontSize: 15, display: 'block' }}>Sarah Chen</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>Principal Frontend Architect • San Francisco</Text>
              </div>
            </div>

            <Row gutter={[14, 14]}>
              <Col span={12}>
                <AppInput label="First Name" defaultValue="Sarah" required />
              </Col>
              <Col span={12}>
                <AppInput label="Last Name" defaultValue="Chen" required />
              </Col>
              <Col span={24}>
                <AppInput
                  label="Work Email"
                  defaultValue="sarah.chen@enterprise.io"
                  prefix={<MailOutlined style={{ color: presetColor }} />}
                  suffix={<CheckCircleFilled style={{ color: '#10b981' }} />}
                  helperText="Primary email used for Single Sign-On and audit logs."
                />
              </Col>
              <Col span={24}>
                <AppInput.TextArea
                  label="Bio / Professional Summary"
                  defaultValue="Leading frontend architecture, component design tokens, and scalable React design systems."
                  showCount
                  maxLength={160}
                  rows={3}
                />
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
              <Button type="default" size="middle">Cancel</Button>
              <Button type="primary" size="middle" onClick={() => message.success('Profile changes saved!')}>
                Save Changes
              </Button>
            </div>
          </Card>
        </Col>

        {/* 9. Contextual Form: Billing & Payment Checkout */}
        <Col xs={24} lg={12}>
          <Card
            
            hoverable
            title={
              <Space>
                <CreditCardOutlined style={{ color: presetColor }} />
                <span>9. Contextual Form: Billing & Checkout</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text strong style={{ fontSize: 14 }}>Payment Details</Text>
                <Space size={6}>
                  <Tag color="blue">Visa</Tag>
                  <Tag color="purple">Mastercard</Tag>
                  <Tag color="cyan">Amex</Tag>
                </Space>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AppInput
                label="Name on Card"
                placeholder="ALEXANDER V. SMITH"
                defaultValue="ALEXANDER V. SMITH"
                prefix={<UserOutlined style={{ color: presetColor }} />}
                required
              />

              <AppInput
                label="Card Number"
                defaultValue="4242 •••• •••• 8429"
                prefix={<CreditCardOutlined style={{ color: presetColor }} />}
                suffix={<CheckCircleFilled style={{ color: '#10b981' }} />}
                required
              />

              <Row gutter={12}>
                <Col span={12}>
                  <AppInput label="Expiration Date" placeholder="MM / YY" defaultValue="08 / 29" required />
                </Col>
                <Col span={12}>
                  <AppInput
                    label="Security CVC"
                    placeholder="123"
                    defaultValue="842"
                    prefix={<LockOutlined style={{ color: '#f59e0b' }} />}
                    tooltip="3 or 4 digit code on the back of your card"
                    required
                  />
                </Col>
              </Row>

              <Button
                block
                type="primary"
                size="large"
                icon={<SafetyCertificateOutlined />}
                onClick={() => message.success('Payment of $149.00 processed securely!')}
                style={{ marginTop: 4 }}
              >
                Pay $149.00 Securely
              </Button>
            </div>
          </Card>
        </Col>

        {/* 10. Developer API Key & Webhook Management */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <ApiOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>10. Developer Integration: API Keys & Webhook Endpoints</span>
              </Space>
            }
          >
            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
                <AppInput
                  label="Live Production Secret Key"
                  defaultValue="mock_api_secret_key_8429103847"
                  prefix={<KeyOutlined style={{ color: '#f59e0b' }} />}
                  readOnly
                  addonAfter={
                    <Button
                      size="small"
                      type="primary"
                      icon={isCopiedKey ? <CheckOutlined /> : <CopyOutlined />}
                      onClick={handleCopyApiKey}
                    >
                      {isCopiedKey ? 'Copied' : 'Copy'}
                    </Button>
                  }
                  helperText="Never share this key in client-side code or public repositories."
                />
              </Col>

              <Col xs={24} md={12}>
                <AppInput
                  label="Automated Webhook Delivery URL"
                  addonBefore="https://"
                  defaultValue="api.acme-corp.com/v1/webhooks/stripe-events"
                  addonAfter={
                    <Button
                      size="small"
                      type="default"
                      icon={<ReloadOutlined />}
                      onClick={() => message.info('Ping dispatched! Response status: 200 OK')}
                    >
                      Test Ping
                    </Button>
                  }
                  helperText="Receives real-time asynchronous HTTP POST event notifications."
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 11. Live Formik Validation Form */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SendOutlined style={{ color: presetColor }} />
                <span>11. Live Formik & Yup Validation Form</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 14 }}>
              Interactive registration form with live schema validation, error tooltips, and reset controls.
            </Paragraph>
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AppInput
                label="Full Name"
                required
                placeholder="Sarah Jenkins"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.touched.fullName && formik.errors.fullName ? 'error' : undefined}
                helperText={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : undefined}
              />

              <AppInput
                label="Corporate Email"
                required
                placeholder="s.jenkins@enterprise.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                status={formik.touched.email && formik.errors.email ? 'error' : undefined}
                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
              />

              <div>
                <AppInput.Password
                  label="Password"
                  required
                  placeholder="Enter 8+ characters password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={formik.touched.password && formik.errors.password ? 'error' : undefined}
                  helperText={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                />
                {formik.values.password && (
                  <div style={{ marginTop: 6 }}>
                    <PasswordStrengthBar password={formik.values.password} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <Button type="primary" htmlType="submit">
                  Submit Formik Form
                </Button>
                <Button type="default" onClick={() => formik.resetForm()}>
                  Reset
                </Button>
              </div>
            </form>
          </Card>
        </Col>

        {/* 12. Semantic Validation States & Helpers */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CheckCircleOutlined style={{ color: presetColor }} />
                <span>12. Semantic Validation States & Helper Messages</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 14 }}>
              Clear visual communication with status-aware colors and inline error messages.
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <AppInput
                label="Standard Verified State"
                defaultValue="sarah.jenkins@company.com"
                suffix={<CheckCircleFilled style={{ color: '#10b981' }} />}
                helperText="Email verified via SAML SSO."
              />

              <AppInput
                label="Error Validation State"
                status="error"
                defaultValue="invalid-email-format@"
                required
                helperText="Please enter a valid corporate email address (e.g. name@domain.com)."
              />

              <AppInput
                label="Warning Notice State"
                status="warning"
                defaultValue="temp_admin_credentials_2026"
                helperText="This temporary token contains special symbols and expires in 48 hours."
              />
            </div>
          </Card>
        </Col>

        {/* 13. Interactive Playground & Code Generator */}
        <Col xs={24} id="playground-section" style={{ scrollMarginTop: 80 }}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <Space>
                  <CodeOutlined style={{ color: presetColor }} />
                  <span style={{ fontWeight: 700 }}>13. Interactive AppInput Playground & Code Generator</span>
                </Space>
                <Space size={8}>
                  <Button
                    size="small"
                    type="default"
                    icon={copiedCode ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                    onClick={handleCopyCode}
                    style={{ color: copiedCode ? '#52c41a' : undefined }}
                  >
                    {copiedCode ? 'Copied Code!' : 'Copy JSX'}
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    icon={<ArrowUpOutlined />}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Back to Top
                  </Button>
                </Space>
              </div>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[24, 24]} align="middle">
              {/* Controls */}
              <Col xs={24} md={13}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Variant Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Variant:</Text>
                    <Radio.Group
                      value={playVariant}
                      onChange={(e) => setPlayVariant(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="outlined">outlined</Radio.Button>
                      <Radio.Button value="filled">filled</Radio.Button>
                      <Radio.Button value="borderless">borderless</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Size Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Size:</Text>
                    <Radio.Group
                      value={playSize}
                      onChange={(e) => setPlaySize(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="large">large</Radio.Button>
                      <Radio.Button value="middle">middle</Radio.Button>
                      <Radio.Button value="small">small</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Status Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Status:</Text>
                    <Radio.Group
                      value={playStatus}
                      onChange={(e) => setPlayStatus(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="">normal</Radio.Button>
                      <Radio.Button value="error">error</Radio.Button>
                      <Radio.Button value="warning">warning</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Boolean Switches */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', paddingTop: 6 }}>
                    <Space size={6}>
                      <Switch checked={playRequired} onChange={setPlayRequired} size="small" />
                      <Text style={{ fontSize: 13 }}>Required (*)</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playAllowClear} onChange={setPlayAllowClear} size="small" />
                      <Text style={{ fontSize: 13 }}>Allow Clear</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playWithPrefix} onChange={setPlayWithPrefix} size="small" />
                      <Text style={{ fontSize: 13 }}>Prefix Icon</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playWithTooltip} onChange={setPlayWithTooltip} size="small" />
                      <Text style={{ fontSize: 13 }}>Tooltip</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playLoading} onChange={setPlayLoading} size="small" />
                      <Text style={{ fontSize: 13 }}>Loading</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playDisabled} onChange={setPlayDisabled} size="small" />
                      <Text style={{ fontSize: 13 }}>Disabled</Text>
                    </Space>
                  </div>

                  {/* Text Customizers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <Text style={{ fontSize: 12, display: 'block', marginBottom: 2 }}>Label Text:</Text>
                      <AppInput
                        size="small"
                        value={playLabel}
                        onChange={(e) => setPlayLabel(e.target.value)}
                      />
                    </div>
                    <div>
                      <Text style={{ fontSize: 12, display: 'block', marginBottom: 2 }}>Placeholder:</Text>
                      <AppInput
                        size="small"
                        value={playPlaceholder}
                        onChange={(e) => setPlayPlaceholder(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Text style={{ fontSize: 12, display: 'block', marginBottom: 2 }}>Helper Text:</Text>
                    <AppInput
                      size="small"
                      value={playHelperText}
                      onChange={(e) => setPlayHelperText(e.target.value)}
                    />
                  </div>
                </div>
              </Col>

              {/* Preview */}
              <Col xs={24} md={11}>
                <div
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    border: '1px solid var(--ant-color-border-secondary, #e2e8f0)',
                    background: 'var(--ant-color-bg-layout, #f8fafc)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Live Preview
                  </Text>

                  <AppInput
                    label={playLabel}
                    required={playRequired}
                    variant={playVariant}
                    size={playSize}
                    status={playStatus || undefined}
                    allowClear={playAllowClear}
                    disabled={playDisabled}
                    loading={playLoading}
                    prefix={playWithPrefix ? <MailOutlined style={{ color: presetColor }} /> : undefined}
                    tooltip={playWithTooltip ? 'Must be an active work email domain' : undefined}
                    placeholder={playPlaceholder}
                    helperText={playHelperText}
                  />

                  <pre
                    style={{
                      width: '100%',
                      margin: 0,
                      padding: 12,
                      background: '#0f172a',
                      color: '#38bdf8',
                      borderRadius: 8,
                      fontSize: 12,
                      fontFamily: 'monospace',
                      overflowX: 'auto',
                    }}
                  >
                    {generatedCode}
                  </pre>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InputsPage;
