import React, { useState } from 'react';
import {
  Card,
  Tooltip,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  Radio,
  Switch,
  Tag,
  Avatar,
  Progress,
  message,
  Statistic,
  Badge,
  Rate,
} from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  CopyOutlined,
  CheckOutlined,
  ArrowUpOutlined,
  CodeOutlined,
  AppstoreOutlined,
  UserOutlined,
  ShareAltOutlined,
  HeartOutlined,
  HeartFilled,
  PictureOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  CrownOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  FallOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  SafetyOutlined,
  WifiOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
  DeploymentUnitOutlined,
  LockOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCustomization } from '../features/customization/customizationSlice';
import { AppCard } from '../components/common/cards';
import type { AppCardElevation } from '../components/common/cards';
import { AppButton } from '../components/common/buttons';
import { AppPageHeader } from '../components/common/pageHeader';
import { scrollToTop } from '../utils';

const { Title, Text, Paragraph } = Typography;

export const CardsPage: React.FC = () => {
  const { presetColor } = useSelector(selectCustomization);

  // Playground States
  const [playElevation, setPlayElevation] = useState<AppCardElevation>('medium');
  const [playSize, setPlaySize] = useState<'default' | 'small'>('default');
  const [playVariant, setPlayVariant] = useState<'outlined' | 'borderless'>('outlined');
  const [playAccentBar, setPlayAccentBar] = useState<'none' | 'top' | 'left' | 'bottom'>('none');
  const [playGradient, setPlayGradient] = useState<boolean>(false);
  const [playLoading, setPlayLoading] = useState<boolean>(false);
  const [playHoverable, setPlayHoverable] = useState<boolean>(false);
  const [playCollapsible, setPlayCollapsible] = useState<boolean>(true);
  const [playRibbon, setPlayRibbon] = useState<boolean>(true);
  const [playRefreshable, setPlayRefreshable] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Tab Card State
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');

  // Skeleton Card State
  const [skeletonLoading, setSkeletonLoading] = useState<boolean>(true);

  // Like Toggle
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Refresh simulation state
  const [isRefreshingDemo, setIsRefreshingDemo] = useState<boolean>(false);

  const handleSimulateRefresh = () => {
    setIsRefreshingDemo(true);
    setTimeout(() => {
      setIsRefreshingDemo(false);
      message.success('Card data refreshed successfully!');
    }, 1500);
  };

  const tabList = [
    { key: 'tab1', label: 'Overview' },
    { key: 'tab2', label: 'Analytics' },
    { key: 'tab3', label: 'Settings' },
  ];

  const tabContentMap: Record<string, React.ReactNode> = {
    tab1: (
      <div>
        <Text strong style={{ fontSize: 14 }}>Project Overview</Text>
        <Paragraph type="secondary" style={{ marginTop: 6, marginBottom: 12 }}>
          Ant Design Seed provides scalable components, dynamic multi-tenant theme customizers,
          Redux Toolkit state management, and modern UI primitives.
        </Paragraph>
        <Space size={8}>
          <Tag color="blue">Vite 8</Tag>
          <Tag color="purple">Ant Design 6</Tag>
          <Tag color="cyan">TypeScript 7</Tag>
        </Space>
      </div>
    ),
    tab2: (
      <div>
        <Text strong style={{ fontSize: 14 }}>Live Usage Metrics</Text>
        <Paragraph type="secondary" style={{ marginTop: 6, marginBottom: 12 }}>
          Weekly active sessions increased by +24.8% following the component design upgrade.
        </Paragraph>
        <Progress percent={78} strokeColor={presetColor} status="active" />
      </div>
    ),
    tab3: (
      <div>
        <Text strong style={{ fontSize: 14 }}>Component Preferences</Text>
        <Paragraph type="secondary" style={{ marginTop: 6, marginBottom: 12 }}>
          Customize card elevation tokens, border-radius scaling, and background tint seamlessly.
        </Paragraph>
        <AppButton size="small" type="primary" onClick={() => message.info('Settings applied!')}>
          Save Preferences
        </AppButton>
      </div>
    ),
  };

  // Generated code string for playground
  const generatedCode = `<AppCard
  title="Interactive Playground Card"
  elevation="${playElevation}"
  size="${playSize}"
  variant="${playVariant}"${playAccentBar !== 'none' ? `\n  accentBar="${playAccentBar}"` : ''}${playGradient ? '\n  gradient="primary"' : ''}${playLoading ? '\n  loading' : ''}${playHoverable ? '\n  hoverable' : ''}${playCollapsible ? '\n  collapsible' : ''}${playRibbon ? `\n  ribbon={{ text: 'Active Plan', color: '${presetColor}' }}` : ''}${playRefreshable ? '\n  refreshable\n  onRefresh={() => refreshData()}' : ''}
  extra={<AppButton size="small" type="primary">Action</AppButton>}
>
  <p>Card content goes here...</p>
</AppCard>`;

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
        icon={<AppstoreOutlined />}
        title="Card Components Showcase"
        description="Comprehensive catalog of Ant Design Card variants and the master AppCard component supporting elevation shadows, built-in ribbon badges, collapsible headers, refresh triggers, cover media, tabbed navigation, and interactive KPI metrics."
        tags={
          <>
            <Tag color={presetColor}>Ant Design 6</Tag>
            <Tag color="cyan">AppCard Master</Tag>
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
        {/* 1. Basic & Header Actions */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <AppstoreOutlined style={{ color: presetColor }} />
                <span>1. Basic Card with Header Actions</span>
              </Space>
            }
            extra={<a href="#more" onClick={(e) => { e.preventDefault(); message.info('More details clicked'); }}>More</a>}
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Standard card container for content grouping. Includes title header, right action slot, and clean body.
            </Paragraph>
            <div style={{ padding: '12px 16px', background: 'var(--ant-color-bg-layout, #f8fafc)', borderRadius: 8, marginBottom: 12 }}>
              <Text strong style={{ display: 'block', fontSize: 14 }}>Cloud Storage Quota</Text>
              <Text type="secondary" style={{ fontSize: 13 }}>142.8 GB of 250 GB utilized across 12 microservices</Text>
              <Progress percent={64} strokeColor={presetColor} style={{ marginTop: 8 }} />
            </div>
            <Space wrap size={8}>
              <AppButton size="small" type="primary">Upgrade Quota</AppButton>
              <AppButton size="small" type="default">Manage Buckets</AppButton>
            </Space>
          </AppCard>
        </Col>

        {/* 2. Compact & Inner Nested Cards */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <ThunderboltOutlined style={{ color: presetColor }} />
                <span>2. Compact Size & Inner Nested Cards</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Compact padding for dense tables or data dashboards, with nested <code>type="inner"</code> cards.
            </Paragraph>

            <AppCard
              type="inner"
              title="Database Node 01 (Primary Cluster)"
              extra={<Tag color="success">Healthy</Tag>}
              size="small"
              style={{ marginBottom: 12 }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                Latency: 14ms | Read IOPS: 4,200 | Write IOPS: 1,840
              </Text>
            </AppCard>

            <AppCard
              type="inner"
              title="Database Node 02 (Replica Standby)"
              extra={<Tag color="processing">Syncing</Tag>}
              size="small"
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                Latency: 18ms | Replication Lag: 0.04s | Auto-failover: Enabled
              </Text>
            </AppCard>
          </AppCard>
        </Col>

        {/* 3. Media Cover & Meta Card */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <PictureOutlined style={{ color: presetColor }} />
                <span>3. Media Cover & Card.Meta</span>
              </Space>
            }
            hoverable
            cover={
              <div
                style={{
                  height: 140,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '1px',
                }}
              >
                <span>Enterprise Design System</span>
              </div>
            }
            style={{ height: '100%' }}
          >
            <AppCard.Meta
              avatar={<Avatar size={48} style={{ backgroundColor: presetColor }}>AD</Avatar>}
              title="Cloud Architecture & Dashboard Seed"
              description="Modern React 19 boilerplate with Ant Design, Vite, Redux Toolkit, and comprehensive UI components."
            />
            <Divider style={{ margin: '14px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space size={6}>
                <Tag color="cyan">UI/UX</Tag>
                <Tag color="blue">Production</Tag>
              </Space>
              <Text type="secondary" style={{ fontSize: 12 }}>Updated 2 hours ago</Text>
            </div>
          </AppCard>
        </Col>

        {/* 4. Action Bar Toolbar */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <SettingOutlined style={{ color: presetColor }} />
                <span>4. Bottom Action Bar Toolbar</span>
              </Space>
            }
            style={{ height: '100%' }}
            actions={[
              <Tooltip key="like" title={isLiked ? 'Unlike' : 'Like'}>
                <span onClick={() => { setIsLiked(!isLiked); message.info(isLiked ? 'Unliked' : 'Liked project!'); }}>
                  {isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                </span>
              </Tooltip>,
              <Tooltip key="edit" title="Edit Content">
                <EditOutlined onClick={() => message.info('Edit triggered')} />
              </Tooltip>,
              <Tooltip key="share" title="Share Project">
                <ShareAltOutlined onClick={() => message.success('Link copied to clipboard!')} />
              </Tooltip>,
              <Tooltip key="settings" title="Configuration">
                <SettingOutlined onClick={() => message.info('Settings opened')} />
              </Tooltip>,
            ]}
          >
            <AppCard.Meta
              avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: '#10b981' }} />}
              title="DevOps Pipeline Monitor"
              description="Continuous Integration and Automated Deployment pipelines configured with zero downtime."
            />
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 13 }}>Pipeline Execution</Text>
                <Text strong style={{ fontSize: 13, color: '#52c41a' }}>Success (99.4%)</Text>
              </div>
              <Progress percent={99.4} strokeColor="#52c41a" size="small" />
            </div>
          </AppCard>
        </Col>

        {/* 5. Tabbed Card Navigation */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <BarChartOutlined style={{ color: presetColor }} />
                <span>5. Tabbed Card Navigation</span>
              </Space>
            }
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={(key) => setActiveTabKey(key)}
            tabBarExtraContent={
              <AppButton size="small" type="link" onClick={() => message.info('Exporting report...')}>
                Export PDF
              </AppButton>
            }
            style={{ height: '100%' }}
          >
            {tabContentMap[activeTabKey]}
          </AppCard>
        </Col>

        {/* 6. Card Grid Layout */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <AppstoreOutlined style={{ color: presetColor }} />
                <span>6. Card.Grid Multi-Module Dashboard</span>
              </Space>
            }
            style={{ height: '100%' }}
          >
            <AppCard.Grid
              style={{ width: '33.33%', textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}
              onClick={() => message.info('Analytics module clicked')}
            >
              <BarChartOutlined style={{ fontSize: 24, color: presetColor, display: 'block', marginBottom: 8 }} />
              <Text strong style={{ fontSize: 13 }}>Analytics</Text>
            </AppCard.Grid>

            <AppCard.Grid
              style={{ width: '33.33%', textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}
              onClick={() => message.info('Security module clicked')}
            >
              <SafetyCertificateOutlined style={{ fontSize: 24, color: '#10b981', display: 'block', marginBottom: 8 }} />
              <Text strong style={{ fontSize: 13 }}>Security</Text>
            </AppCard.Grid>

            <AppCard.Grid
              style={{ width: '33.33%', textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}
              onClick={() => message.info('Users module clicked')}
            >
              <TeamOutlined style={{ fontSize: 24, color: '#f59e0b', display: 'block', marginBottom: 8 }} />
              <Text strong style={{ fontSize: 13 }}>Users</Text>
            </AppCard.Grid>

            <AppCard.Grid
              style={{ width: '33.33%', textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}
              onClick={() => message.info('Revenue module clicked')}
            >
              <DollarOutlined style={{ fontSize: 24, color: '#06b6d4', display: 'block', marginBottom: 8 }} />
              <Text strong style={{ fontSize: 13 }}>Revenue</Text>
            </AppCard.Grid>

            <AppCard.Grid
              style={{ width: '33.33%', textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}
              onClick={() => message.info('Orders module clicked')}
            >
              <ShoppingOutlined style={{ fontSize: 24, color: '#ec4899', display: 'block', marginBottom: 8 }} />
              <Text strong style={{ fontSize: 13 }}>Orders</Text>
            </AppCard.Grid>

            <AppCard.Grid
              style={{ width: '33.33%', textAlign: 'center', padding: '16px 8px', cursor: 'pointer' }}
              onClick={() => message.info('Settings module clicked')}
            >
              <SettingOutlined style={{ fontSize: 24, color: '#8b5cf6', display: 'block', marginBottom: 8 }} />
              <Text strong style={{ fontSize: 13 }}>Settings</Text>
            </AppCard.Grid>
          </AppCard>
        </Col>

        {/* 7. Skeleton Loading Card */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <ThunderboltOutlined style={{ color: presetColor }} />
                <span>7. Skeleton Loading Placeholder</span>
              </Space>
            }
            extra={
              <Space size={8}>
                <Text style={{ fontSize: 12 }}>Loading State:</Text>
                <Switch
                  checked={skeletonLoading}
                  onChange={setSkeletonLoading}
                  size="small"
                />
              </Space>
            }
            loading={skeletonLoading}
            style={{ height: '100%' }}
          >
            <AppCard.Meta
              avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: presetColor }} />}
              title="Real-Time Data Loaded Successfully"
              description="When the loading prop turns false, your live application content renders seamlessly without layout shift."
            />
            <Divider style={{ margin: '14px 0' }} />
            <Text type="secondary" style={{ fontSize: 13 }}>
              Total Records: 48,920 entries processed in 120ms.
            </Text>
          </AppCard>
        </Col>

        {/* 8. AppCard Enhancements: Ribbon & Collapsible */}
        <Col xs={24} lg={12}>
          <AppCard
            title={
              <Space>
                <SafetyCertificateOutlined style={{ color: presetColor }} />
                <span>8. Built-in Ribbon & Collapsible</span>
              </Space>
            }
            ribbon={{ text: 'Pro Plan', color: presetColor }}
            collapsible
            refreshable
            isRefreshing={isRefreshingDemo}
            onRefresh={handleSimulateRefresh}
            style={{ height: '100%' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              Unique <code>AppCard</code> capabilities: Notice the ribbon badge in top right,
              the header refresh trigger, and the smooth collapse toggle arrow in the top right.
            </Paragraph>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Automated Cloud Backups</Text>
                <Tag color="success">Daily at 02:00 AM</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>SSL / TLS Encryption</Text>
                <Tag color="processing">Active (TLS 1.3)</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Dedicated Support</Text>
                <Tag color="purple">24/7 Priority SLA</Tag>
              </div>
            </div>
          </AppCard>
        </Col>

        {/* 9. Dashboard Metric / KPI Cards (Multiple Design Styles) */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <BarChartOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>9. Dashboard Metric & KPI Cards (Multiple Design Styles)</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            {/* Style A: Modern Floating Icon Bubble with Top Accent Bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Tag color="blue">Style A</Tag>
                <Text strong style={{ fontSize: 14 }}>Modern Floating Icon Bubble & Top Accent Bar</Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable accentBar="top" accentColor={presetColor} style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>Total Revenue</Text>
                        <Title level={3} style={{ margin: '6px 0 0 0', fontWeight: 800, color: presetColor }}>$128,450</Title>
                      </div>
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(22, 119, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <DollarOutlined style={{ fontSize: 20, color: presetColor }} />
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Tag color="success" icon={<ArrowUpOutlined />}>+18.4%</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>vs previous month</Text>
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable accentBar="top" accentColor="#10b981" style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>Active Members</Text>
                        <Title level={3} style={{ margin: '6px 0 0 0', fontWeight: 800, color: '#10b981' }}>14,280</Title>
                      </div>
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TeamOutlined style={{ fontSize: 20, color: '#10b981' }} />
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Tag color="success" icon={<ArrowUpOutlined />}>+9.2%</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>98.4% retention</Text>
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable accentBar="top" accentColor="#06b6d4" style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>Server Uptime</Text>
                        <Title level={3} style={{ margin: '6px 0 0 0', fontWeight: 800, color: '#06b6d4' }}>99.98%</Title>
                      </div>
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ThunderboltOutlined style={{ fontSize: 20, color: '#06b6d4' }} />
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Tag color="processing">Optimal</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>Zero incident downtime</Text>
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable accentBar="top" accentColor="#f59e0b" style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 13, fontWeight: 500 }}>Support Tickets</Text>
                        <Title level={3} style={{ margin: '6px 0 0 0', fontWeight: 800, color: '#f59e0b' }}>18 Open</Title>
                      </div>
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CustomerServiceOutlined style={{ fontSize: 20, color: '#f59e0b' }} />
                      </div>
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Tag color="warning">4 Urgent</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>Avg response: 14m</Text>
                    </div>
                  </AppCard>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: '20px 0' }} />

            {/* Style B: Vibrant Solid Gradient Hero KPI Cards */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Tag color="purple">Style B</Tag>
                <Text strong style={{ fontSize: 14 }}>Vibrant Solid Gradient Hero Cards</Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="high" hoverable gradient="primary">
                    <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>ARR Run Rate</Text>
                    <Title level={3} style={{ margin: '6px 0 8px 0', color: '#ffffff', fontWeight: 800 }}>$1.42M</Title>
                    <Progress percent={85} strokeColor="#ffffff" trailColor="rgba(255,255,255,0.25)" size="small" showInfo={false} />
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.9)', fontSize: 12 }}>
                      <span>Target: $1.6M</span>
                      <span style={{ fontWeight: 700 }}>+34% YoY</span>
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="high" hoverable gradient="purple">
                    <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Monthly Growth</Text>
                    <Title level={3} style={{ margin: '6px 0 8px 0', color: '#ffffff', fontWeight: 800 }}>+28.4%</Title>
                    <Progress percent={92} strokeColor="#ffffff" trailColor="rgba(255,255,255,0.25)" size="small" showInfo={false} />
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.9)', fontSize: 12 }}>
                      <span>New Users: 4,120</span>
                      <span style={{ fontWeight: 700 }}>Trending</span>
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="high" hoverable gradient="success">
                    <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Deployments</Text>
                    <Title level={3} style={{ margin: '6px 0 8px 0', color: '#ffffff', fontWeight: 800 }}>1,842</Title>
                    <Progress percent={100} strokeColor="#ffffff" trailColor="rgba(255,255,255,0.25)" size="small" showInfo={false} />
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.9)', fontSize: 12 }}>
                      <span>Success: 100%</span>
                      <span style={{ fontWeight: 700 }}>Zero Failure</span>
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="high" hoverable gradient="dark">
                    <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 13, fontWeight: 500 }}>Security Score</Text>
                    <Title level={3} style={{ margin: '6px 0 8px 0', color: '#ffffff', fontWeight: 800 }}>A+ (99.4)</Title>
                    <Progress percent={99.4} strokeColor="#10b981" trailColor="rgba(255,255,255,0.25)" size="small" showInfo={false} />
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', color: 'rgba(255, 255, 255, 0.9)', fontSize: 12 }}>
                      <span>SOC2 Compliant</span>
                      <span style={{ fontWeight: 700 }}>Active</span>
                    </div>
                  </AppCard>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: '20px 0' }} />

            {/* Style C: Target & Goal Progress Ring Cards */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Tag color="cyan">Style C</Tag>
                <Text strong style={{ fontSize: 14 }}>Goal & Circular Progress Ring Cards</Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Storage Quota</Text>
                        <Title level={4} style={{ margin: '4px 0 2px 0', fontWeight: 700 }}>78.4 GB</Title>
                        <Text type="secondary" style={{ fontSize: 11 }}>of 100 GB cap</Text>
                      </div>
                      <Progress type="circle" percent={78} size={50} strokeColor={presetColor} />
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Quarterly Target</Text>
                        <Title level={4} style={{ margin: '4px 0 2px 0', fontWeight: 700, color: '#10b981' }}>$420,000</Title>
                        <Text type="secondary" style={{ fontSize: 11 }}>Goal: $500,000</Text>
                      </div>
                      <Progress type="circle" percent={84} size={50} strokeColor="#10b981" />
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Sprint Velocity</Text>
                        <Title level={4} style={{ margin: '4px 0 2px 0', fontWeight: 700, color: '#8b5cf6' }}>42 / 48</Title>
                        <Text type="secondary" style={{ fontSize: 11 }}>Story points done</Text>
                      </div>
                      <Progress type="circle" percent={88} size={50} strokeColor="#8b5cf6" />
                    </div>
                  </AppCard>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <AppCard elevation="low" hoverable style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>CSAT Score</Text>
                        <Title level={4} style={{ margin: '4px 0 2px 0', fontWeight: 700, color: '#f59e0b' }}>4.9 / 5.0</Title>
                        <Text type="secondary" style={{ fontSize: 11 }}>3,410 ratings</Text>
                      </div>
                      <Progress type="circle" percent={98} size={50} strokeColor="#f59e0b" />
                    </div>
                  </AppCard>
                </Col>
              </Row>
            </div>

            <Divider style={{ margin: '20px 0' }} />

            {/* Style D: Split & Comparison Stat Cards */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Tag color="orange">Style D</Tag>
                <Text strong style={{ fontSize: 14 }}>Split / Side-by-Side Comparison Cards</Text>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <AppCard elevation="low" style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <Text strong style={{ fontSize: 14 }}>Cash Flow Summary</Text>
                      <Tag color="success">+ $32,900 Net Surplus</Tag>
                    </div>
                    <Row gutter={16}>
                      <Col span={12} style={{ borderRight: '1px solid rgba(148, 163, 184, 0.2)' }}>
                        <Statistic
                          title="Cash Inflow"
                          value={84200}
                          prefix="$"
                          valueStyle={{ color: '#10b981', fontWeight: 700 }}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}><RiseOutlined style={{ color: '#10b981' }} /> +12% from invoices</Text>
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Cash Outflow"
                          value={51300}
                          prefix="$"
                          valueStyle={{ color: '#ef4444', fontWeight: 700 }}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}><FallOutlined style={{ color: '#ef4444' }} /> -4% operational costs</Text>
                      </Col>
                    </Row>
                  </AppCard>
                </Col>

                <Col xs={24} lg={12}>
                  <AppCard elevation="low" style={{ background: 'var(--ant-color-bg-container)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <Text strong style={{ fontSize: 14 }}>Customer Acquisition Channels</Text>
                      <Tag color="processing">48,200 Total Leads</Tag>
                    </div>
                    <Row gutter={16}>
                      <Col span={12} style={{ borderRight: '1px solid rgba(148, 163, 184, 0.2)' }}>
                        <Statistic
                          title="Organic Search & Referral"
                          value={68.4}
                          suffix="%"
                          valueStyle={{ color: presetColor, fontWeight: 700 }}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>32,970 inbound signups</Text>
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Paid Campaigns"
                          value={31.6}
                          suffix="%"
                          valueStyle={{ color: '#8b5cf6', fontWeight: 700 }}
                        />
                        <Text type="secondary" style={{ fontSize: 12 }}>15,230 paid conversions</Text>
                      </Col>
                    </Row>
                  </AppCard>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* 10. SaaS Pricing & Subscription Plan Cards */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <CrownOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>10. SaaS Pricing & Subscription Plan Cards</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[24, 24]} align="stretch">
              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  hoverable
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Tag color="default" style={{ width: 'fit-content', marginBottom: 12 }}>Starter Plan</Tag>
                  <Title level={2} style={{ margin: 0, fontWeight: 800 }}>$0 <span style={{ fontSize: 14, fontWeight: 400, color: '#64748b' }}>/ month</span></Title>
                  <Paragraph type="secondary" style={{ margin: '8px 0 16px 0', fontSize: 13 }}>
                    Ideal for individual developers exploring the Ant Design platform.
                  </Paragraph>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Up to 3 team members</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>5 GB cloud storage</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Standard community support</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Core analytics dashboard</Text></div>
                  </div>
                  <AppButton fullWidth type="default" onClick={() => message.info('Starter plan activated!')}>
                    Get Started Free
                  </AppButton>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="high"
                  hoverable
                  ribbon={{ text: 'Most Popular', color: presetColor }}
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${presetColor}`,
                    position: 'relative',
                  }}
                >
                  <Tag color="processing" style={{ width: 'fit-content', marginBottom: 12 }}>Professional Plan</Tag>
                  <Title level={2} style={{ margin: 0, fontWeight: 800, color: presetColor }}>$29 <span style={{ fontSize: 14, fontWeight: 400, color: '#64748b' }}>/ month</span></Title>
                  <Paragraph type="secondary" style={{ margin: '8px 0 16px 0', fontSize: 13 }}>
                    Everything growing businesses need to scale with automated deployments.
                  </Paragraph>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text strong style={{ fontSize: 13 }}>Up to 25 team members</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text strong style={{ fontSize: 13 }}>100 GB cloud storage</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text strong style={{ fontSize: 13 }}>24/7 Priority SLA response</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text strong style={{ fontSize: 13 }}>Custom domain & white-label</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text strong style={{ fontSize: 13 }}>Audit logs & automated backup</Text></div>
                  </div>
                  <AppButton fullWidth type="primary" status="primary" onClick={() => message.success('Upgraded to Professional!')}>
                    Upgrade to Professional
                  </AppButton>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  hoverable
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Tag color="purple" style={{ width: 'fit-content', marginBottom: 12 }}>Enterprise Plan</Tag>
                  <Title level={2} style={{ margin: 0, fontWeight: 800 }}>$99 <span style={{ fontSize: 14, fontWeight: 400, color: '#64748b' }}>/ month</span></Title>
                  <Paragraph type="secondary" style={{ margin: '8px 0 16px 0', fontSize: 13 }}>
                    Dedicated infrastructure, compliance security, and tailored SLAs.
                  </Paragraph>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Unlimited team seats</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Unlimited cloud storage</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Dedicated technical account manager</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>SSO / SAML 2.0 & SCIM syncing</Text></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircleOutlined style={{ color: '#10b981' }} /> <Text style={{ fontSize: 13 }}>Custom data residency guarantees</Text></div>
                  </div>
                  <AppButton fullWidth type="default" onClick={() => message.info('Enterprise sales contacted!')}>
                    Contact Enterprise Sales
                  </AppButton>
                </AppCard>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 11. Team Member & User Profile Showcase Cards */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <TeamOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>11. Team Member & User Profile Showcase Cards</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[20, 20]}>
              <Col xs={24} md={8}>
                <AppCard
                  elevation="medium"
                  hoverable
                  style={{ overflow: 'hidden' }}
                  cover={
                    <div style={{ height: 100, background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', position: 'relative' }}>
                      <Tag color="success" style={{ position: 'absolute', top: 12, right: 12, margin: 0 }}>Available for Hire</Tag>
                    </div>
                  }
                >
                  <div style={{ position: 'relative', marginTop: -50, textAlign: 'center', marginBottom: 12 }}>
                    <Badge dot status="success" offset={[-6, 60]}>
                      <Avatar
                        size={72}
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                        style={{ border: '3px solid #ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      />
                    </Badge>
                    <Title level={4} style={{ margin: '8px 0 2px 0', fontWeight: 700 }}>Sarah Chen</Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>Staff Frontend Architect</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <Tag color="blue">React 19</Tag>
                    <Tag color="cyan">TypeScript</Tag>
                    <Tag color="purple">Design Systems</Tag>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <Row style={{ textAlign: 'center', marginBottom: 16 }}>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>148</Text><Text type="secondary" style={{ fontSize: 11 }}>Repos</Text></Col>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>3.4k</Text><Text type="secondary" style={{ fontSize: 11 }}>Stars</Text></Col>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>99.2%</Text><Text type="secondary" style={{ fontSize: 11 }}>Rating</Text></Col>
                  </Row>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <AppButton fullWidth type="primary" size="small" onClick={() => message.success('Message sent to Sarah!')}>Message</AppButton>
                    <AppButton fullWidth type="default" size="small" onClick={() => message.info('Profile opened!')}>Profile</AppButton>
                  </div>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="medium"
                  hoverable
                  style={{ overflow: 'hidden' }}
                  cover={
                    <div style={{ height: 100, background: 'linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)', position: 'relative' }}>
                      <Tag color="purple" style={{ position: 'absolute', top: 12, right: 12, margin: 0 }}>Design Lead</Tag>
                    </div>
                  }
                >
                  <div style={{ position: 'relative', marginTop: -50, textAlign: 'center', marginBottom: 12 }}>
                    <Badge dot status="processing" offset={[-6, 60]}>
                      <Avatar
                        size={72}
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                        style={{ border: '3px solid #ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      />
                    </Badge>
                    <Title level={4} style={{ margin: '8px 0 2px 0', fontWeight: 700 }}>David Miller</Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>VP of Product & UI/UX</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <Tag color="magenta">Product Strategy</Tag>
                    <Tag color="geekblue">Figma Tokens</Tag>
                    <Tag color="orange">UX Research</Tag>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <Row style={{ textAlign: 'center', marginBottom: 16 }}>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>32</Text><Text type="secondary" style={{ fontSize: 11 }}>Products</Text></Col>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>12</Text><Text type="secondary" style={{ fontSize: 11 }}>Teams</Text></Col>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>100%</Text><Text type="secondary" style={{ fontSize: 11 }}>Satisfaction</Text></Col>
                  </Row>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <AppButton fullWidth type="primary" size="small" onClick={() => message.success('Connected with David!')}>Connect</AppButton>
                    <AppButton fullWidth type="default" size="small" onClick={() => message.info('Schedule link sent!')}>Schedule</AppButton>
                  </div>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="medium"
                  hoverable
                  style={{ overflow: 'hidden' }}
                  cover={
                    <div style={{ height: 100, background: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', position: 'relative' }}>
                      <Tag color="success" style={{ position: 'absolute', top: 12, right: 12, margin: 0 }}>On Call</Tag>
                    </div>
                  }
                >
                  <div style={{ position: 'relative', marginTop: -50, textAlign: 'center', marginBottom: 12 }}>
                    <Badge dot status="success" offset={[-6, 60]}>
                      <Avatar
                        size={72}
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                        style={{ border: '3px solid #ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      />
                    </Badge>
                    <Title level={4} style={{ margin: '8px 0 2px 0', fontWeight: 700 }}>Elena Rostova</Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>DevOps & Security Lead</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <Tag color="green">Kubernetes</Tag>
                    <Tag color="volcano">AWS Cloud</Tag>
                    <Tag color="gold">Zero-Trust</Tag>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <Row style={{ textAlign: 'center', marginBottom: 16 }}>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>99.99%</Text><Text type="secondary" style={{ fontSize: 11 }}>Uptime</Text></Col>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>0</Text><Text type="secondary" style={{ fontSize: 11 }}>Breaches</Text></Col>
                    <Col span={8}><Text strong style={{ fontSize: 15, display: 'block' }}>1.2k</Text><Text type="secondary" style={{ fontSize: 11 }}>Audits</Text></Col>
                  </Row>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <AppButton fullWidth type="primary" size="small" onClick={() => message.success('Alert delivered to Elena!')}>Dispatch</AppButton>
                    <AppButton fullWidth type="default" size="small" onClick={() => message.info('Audit log opened!')}>Audit Log</AppButton>
                  </div>
                </AppCard>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 12. Kanban Project & Task Cards */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <DeploymentUnitOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>12. Agile Project & Task Kanban Cards</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[20, 20]}>
              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  hoverable
                  accentBar="left"
                  accentColor="#ef4444"
                  style={{ background: 'var(--ant-color-bg-container)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Tag color="error">CRITICAL BUG</Tag>
                    <Tag icon={<ClockCircleOutlined />} color="error">Due Today, 5 PM</Tag>
                  </div>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>
                    Memory Leak in WebGL 3D Canvas Context
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 14 }}>
                    Texture de-allocation fails on unmounting dynamic dashboard widgets.
                  </Paragraph>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <Text type="secondary">Subtasks checklist</Text>
                      <Text strong>3 of 4 done</Text>
                    </div>
                    <Progress percent={75} strokeColor="#ef4444" size="small" showInfo={false} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar.Group max={{ count: 2 }}>
                      <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80" />
                      <Avatar src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80" />
                    </Avatar.Group>
                    <Tag color="volcano">Sprint 24</Tag>
                  </div>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  hoverable
                  accentBar="left"
                  accentColor="#3b82f6"
                  style={{ background: 'var(--ant-color-bg-container)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Tag color="processing">FEATURE IN PROGRESS</Tag>
                    <Tag icon={<CalendarOutlined />}>Nov 18, 2026</Tag>
                  </div>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>
                    Multi-Currency Stripe & Razorpay Checkout
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 14 }}>
                    Auto currency geo-detection with automated VAT invoices and receipts.
                  </Paragraph>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <Text type="secondary">Subtasks checklist</Text>
                      <Text strong>5 of 8 done</Text>
                    </div>
                    <Progress percent={62.5} strokeColor={presetColor} size="small" showInfo={false} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar.Group max={{ count: 3 }}>
                      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" />
                      <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" />
                      <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" />
                    </Avatar.Group>
                    <Tag color="blue">Sprint 24</Tag>
                  </div>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  hoverable
                  accentBar="left"
                  accentColor="#10b981"
                  style={{ background: 'var(--ant-color-bg-container)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Tag color="success">READY FOR QA</Tag>
                    <Tag icon={<CheckCircleOutlined />} color="success">Verified</Tag>
                  </div>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>
                    Dark Mode WebKit Scrollbar Contrast
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 14 }}>
                    Automated WCAG 2.1 AAA color contrast validation on all button states.
                  </Paragraph>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <Text type="secondary">Subtasks checklist</Text>
                      <Text strong>6 of 6 completed</Text>
                    </div>
                    <Progress percent={100} strokeColor="#10b981" size="small" showInfo={false} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar.Group max={{ count: 2 }}>
                      <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" />
                    </Avatar.Group>
                    <Tag color="green">Sprint 24</Tag>
                  </div>
                </AppCard>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 13. E-Commerce Product Showcase & Fintech Cards */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <ShoppingOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>13. E-Commerce Product Showcase & Fintech Cards</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <AppCard
                  elevation="medium"
                  hoverable
                  ribbon={{ text: '25% OFF', color: '#ef4444' }}
                  cover={
                    <img
                      alt="Sony Headphones"
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                      style={{ height: 210, objectFit: 'cover' }}
                    />
                  }
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div>
                      <Tag color="blue">Audio Gear</Tag>
                      <Title level={4} style={{ margin: '6px 0 4px 0', fontWeight: 700 }}>
                        Sony WH-1000XM5 Wireless Noise Canceling Headphones
                      </Title>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Rate disabled defaultValue={5} style={{ fontSize: 14 }} />
                    <Text type="secondary" style={{ fontSize: 12 }}>(1,480 verified reviews)</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
                    <Title level={3} style={{ margin: 0, fontWeight: 800, color: '#ef4444' }}>$299.00</Title>
                    <Text delete type="secondary" style={{ fontSize: 16 }}>$399.00</Text>
                    <Tag color="green">In Stock (Next-Day Delivery)</Tag>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <AppButton
                      fullWidth
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => message.success('Added Sony WH-1000XM5 to Cart!')}
                    >
                      Add to Cart
                    </AppButton>
                    <AppButton
                      type="default"
                      icon={<HeartOutlined />}
                      onClick={() => message.info('Saved to Wishlist')}
                    />
                  </div>
                </AppCard>
              </Col>

              <Col xs={24} lg={12}>
                <AppCard
                  elevation="medium"
                  hoverable
                  style={{
                    background: 'var(--ant-color-bg-container)',
                    height: '100%',
                  }}
                >
                  {/* Digital Metallic Credit Card */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)',
                      borderRadius: 16,
                      padding: '24px 28px',
                      color: '#ffffff',
                      boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.25)',
                      marginBottom: 20,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <Space size={10}>
                        <CreditCardOutlined style={{ fontSize: 24, color: '#38bdf8' }} />
                        <Text strong style={{ color: '#ffffff', fontSize: 15, letterSpacing: '1px' }}>APEX PLATINUM</Text>
                      </Space>
                      <WifiOutlined style={{ fontSize: 22, color: 'rgba(255, 255, 255, 0.7)', transform: 'rotate(90deg)' }} />
                    </div>

                    {/* Chip */}
                    <div style={{ width: 44, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', marginBottom: 20, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)' }} />

                    {/* Number */}
                    <Text style={{ display: 'block', fontSize: 19, letterSpacing: '3px', fontFamily: 'monospace', color: '#ffffff', fontWeight: 600, marginBottom: 16 }}>
                      •••• &nbsp;•••• &nbsp;•••• &nbsp;8429
                    </Text>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <Text style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Cardholder</Text>
                        <Text strong style={{ color: '#ffffff', fontSize: 13, letterSpacing: '1px' }}>ALEXANDER V. SMITH</Text>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Text style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.7)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>Expires</Text>
                        <Text strong style={{ color: '#ffffff', fontSize: 13 }}>08 / 29</Text>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Actions */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>Available Card Balance</Text>
                        <Title level={3} style={{ margin: '2px 0 0 0', fontWeight: 800 }}>$48,920.50</Title>
                      </div>
                      <Tag color="success">Daily Limit: $10,000</Tag>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <AppButton
                        fullWidth
                        type="primary"
                        status="primary"
                        icon={<SendOutlined />}
                        onClick={() => message.info('Transfer funds modal opened')}
                      >
                        Transfer Funds
                      </AppButton>
                      <AppButton
                        fullWidth
                        type="default"
                        icon={<LockOutlined />}
                        style={{ color: 'var(--ant-color-text, #1e293b)' }}
                        onClick={() => message.info('Card locked safely')}
                      >
                        Lock Card
                      </AppButton>
                    </div>
                  </div>
                </AppCard>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 14. System Status & Announcement Cards */}
        <Col xs={24}>
          <Card
            title={
              <Space>
                <BellOutlined style={{ color: presetColor }} />
                <span style={{ fontWeight: 700 }}>14. System Status & Announcement Cards</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[20, 20]}>
              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  accentBar="left"
                  accentColor="#f59e0b"
                  style={{ background: 'var(--ant-color-bg-container)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Tag color="warning" icon={<ClockCircleOutlined />}>MAINTENANCE</Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>Sunday 02:00 UTC</Text>
                  </div>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>
                    PostgreSQL Database Kernel Upgrade
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 14 }}>
                    Automated failover clusters will route traffic with zero read downtime.
                  </Paragraph>
                  <AppButton size="small" type="link" style={{ padding: 0 }} onClick={() => message.info('Viewing maintenance schedule')}>
                    View Runbook & Checklist &rarr;
                  </AppButton>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  accentBar="left"
                  accentColor="#10b981"
                  style={{ background: 'var(--ant-color-bg-container)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Tag color="success" icon={<SafetyOutlined />}>SECURITY COMPLIANCE</Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>Audit Passed</Text>
                  </div>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>
                    SOC2 Type II & ISO 27001 Re-Certification
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 14 }}>
                    All compliance controls and data encryption criteria verified with 0 defects.
                  </Paragraph>
                  <AppButton size="small" type="link" style={{ padding: 0 }} onClick={() => message.info('Downloading certificate')}>
                    Download Compliance Certificate &rarr;
                  </AppButton>
                </AppCard>
              </Col>

              <Col xs={24} md={8}>
                <AppCard
                  elevation="low"
                  accentBar="left"
                  accentColor="#8b5cf6"
                  style={{ background: 'var(--ant-color-bg-container)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Tag color="purple" icon={<RocketOutlined />}>FEATURE RELEASE</Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>Version 2.4.0</Text>
                  </div>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 6 }}>
                    Antigravity Agentic AI Assistant Live
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 14 }}>
                    Multi-turn proactive recommendations and code auto-generation deployed globally.
                  </Paragraph>
                  <AppButton size="small" type="link" style={{ padding: 0 }} onClick={() => message.info('Opening release notes')}>
                    Read Release Notes & Changelog &rarr;
                  </AppButton>
                </AppCard>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 15. Interactive Live Playground & Code Generator */}
        <Col xs={24} id="playground-section" style={{ scrollMarginTop: 80 }}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <Space>
                  <CodeOutlined style={{ color: presetColor }} />
                  <span style={{ fontWeight: 700 }}>15. Interactive Card Playground & Code Generator</span>
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
                    onClick={() => scrollToTop()}
                  >
                    Back to Top
                  </AppButton>
                </Space>
              </div>
            }
            style={{ borderRadius: 12 }}
          >
            <Row gutter={[24, 24]} align="middle">
              {/* Controls Column */}
              <Col xs={24} md={13}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Elevation Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Elevation:</Text>
                    <Radio.Group
                      value={playElevation}
                      onChange={(e) => setPlayElevation(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="none">none</Radio.Button>
                      <Radio.Button value="low">low</Radio.Button>
                      <Radio.Button value="medium">medium</Radio.Button>
                      <Radio.Button value="high">high</Radio.Button>
                      <Radio.Button value="hover">hover</Radio.Button>
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
                      <Radio.Button value="default">default</Radio.Button>
                      <Radio.Button value="small">small</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Variant Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Variant:</Text>
                    <Radio.Group
                      value={playVariant}
                      onChange={(e) => setPlayVariant(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="outlined">outlined</Radio.Button>
                      <Radio.Button value="borderless">borderless</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Accent Bar Selection */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text strong style={{ minWidth: 90 }}>Accent Bar:</Text>
                    <Radio.Group
                      value={playAccentBar}
                      onChange={(e) => setPlayAccentBar(e.target.value)}
                      size="small"
                    >
                      <Radio.Button value="none">none</Radio.Button>
                      <Radio.Button value="top">top</Radio.Button>
                      <Radio.Button value="left">left</Radio.Button>
                      <Radio.Button value="bottom">bottom</Radio.Button>
                    </Radio.Group>
                  </div>

                  {/* Boolean Switches */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', paddingTop: 6 }}>
                    <Space size={6}>
                      <Switch checked={playGradient} onChange={setPlayGradient} size="small" />
                      <Text style={{ fontSize: 13 }}>Gradient</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playCollapsible} onChange={setPlayCollapsible} size="small" />
                      <Text style={{ fontSize: 13 }}>Collapsible</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playRibbon} onChange={setPlayRibbon} size="small" />
                      <Text style={{ fontSize: 13 }}>Ribbon Badge</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playRefreshable} onChange={setPlayRefreshable} size="small" />
                      <Text style={{ fontSize: 13 }}>Refreshable</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playHoverable} onChange={setPlayHoverable} size="small" />
                      <Text style={{ fontSize: 13 }}>Hoverable</Text>
                    </Space>

                    <Space size={6}>
                      <Switch checked={playLoading} onChange={setPlayLoading} size="small" />
                      <Text style={{ fontSize: 13 }}>Loading</Text>
                    </Space>
                  </div>
                </div>
              </Col>

              {/* Preview Column */}
              <Col xs={24} md={11}>
                <div
                  style={{
                    padding: 16,
                    borderRadius: 10,
                    border: '1px solid #e2e8f0',
                    background: 'var(--ant-color-bg-layout, #f8fafc)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Live Preview
                  </Text>

                  <AppCard
                    title="Interactive Playground Card"
                    elevation={playElevation}
                    size={playSize}
                    variant={playVariant}
                    loading={playLoading}
                    hoverable={playHoverable}
                    accentBar={playAccentBar}
                    gradient={playGradient ? 'primary' : undefined}
                    collapsible={playCollapsible}
                    refreshable={playRefreshable}
                    onRefresh={() => message.success('Refreshed!')}
                    ribbon={playRibbon ? { text: 'Active Plan', color: presetColor } : undefined}
                    extra={<AppButton size="small" type="primary">Action</AppButton>}
                  >
                    <Paragraph style={{ margin: 0, fontSize: 13 }}>
                      This card dynamically updates with your selected elevation shadows, size padding,
                      accent borders, gradient themes, collapsible header controls, and ribbon badge.
                    </Paragraph>
                  </AppCard>

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

export default CardsPage;
