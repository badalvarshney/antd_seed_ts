import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Radio,
  Switch,
  Dropdown,
  message,
  Tag,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  SyncOutlined,
  SaveOutlined,
  ShareAltOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  CopyOutlined,
  CheckOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  DownOutlined,
  HeartOutlined,
  CodeOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCustomization } from '../features/customization/customizationSlice';
import { AppButton } from '../components/common/buttons';
import type { AppButtonStatus } from '../components/common/buttons';
import { AppPageHeader } from '../components/common/pageHeader';

const { Text, Paragraph } = Typography;

export const ButtonsPage: React.FC = () => {
  const { presetColor } = useSelector(selectCustomization);

  // Interactive playground states
  const [interactiveSize, setInteractiveSize] = useState<'small' | 'middle' | 'large'>('middle');
  const [interactiveStatus, setInteractiveStatus] = useState<AppButtonStatus>('primary');
  const [interactiveType, setInteractiveType] = useState<'primary' | 'default' | 'dashed' | 'link' | 'text'>('primary');
  const [interactiveVariant, setInteractiveVariant] = useState<'solid' | 'outlined' | 'dashed' | 'filled'>('solid');
  const [interactiveLoading, setInteractiveLoading] = useState<boolean>(false);
  const [interactiveDisabled, setInteractiveDisabled] = useState<boolean>(false);
  const [interactiveBlock, setInteractiveBlock] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Individual loading states
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const handleSimulateLoad = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    successMsg = 'Action completed successfully!'
  ) => {
    setter(true);
    setTimeout(() => {
      setter(false);
      message.success(successMsg);
    }, 2000);
  };

  // Dropdown menu for split button demo
  const splitMenuItems: MenuProps['items'] = [
    { key: '1', label: 'Save and Submit', icon: <SaveOutlined /> },
    { key: '2', label: 'Save as Draft', icon: <EditOutlined /> },
    { type: 'divider' },
    { key: '3', label: 'Discard Changes', icon: <DeleteOutlined />, danger: true },
  ];

  // Generated code string for playground
  const generatedCode = `<AppButton
  type="${interactiveType}"
  status="${interactiveStatus}"
  size="${interactiveSize}"
  variant="${interactiveVariant}"${interactiveLoading ? '\n  loading' : ''}${interactiveDisabled ? '\n  disabled' : ''}${interactiveBlock ? '\n  fullWidth' : ''}
  onClick={() => console.log('Clicked!')}
>
  Interactive Button
</AppButton>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    message.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', paddingBottom: 40 }}>
      {/* Unified Page Header */}
      <AppPageHeader
        icon={<ThunderboltOutlined />}
        title="Button Components Showcase"
        description="Comprehensive catalog of all Ant Design button types and the extended AppButton component supporting semantic status presets, built-in tooltips (even on disabled buttons), popconfirm confirmation, trailing icons, and dynamic loading states."
        tags={
          <>
            <Tag color={presetColor}>Ant Design 6</Tag>
            <Tag color="cyan">AppButton Master</Tag>
            <Tag color="purple">TypeScript Safe</Tag>
          </>
        }
        extra={
          <AppButton
            type="primary"
            icon={<CodeOutlined />}
            onClick={() => {
              const el = document.getElementById('playground-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Interactive Playground
          </AppButton>
        }
      />

      {/* Grid of Showcase Cards */}
      <Row gutter={[20, 20]}>
        {/* 1. Basic Ant Design Types */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <AppstoreOutlined style={{ color: presetColor }} />
                <span>1. Standard Button Types</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Standard Ant Design button hierarchies for primary, secondary, and tertiary user actions.
            </Paragraph>
            <Space wrap size={[12, 12]}>
              <AppButton type="primary">Primary</AppButton>
              <AppButton type="default">Default</AppButton>
              <AppButton type="dashed">Dashed</AppButton>
              <AppButton type="text">Text Button</AppButton>
              <AppButton type="link">Link Button</AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Danger Variations
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton type="primary" danger>Primary Danger</AppButton>
              <AppButton type="default" danger>Default Danger</AppButton>
              <AppButton type="dashed" danger>Dashed Danger</AppButton>
              <AppButton type="text" danger>Text Danger</AppButton>
              <AppButton type="link" danger>Link Danger</AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Ghost Button (Inverted on dark background)
            </Text>
            <div
              style={{
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                padding: '14px 16px',
                borderRadius: 8,
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <AppButton type="primary" ghost>Primary Ghost</AppButton>
              <AppButton type="default" ghost>Default Ghost</AppButton>
              <AppButton type="dashed" ghost>Dashed Ghost</AppButton>
              <AppButton danger ghost>Danger Ghost</AppButton>
            </div>
          </Card>
        </Col>

        {/* 2. Semantic Status Presets */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CheckOutlined style={{ color: '#52c41a' }} />
                <span>2. Semantic Status Presets (Solid & Outlined)</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Expressive semantic states powered by Ant Design tokens for clear contextual affordance.
            </Paragraph>

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Solid Status (Filled)
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton status="primary">Primary Brand</AppButton>
              <AppButton status="success" icon={<SaveOutlined />}>Success (Save)</AppButton>
              <AppButton status="warning" icon={<WarningOutlined />}>Warning</AppButton>
              <AppButton status="danger" icon={<DeleteOutlined />}>Danger</AppButton>
              <AppButton status="info" icon={<InfoCircleOutlined />}>Info</AppButton>
              <AppButton status="default">Neutral Default</AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Outlined / Bordered Status
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton status="success" variant="outlined" icon={<CheckOutlined />}>
                Success Outlined
              </AppButton>
              <AppButton status="warning" variant="outlined" icon={<WarningOutlined />}>
                Warning Outlined
              </AppButton>
              <AppButton status="info" variant="outlined" icon={<InfoCircleOutlined />}>
                Info Outlined
              </AppButton>
              <AppButton status="danger" variant="outlined" icon={<DeleteOutlined />}>
                Danger Outlined
              </AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Dashed Status
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton status="success" type="dashed">Success Dashed</AppButton>
              <AppButton status="warning" type="dashed">Warning Dashed</AppButton>
              <AppButton status="info" type="dashed">Info Dashed</AppButton>
            </Space>
          </Card>
        </Col>

        {/* 3. Button Sizes & Shapes */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SettingOutlined style={{ color: presetColor }} />
                <span>3. Button Sizes & Shapes</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Compact, normal, and prominent button sizes to fit tight tables, cards, or hero forms.
            </Paragraph>

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Sizes: Small, Middle (Default), Large
            </Text>
            <Space align="center" wrap size={[12, 12]}>
              <AppButton size="small" type="primary">Small (32px)</AppButton>
              <AppButton size="middle" type="primary">Middle (40px)</AppButton>
              <AppButton size="large" type="primary">Large (48px)</AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Shapes: Default, Round, Circle
            </Text>
            <Space align="center" wrap size={[12, 12]}>
              <AppButton shape="default" type="primary">Default Rectangle</AppButton>
              <AppButton shape="round" type="primary" icon={<DownloadOutlined />}>Round Pill Button</AppButton>
              <AppButton shape="circle" type="primary" icon={<PlusOutlined />} tooltip="Add New Item" />
              <AppButton shape="circle" status="success" icon={<CheckOutlined />} tooltip="Approved" />
              <AppButton shape="circle" status="danger" icon={<DeleteOutlined />} tooltip="Delete Item" />
              <AppButton shape="circle" icon={<SearchOutlined />} tooltip="Search" />
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Icon-Only Buttons (Useful for compact toolbars & table action rows)
            </Text>
            <Space wrap size={[10, 10]}>
              <AppButton icon={<EditOutlined />} tooltip="Edit Entry" />
              <AppButton status="info" icon={<ShareAltOutlined />} tooltip="Share Link" />
              <AppButton status="success" icon={<DownloadOutlined />} tooltip="Download File" />
              <AppButton status="warning" icon={<SettingOutlined />} tooltip="Settings" />
              <AppButton status="danger" icon={<DeleteOutlined />} tooltip="Remove Entry" />
            </Space>
          </Card>
        </Col>

        {/* 4. Icons & Alignment */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ArrowRightOutlined style={{ color: presetColor }} />
                <span>4. Leading & Trailing Icons (endIcon)</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Place icons at the start, at the end, or on both sides without manual JSX wrapping.
            </Paragraph>

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Leading Icons (icon prop)
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton type="primary" icon={<PlusOutlined />}>Create Project</AppButton>
              <AppButton status="success" icon={<SaveOutlined />}>Save Document</AppButton>
              <AppButton status="danger" icon={<DeleteOutlined />}>Purge Cache</AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Trailing Icons (endIcon prop)
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton type="primary" endIcon={<ArrowRightOutlined />}>
                Continue Next Step
              </AppButton>
              <AppButton type="default" endIcon={<ThunderboltOutlined style={{ color: '#faad14' }} />}>
                Quick Action
              </AppButton>
              <AppButton status="info" variant="outlined" endIcon={<ShareAltOutlined />}>
                Share Report
              </AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Dual Icons (Start & End)
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton
                type="primary"
                icon={<ArrowLeftOutlined />}
                endIcon={<CheckOutlined />}
              >
                Previous & Confirm
              </AppButton>
              <AppButton
                status="success"
                icon={<DownloadOutlined />}
                endIcon={<ArrowRightOutlined />}
              >
                Export & Continue
              </AppButton>
            </Space>
          </Card>
        </Col>

        {/* 5. Dynamic Loading States */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SyncOutlined spin style={{ color: presetColor }} />
                <span>5. Dynamic & Interactive Loading States</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Interactive loading states with spinner and optional custom <code>loadingText</code>. Click to test live:
            </Paragraph>

            <Space direction="vertical" style={{ width: '100%' }} size={16}>
              <div>
                <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
                  Standard Spinner Loading
                </Text>
                <AppButton
                  type="primary"
                  loading={loading1}
                  onClick={() => handleSimulateLoad(setLoading1, 'Payment processed!')}
                >
                  {loading1 ? 'Processing...' : 'Click to Pay ($49)'}
                </AppButton>
              </div>

              <div>
                <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
                  Dynamic loadingText Prop (Swaps text automatically)
                </Text>
                <AppButton
                  status="success"
                  icon={<SaveOutlined />}
                  loading={loading2}
                  loadingText="Uploading to Cloud..."
                  onClick={() => handleSimulateLoad(setLoading2, 'File saved to cloud storage!')}
                >
                  Save to Cloud
                </AppButton>
              </div>

              <div>
                <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
                  Danger Loading with Custom Text
                </Text>
                <AppButton
                  status="danger"
                  icon={<DeleteOutlined />}
                  loading={loading3}
                  loadingText="Revoking Session..."
                  onClick={() => handleSimulateLoad(setLoading3, 'Session successfully revoked!')}
                >
                  Revoke All Tokens
                </AppButton>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 6. Built-in Tooltips & Popconfirm */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ThunderboltOutlined style={{ color: '#faad14' }} />
                <span>6. Built-in Tooltips & Popconfirm</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Eliminates wrapper boilerplate: Tooltips and confirmation popovers are built directly into <code>AppButton</code>.
            </Paragraph>

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Built-in Tooltips (Works on Disabled Buttons Too!)
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton
                type="primary"
                tooltip="This action generates an encrypted report"
              >
                Hover for Tooltip
              </AppButton>

              <AppButton
                disabled
                tooltip="You lack the 'can_delete_users' permission to use this button"
              >
                Disabled with Tooltip
              </AppButton>

              <AppButton
                status="info"
                variant="outlined"
                tooltip={{ title: 'Tooltip with custom placement', placement: 'bottom' }}
              >
                Bottom Tooltip
              </AppButton>
            </Space>

            <Divider style={{ margin: '16px 0 12px' }} />

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Built-in Popconfirm Confirmation (Prevents accidental clicks)
            </Text>
            <Space wrap size={[12, 12]}>
              <AppButton
                status="danger"
                icon={<DeleteOutlined />}
                confirm="Are you sure you want to permanently delete this user?"
                onClick={() => message.success('User deleted successfully!')}
              >
                Delete User (Confirm)
              </AppButton>

              <AppButton
                status="warning"
                variant="outlined"
                confirm={{
                  title: 'Reset API Keys',
                  description: 'All ongoing integration requests will fail until keys are updated.',
                  okText: 'Yes, Regenerate',
                  cancelText: 'Cancel',
                  okButtonProps: { danger: true },
                }}
                onClick={() => message.warning('API Keys regenerated!')}
              >
                Reset API Keys
              </AppButton>
            </Space>
          </Card>
        </Col>

        {/* 7. Button Groups & Dropdowns */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <AppstoreOutlined style={{ color: presetColor }} />
                <span>7. Button Groups & Dropdown Menus</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Group related controls together or create split actions with dropdown menus.
            </Paragraph>

            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8, color: '#64748b' }}>
              Timeframe Filter (AppButton.Group)
            </Text>
            <Space direction="vertical" size={14} style={{ width: '100%' }}>
              <AppButton.Group>
                <AppButton type="default">Day</AppButton>
                <AppButton type="primary">Week</AppButton>
                <AppButton type="default">Month</AppButton>
                <AppButton type="default">Quarter</AppButton>
                <AppButton type="default">Year</AppButton>
              </AppButton.Group>

              <AppButton.Group>
                <AppButton icon={<ArrowLeftOutlined />}>Previous</AppButton>
                <AppButton icon={<ArrowRightOutlined />} endIcon>Next</AppButton>
              </AppButton.Group>

              <Divider style={{ margin: '8px 0 12px' }} />

              <Text strong style={{ fontSize: 13, display: 'block', color: '#64748b' }}>
                Split Action Button with Dropdown
              </Text>
              <AppButton.Group>
                <AppButton
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => message.success('Document saved!')}
                >
                  Save Document
                </AppButton>
                <Dropdown menu={{ items: splitMenuItems }} trigger={['click']}>
                  <AppButton type="primary" icon={<DownOutlined />} />
                </Dropdown>
              </AppButton.Group>
            </Space>
          </Card>
        </Col>

        {/* 8. Full Width / Block Buttons */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ThunderboltOutlined style={{ color: presetColor }} />
                <span>8. Full Width / Block Buttons (fullWidth)</span>
              </Space>
            }
            bordered
            style={{ height: '100%', borderRadius: 12 }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Span 100% width of their container. Ideal for modal action buttons, checkout flows, and login forms.
            </Paragraph>

            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <AppButton type="primary" fullWidth endIcon={<ArrowRightOutlined />}>
                Proceed to Secure Checkout ($99.00)
              </AppButton>

              <AppButton status="success" fullWidth icon={<SaveOutlined />}>
                Complete Profile Registration
              </AppButton>

              <AppButton type="dashed" fullWidth icon={<ThunderboltOutlined style={{ color: '#faad14' }} />}>
                Quick Fill Demo Data
              </AppButton>
            </Space>
          </Card>
        </Col>

        {/* 9. Interactive Live Playground & Code Generator */}
        <Col xs={24} id="playground-section" style={{ scrollMarginTop: 80 }}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <Space>
                  <CodeOutlined style={{ color: presetColor }} />
                  <span style={{ fontWeight: 700 }}>Interactive Button Playground & Code Generator</span>
                </Space>
                <Space size={8}>
                  <AppButton
                    size="small"
                    type="default"
                    icon={copiedCode ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                    onClick={handleCopyCode}
                    style={{ color: copiedCode ? '#52c41a' : undefined }}
                  >
                    {copiedCode ? 'Copied Code!' : 'Copy JSX'}
                  </AppButton>
                  <AppButton
                    size="small"
                    type="text"
                    icon={<ArrowUpOutlined />}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Back to Top
                  </AppButton>
                </Space>
              </div>
            }
            bordered
            style={{ borderRadius: 12, background: 'var(--ant-color-bg-container)' }}
          >
            <Row gutter={[24, 24]} align="middle">
              {/* Controls Column */}
              <Col xs={24} md={14}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Status Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Status:</Text>
                    <Radio.Group
                      value={interactiveStatus}
                      onChange={(e) => setInteractiveStatus(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="primary">primary</Radio.Button>
                      <Radio.Button value="success">success</Radio.Button>
                      <Radio.Button value="warning">warning</Radio.Button>
                      <Radio.Button value="danger">danger</Radio.Button>
                      <Radio.Button value="info">info</Radio.Button>
                      <Radio.Button value="default">default</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Type Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Type:</Text>
                    <Radio.Group
                      value={interactiveType}
                      onChange={(e) => setInteractiveType(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="primary">primary</Radio.Button>
                      <Radio.Button value="default">default</Radio.Button>
                      <Radio.Button value="dashed">dashed</Radio.Button>
                      <Radio.Button value="text">text</Radio.Button>
                      <Radio.Button value="link">link</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Variant Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Variant:</Text>
                    <Radio.Group
                      value={interactiveVariant}
                      onChange={(e) => setInteractiveVariant(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="solid">solid</Radio.Button>
                      <Radio.Button value="outlined">outlined</Radio.Button>
                      <Radio.Button value="dashed">dashed</Radio.Button>
                      <Radio.Button value="filled">filled</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Size Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Size:</Text>
                    <Radio.Group
                      value={interactiveSize}
                      onChange={(e) => setInteractiveSize(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="small">small</Radio.Button>
                      <Radio.Button value="middle">middle</Radio.Button>
                      <Radio.Button value="large">large</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Boolean Flags */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', paddingTop: 4 }}>
                    <Space size={8}>
                      <Switch
                        checked={interactiveLoading}
                        onChange={setInteractiveLoading}
                        size="small"
                      />
                      <Text style={{ fontSize: 13 }}>Loading</Text>
                    </Space>

                    <Space size={8}>
                      <Switch
                        checked={interactiveDisabled}
                        onChange={setInteractiveDisabled}
                        size="small"
                      />
                      <Text style={{ fontSize: 13 }}>Disabled</Text>
                    </Space>

                    <Space size={8}>
                      <Switch
                        checked={interactiveBlock}
                        onChange={setInteractiveBlock}
                        size="small"
                      />
                      <Text style={{ fontSize: 13 }}>fullWidth (Block)</Text>
                    </Space>
                  </div>
                </div>
              </Col>

              {/* Preview & Code Column */}
              <Col xs={24} md={10}>
                <div
                  style={{
                    padding: 20,
                    borderRadius: 10,
                    border: '1px solid #e2e8f0',
                    background: 'var(--ant-color-bg-layout, #f8fafc)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Live Preview
                  </Text>

                  <div style={{ width: interactiveBlock ? '100%' : 'auto' }}>
                    <AppButton
                      type={interactiveType}
                      status={interactiveStatus}
                      variant={interactiveVariant}
                      size={interactiveSize}
                      loading={interactiveLoading}
                      disabled={interactiveDisabled}
                      fullWidth={interactiveBlock}
                      icon={<HeartOutlined />}
                      endIcon={<ArrowRightOutlined />}
                      onClick={() => message.info('Interactive button clicked!')}
                    >
                      Interactive Button
                    </AppButton>
                  </div>

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

export default ButtonsPage;
