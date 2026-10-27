import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Breadcrumb,
  Space,
  Tag,
  Drawer,
  Tooltip,
  App,
  theme,
  type MenuProps,
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  SlidersOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCustomization,
  setAppLayout,
  toggleDrawer,
} from '../features/customization/customizationSlice';
import { selectCurrentUser } from '../features/auth/authSelectors';
import { logoutUser } from '../features/auth/authSlice';
import { APP_LAYOUT_OPTIONS, type AppLayoutType } from '../config/themeConfig';
import { hexToRgba } from '../utils/colorUtils';
import GlobalSearchModal from '../components/common/GlobalSearchModal';
import '../styles/AppLayout.css';

const { Header, Content, Footer, Sider } = Layout;

const SIDER_WIDTH = 240;
const SIDER_COLLAPSED_WIDTH = 72;

export const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { modal } = App.useApp();

  const customization = useSelector(selectCustomization);
  const user = useSelector(selectCurrentUser);

  const { presetColor, appLayout = 'side-nav', mode } = customization;
  const isDarkMode = mode === 'dark';

  // Responsive state detection
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 992);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 992);
  const [selectedKey, setSelectedKey] = useState<string>('dashboard');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K to toggle Search Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width < 992;
      setIsMobile(mobile);
      setIsTablet(tablet);

      // Auto close mobile drawer if screen widened
      if (!mobile && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
      // Auto collapse sider on tablet screens
      if (width < 992 && !mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileDrawerOpen]);

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

  const handleMenuSelect = (key: string) => {
    setSelectedKey(key);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  // Main Navigation Menu Items
  const mainMenuItems: Required<MenuProps>['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => handleMenuSelect('dashboard'),
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
      onClick: () => handleMenuSelect('analytics'),
    },
    {
      key: 'security',
      icon: <SafetyCertificateOutlined />,
      label: 'Security & Auth',
      onClick: () => handleMenuSelect('security'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'User Management',
      children: [
        { key: 'users-list', label: 'All Users', onClick: () => handleMenuSelect('users-list') },
        { key: 'roles', label: 'Roles & Permissions', onClick: () => handleMenuSelect('roles') },
      ],
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'System Settings',
      onClick: () => handleMenuSelect('settings'),
    },
  ];

  // Secondary Subnavigation Items for Top-side Layout
  const subnavMenuItems: Required<MenuProps>['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Overview',
      onClick: () => handleMenuSelect('dashboard'),
    },
    {
      key: 'sub-analytics',
      icon: <BarChartOutlined />,
      label: 'Live Metrics',
      onClick: () => handleMenuSelect('sub-analytics'),
    },
    {
      key: 'sub-security',
      icon: <SafetyCertificateOutlined />,
      label: 'Active Sessions',
      onClick: () => handleMenuSelect('sub-security'),
    },
    {
      key: 'sub-logs',
      icon: <AppstoreOutlined />,
      label: 'Audit Logs',
      onClick: () => handleMenuSelect('sub-logs'),
    },
    {
      key: 'sub-config',
      icon: <SettingOutlined />,
      label: 'Preferences',
      onClick: () => handleMenuSelect('sub-config'),
    },
  ];

  // User Profile Dropdown Menu Props
  const userMenuProps: MenuProps = {
    items: [
      {
        key: 'header-user-info',
        label: (
          <div style={{ padding: '6px 8px 4px' }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: token.colorTextHeading,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Authenticated User'}
            </div>
            <div
              style={{
                fontSize: 12,
                color: token.colorTextSecondary,
                marginTop: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.email || 'user@example.com'}
            </div>
          </div>
        ),
        disabled: true,
      },
      { type: 'divider' },
      {
        key: 'layout-switcher',
        icon: <AppstoreOutlined style={{ fontSize: 15 }} />,
        label: 'Switch AntD Layout',
        children: APP_LAYOUT_OPTIONS.map((opt) => ({
          key: opt.id,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 175, gap: 12 }}>
              <span style={{ fontSize: 13 }}>{opt.name}</span>
              {appLayout === opt.id && <CheckOutlined style={{ color: presetColor, fontSize: 13 }} />}
            </div>
          ),
          onClick: () => dispatch(setAppLayout(opt.id)),
        })),
      },
      {
        key: 'theme-customizer',
        icon: <SlidersOutlined style={{ fontSize: 15 }} />,
        label: 'Theme Customizer',
        onClick: () => dispatch(toggleDrawer()),
      },
      { type: 'divider' },
      {
        key: 'logout',
        icon: <LogoutOutlined style={{ fontSize: 15 }} />,
        danger: true,
        label: 'Sign Out',
        onClick: handleLogout,
      },
    ],
  };

  // Reusable Brand Logo
  const renderBrandLogo = (isCollapsed = false, showText = true, inHeader = false) => (
    <div
      className="app-brand-logo-box"
      style={{
        height: inHeader ? (isMobile ? 52 : 56) : 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        padding: isCollapsed ? 0 : inHeader ? '0 6px 0 0' : '0 14px',
        gap: 7,
        width: isCollapsed ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      onClick={() => navigate('/')}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: presetColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: 16,
          boxShadow: `0 3px 8px ${hexToRgba(presetColor, 0.35)}`,
          flexShrink: 0,
        }}
      >
        C
      </div>
      {showText && !isCollapsed && (
        <span
          className="app-brand-title"
          style={{
            color: token.colorTextHeading,
          }}
        >
          Cloud Auth
        </span>
      )}
    </div>
  );

  // Reusable Right Header Actions
  const renderHeaderRightActions = () => (
    <div className="app-header-right">
      {/* Header Compact Search Trigger Button */}
      <Tooltip title="Quick Search (⌘K)" mouseEnterDelay={0.4}>
        <Button
          type="text"
          onClick={() => setSearchModalOpen(true)}
          className="app-header-search-btn"
          aria-label="Search"
        >
          <Space size={7} align="center">
            <SearchOutlined style={{ fontSize: 14, color: presetColor }} />
            {!isMobile && (
              <>
                <span className="app-header-search-label">Search</span>
                <span className="app-header-search-pill-kbd">⌘K</span>
              </>
            )}
          </Space>
        </Button>
      </Tooltip>

      <Dropdown
        menu={userMenuProps}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        rootClassName="app-user-dropdown"
        overlayClassName="app-user-dropdown"
      >
        <Space size={6} style={{ cursor: 'pointer', padding: '2px 4px', borderRadius: 8 }}>
          <Avatar
            size={isMobile ? 32 : 34}
            src={user?.avatar}
            icon={<UserOutlined />}
            style={{
              backgroundColor: presetColor,
              border: `2px solid ${hexToRgba(presetColor, 0.3)}`,
              flexShrink: 0,
            }}
          />
        </Space>
      </Dropdown>
    </div>
  );

  // Reusable Global Search Modal Node
  const renderSearchModal = () => (
    <GlobalSearchModal
      open={searchModalOpen}
      onClose={() => setSearchModalOpen(false)}
      onSelectKey={(key) => handleMenuSelect(key)}
      onLogout={handleLogout}
    />
  );

  // Reusable Breadcrumb Node
  const renderBreadcrumb = (style?: React.CSSProperties) => (
    <Breadcrumb
      className="app-breadcrumb-header"
      style={{ margin: '14px 0', ...style }}
      items={[
        { title: <Link to="/">Home</Link> },
        { title: 'Application' },
        { title: selectedKey.charAt(0).toUpperCase() + selectedKey.slice(1) },
      ]}
    />
  );

  // Reusable Footer Node
  const renderFooter = () => (
    <Footer
      className="app-layout-footer"
      style={{
        textAlign: 'center',
        color: token.colorTextSecondary,
        fontSize: isMobile ? 11.5 : 12.5,
        padding: isMobile ? '14px 10px' : '16px 0',
      }}
    >
      Ant Design Layout System ©{new Date().getFullYear()} • Built with AntD & React TypeScript
    </Footer>
  );

  // Mobile Navigation Drawer (Provides smooth off-canvas menu for all layouts on mobile)
  const renderMobileDrawer = () => (
    <Drawer
      placement="left"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      width={Math.min(290, typeof window !== 'undefined' ? window.innerWidth * 0.82 : 290)}
      closable={false}
      className="app-mobile-drawer"
      styles={{
        body: {
          padding: 0,
          background: token.colorBgContainer,
        },
      }}
    >
      <div className="app-mobile-drawer-header">
        {renderBrandLogo(false, true, true)}
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setMobileDrawerOpen(false)}
          style={{ fontSize: 15 }}
        />
      </div>

      <div style={{ padding: '6px 14px 2px' }}>
        <Tag color={presetColor} style={{ width: '100%', textAlign: 'center', padding: '2px 0', borderRadius: 6, fontWeight: 600 }}>
          {APP_LAYOUT_OPTIONS.find((o) => o.id === appLayout)?.name}
        </Tag>
      </div>

      <div className="app-mobile-drawer-menu">
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="inline"
          inlineIndent={12}
          selectedKeys={[selectedKey]}
          items={mainMenuItems}
          style={{ borderRight: 0 }}
        />

        {appLayout === 'top-side' && (
          <>
            <div className="app-sider-section-title">
              SUB-NAVIGATION
            </div>
            <Menu
              theme={isDarkMode ? 'dark' : 'light'}
              mode="inline"
              inlineIndent={12}
              selectedKeys={[selectedKey]}
              items={subnavMenuItems}
              style={{ borderRight: 0 }}
            />
          </>
        )}
      </div>

      <div className="app-mobile-drawer-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Avatar
            size={32}
            src={user?.avatar}
            icon={<UserOutlined />}
            style={{ backgroundColor: presetColor }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 12.5, color: token.colorTextHeading, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Authenticated User'}
            </div>
            <div style={{ fontSize: 11, color: token.colorTextSecondary, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>
        <Button
          danger
          block
          size="small"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ borderRadius: 6 }}
        >
          Sign Out
        </Button>
      </div>
    </Drawer>
  );

  /**
   * ==============================================================================
   * 1. ANTD LAYOUT 1: Side Navigation (Header Sider 1)
   * Desktop: Full-height Left Sider + Header & Content on right
   * Mobile: Header with Hamburger + Off-canvas Mobile Drawer + 100% Content
   * ==============================================================================
   */
  if (appLayout === 'side-nav') {
    return (
      <Layout className="app-layout-wrapper">
        {renderMobileDrawer()}
        {renderSearchModal()}

        {!isMobile && (
          <Sider
            className="app-layout-sider"
            collapsible
            collapsed={collapsed}
            onCollapse={(val) => setCollapsed(val)}
            breakpoint="lg"
            collapsedWidth={SIDER_COLLAPSED_WIDTH}
            width={SIDER_WIDTH}
            theme={isDarkMode ? 'dark' : 'light'}
            style={{
              borderRight: isDarkMode ? '1px solid rgba(255, 255, 255, 0.07)' : `1px solid ${token.colorBorderSecondary}`,
              boxShadow: isDarkMode ? '4px 0 20px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            {renderBrandLogo(collapsed)}
            <Menu
              theme={isDarkMode ? 'dark' : 'light'}
              mode="inline"
              inlineIndent={12}
              selectedKeys={[selectedKey]}
              items={mainMenuItems}
              style={{ borderRight: 0 }}
            />
          </Sider>
        )}

        <Layout className="app-layout-main">
          <Header
            className="app-header"
            style={{
              padding: isMobile ? '0 12px' : '0 18px',
              background: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <div className="app-header-left">
              {isMobile && (
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setMobileDrawerOpen(true)}
                  className="app-mobile-nav-btn"
                  title="Open Navigation Menu"
                />
              )}
              {isMobile ? renderBrandLogo(false, true, true) : renderBreadcrumb({ margin: 0 })}
            </div>
            {renderHeaderRightActions()}
          </Header>

          <div className="app-content-scroll-container">
            <Content className="app-main-content" style={{ margin: isMobile ? 10 : 20, minHeight: 280 }}>
              {isMobile && renderBreadcrumb({ margin: '0 0 10px 2px' })}
              <Outlet />
            </Content>

            {renderFooter()}
          </div>
        </Layout>
      </Layout>
    );
  }

  /**
   * ==============================================================================
   * 2. ANTD LAYOUT 2: Top-side (Header Sider 2)
   * Desktop: Full-width Header on top, Left Sider with subnav + Content below
   * Mobile: Header with Hamburger + Off-canvas Drawer with subnav + 100% Content
   * ==============================================================================
   */
  if (appLayout === 'top-side') {
    return (
      <Layout className="app-layout-wrapper">
        {renderMobileDrawer()}
        {renderSearchModal()}

        <Header
          className="app-header"
          style={{
            padding: isMobile ? '0 12px' : '0 18px',
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div className="app-header-left">
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerOpen(true)}
                className="app-mobile-nav-btn"
                title="Open Navigation Menu"
              />
            )}
            {renderBrandLogo(false, true, true)}
          </div>

          {!isMobile && (
            <div className="app-header-center">
              <Menu
                mode="horizontal"
                selectedKeys={[selectedKey]}
                items={[
                  { key: 'dashboard', label: 'Dashboard', onClick: () => handleMenuSelect('dashboard') },
                  { key: 'analytics', label: 'Analytics', onClick: () => handleMenuSelect('analytics') },
                  { key: 'security', label: 'Security', onClick: () => handleMenuSelect('security') },
                ]}
              />
            </div>
          )}

          {renderHeaderRightActions()}
        </Header>

        <Layout className="app-topside-body-layout" style={{ minWidth: 0 }}>
          {!isMobile && (
            <Sider
              className="app-layout-sider app-topside-sider"
              width={SIDER_WIDTH}
              theme={isDarkMode ? 'dark' : 'light'}
              style={{
                borderRight: isDarkMode ? '1px solid rgba(255, 255, 255, 0.07)' : `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <div className="app-sider-section-title">
                SUB-NAVIGATION
              </div>
              <Menu
                mode="inline"
                inlineIndent={12}
                selectedKeys={[selectedKey]}
                items={subnavMenuItems}
                style={{ height: '100%', borderRight: 0 }}
              />
            </Sider>
          )}

          <div className="app-content-scroll-container app-topside-content-scroll" style={{ padding: isMobile ? 10 : '0 18px 18px' }}>
            {renderBreadcrumb({ margin: isMobile ? '0 0 10px' : '12px 0' })}
            <Content className="app-main-content" style={{ minHeight: 280 }}>
              <Outlet />
            </Content>
            {renderFooter()}
          </div>
        </Layout>
      </Layout>
    );
  }

  /**
   * ==============================================================================
   * 3. ANTD LAYOUT 3: Header-Content-Footer (Top Navigation)
   * Desktop: Compact Horizontal Menu next to Logo, 0 Siders, Content in Center
   * Mobile: Header with Hamburger, Off-canvas Drawer Menu, 100% Fluid Content
   * ==============================================================================
   */
  if (appLayout === 'header-content-footer') {
    return (
      <Layout className="app-layout-wrapper">
        {renderMobileDrawer()}
        {renderSearchModal()}

        <Header
          className="app-header"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: isMobile ? '0 12px' : '0 20px',
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div className="app-header-left">
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerOpen(true)}
                className="app-mobile-nav-btn"
                title="Open Navigation Menu"
              />
            )}
            {renderBrandLogo(false, true, true)}
          </div>

          {!isMobile && (
            <div className="app-header-center">
              <Menu
                mode="horizontal"
                selectedKeys={[selectedKey]}
                items={mainMenuItems}
              />
            </div>
          )}

          {renderHeaderRightActions()}
        </Header>

        <div className="app-content-scroll-container app-hcf-content-scroll">
          <Content className="app-main-content app-hcf-content" style={{ padding: isMobile ? '10px 12px' : '18px 24px' }}>
            {renderBreadcrumb({ margin: '0 0 12px' })}
            <div style={{ minHeight: 380, width: '100%' }}>
              <Outlet />
            </div>
          </Content>

          {renderFooter()}
        </div>
      </Layout>
    );
  }

  /**
   * ==============================================================================
   * 4. ANTD LAYOUT 4: Custom Trigger
   * Desktop: Left Sider with trigger={null}, custom toggle icon in Header
   * Mobile: Header toggle icon opens off-canvas Drawer menu, 100% fluid content
   * ==============================================================================
   */
  return (
    <Layout className="app-layout-wrapper">
      {renderMobileDrawer()}
      {renderSearchModal()}

      {!isMobile && (
        <Sider
          className="app-layout-sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth={SIDER_COLLAPSED_WIDTH}
          width={SIDER_WIDTH}
          theme={isDarkMode ? 'dark' : 'light'}
          style={{
            borderRight: isDarkMode ? '1px solid rgba(255, 255, 255, 0.07)' : `1px solid ${token.colorBorderSecondary}`,
            boxShadow: isDarkMode ? '4px 0 20px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          {renderBrandLogo(collapsed)}
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline"
            inlineIndent={12}
            selectedKeys={[selectedKey]}
            items={mainMenuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>
      )}

      <Layout className="app-layout-main">
        <Header
          className="app-header"
          style={{
            padding: isMobile ? '0 12px' : '0 18px 0 0',
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div className="app-header-left">
            <Button
              type="text"
              icon={
                isMobile ? (
                  <MenuOutlined />
                ) : collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => {
                if (isMobile) {
                  setMobileDrawerOpen(true);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              style={{
                fontSize: 17,
                width: isMobile ? 36 : 54,
                height: isMobile ? 36 : 54,
                color: presetColor,
                flexShrink: 0,
              }}
              title={isMobile ? 'Open Navigation' : collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            />
            {isMobile ? renderBrandLogo(false, true, true) : renderBreadcrumb({ margin: 0 })}
          </div>

          {renderHeaderRightActions()}
        </Header>

        <div className="app-content-scroll-container">
          <Content className="app-main-content" style={{ margin: isMobile ? 10 : 20, minHeight: 280 }}>
            {isMobile && renderBreadcrumb({ margin: '0 0 10px 2px' })}
            <Outlet />
          </Content>

          {renderFooter()}
        </div>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
