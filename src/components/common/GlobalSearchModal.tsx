import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Modal,
  Input,
  List,
  Typography,
  Space,
  Tag,
  Empty,
  theme,
  type InputRef,
} from 'antd';
import {
  SearchOutlined,
  CloseOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  KeyOutlined,
  SettingOutlined,
  SlidersOutlined,
  LogoutOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectCustomization, toggleDrawer } from '../../features/customization/customizationSlice';
import { logoutUser } from '../../features/auth/authSlice';
import { hexToRgba } from '../../utils/colorUtils';
import '../../styles/GlobalSearchModal.css';

const { Text } = Typography;

export interface GlobalSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectKey?: (key: string) => void;
  onLogout?: () => void;
}

export interface NavigationSearchItem {
  id: string;
  key: string;
  title: string;
  category: 'Page' | 'Action';
  subtitle: string;
  icon: React.ReactNode;
  keywords: string[];
  action?: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  open,
  onClose,
  onSelectKey,
  onLogout,
}) => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();

  const customization = useSelector(selectCustomization);
  const { mode = 'light', presetColor = '#673ab7' } = customization;
  const isDarkMode = mode === 'dark';

  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const inputRef = useRef<InputRef>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Focus AntD Input automatically whenever modal opens
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Actual Website Navigation Items from the App's Sidebar Menu
  const sidebarNavItems: NavigationSearchItem[] = useMemo(
    () => [
      {
        id: 'nav-dashboard',
        key: 'dashboard',
        title: 'Dashboard',
        category: 'Page',
        subtitle: 'Main system overview, JWT session details & summary cards',
        icon: <DashboardOutlined />,
        keywords: ['dashboard', 'home', 'overview', 'main', 'jwt', 'stats'],
      },
      {
        id: 'nav-analytics',
        key: 'analytics',
        title: 'Analytics',
        category: 'Page',
        subtitle: 'Data visualization, performance metrics & activity trends',
        icon: <BarChartOutlined />,
        keywords: ['analytics', 'charts', 'reports', 'graphs', 'data', 'metrics'],
      },
      {
        id: 'nav-security',
        key: 'security',
        title: 'Security & Auth',
        category: 'Page',
        subtitle: 'Authentication token inspection, security headers & Axios status',
        icon: <SafetyCertificateOutlined />,
        keywords: ['security', 'auth', 'jwt', 'token', 'protection', 'guard'],
      },
      {
        id: 'nav-users-list',
        key: 'users-list',
        title: 'User Management - All Users',
        category: 'Page',
        subtitle: 'Directory of registered members, profiles & account status',
        icon: <UserOutlined />,
        keywords: ['users', 'all users', 'user management', 'members', 'directory', 'accounts'],
      },
      {
        id: 'nav-roles',
        key: 'roles',
        title: 'User Management - Roles & Permissions',
        category: 'Page',
        subtitle: 'Role-based access controls, admin permissions & rights',
        icon: <KeyOutlined />,
        keywords: ['roles', 'permissions', 'access', 'admin', 'editor', 'privileges'],
      },
      {
        id: 'nav-settings',
        key: 'settings',
        title: 'System Settings',
        category: 'Page',
        subtitle: 'System configuration, account settings & notifications',
        icon: <SettingOutlined />,
        keywords: ['settings', 'system settings', 'configuration', 'preferences', 'setup'],
      },
      {
        id: 'action-theme-customizer',
        key: 'theme',
        title: 'Theme & Layout Customizer',
        category: 'Action',
        subtitle: 'Change color presets, toggle dark mode & switch layouts',
        icon: <SlidersOutlined />,
        keywords: ['theme', 'layout', 'customizer', 'colors', 'dark mode', 'presets'],
        action: () => {
          dispatch(toggleDrawer());
        },
      },
      {
        id: 'action-signout',
        key: 'logout',
        title: 'Sign Out',
        category: 'Action',
        subtitle: 'Safely terminate active authentication session',
        icon: <LogoutOutlined />,
        keywords: ['sign out', 'logout', 'exit', 'disconnect'],
        action: () => {
          if (onLogout) {
            onLogout();
          } else {
            dispatch(logoutUser() as any);
          }
        },
      },
    ],
    [dispatch, onLogout]
  );

  // Filter items in real-time as user types
  const filteredItems: NavigationSearchItem[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return sidebarNavItems;
    }

    return sidebarNavItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchSubtitle = item.subtitle.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(trimmed));
      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [query, sidebarNavItems]);

  // Reset selected item index when search query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle item activation (Click or Enter)
  const handleSelectItem = (item: NavigationSearchItem) => {
    onClose();

    if (item.action) {
      item.action();
      return;
    }

    if (onSelectKey) {
      onSelectKey(item.key);
    }
  };

  // Keyboard navigation (Arrow Up, Arrow Down, Enter, Esc)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view when navigating via arrow keys
  useEffect(() => {
    if (listContainerRef.current) {
      const activeEl = listContainerRef.current.querySelector<HTMLElement>('.app-search-nav-item.is-selected');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <Text
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: isDarkMode ? '#f8fafc' : token.colorTextHeading,
          }}
        >
          Search
        </Text>
      }
      closable={true}
      closeIcon={<CloseOutlined style={{ fontSize: 14 }} />}
      footer={null}
      width={560}
      style={{ top: 90 }}
      destroyOnClose
      wrapClassName="app-search-modal-root"
      className={`app-search-modal ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      styles={{
        container: {
          padding: 0,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: isDarkMode ? '#1b1c1e' : '#ffffff',
        },
        header: {
          padding: '16px 20px 14px 20px',
          margin: 0,
          backgroundColor: 'transparent',
          borderBottom: isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : `1px solid ${token.colorBorderSecondary}`,
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none' }}>
        {/* Search Input Box below the Header, with Search Icon inside the Input */}
        <div style={{ padding: '16px 20px 10px 20px' }}>
          <Input
            ref={inputRef}
            size="large"
            prefix={
              <SearchOutlined
                style={{
                  fontSize: 16,
                  color: isDarkMode ? '#9ca3af' : token.colorTextTertiary,
                  marginRight: 6,
                }}
              />
            }
            placeholder="Search sidebar navigation, pages & actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            allowClear
            className="app-search-modal-inner-input"
            style={{
              borderRadius: 8,
              fontSize: 14.5,
              height: 42,
            }}
          />
        </div>

        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 20px 6px 20px',
          }}
        >
          <Text
            type="secondary"
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              color: isDarkMode ? '#9ca3af' : token.colorTextSecondary,
            }}
          >
            {query.trim() ? 'Search Results' : 'Sidebar Navigation'}
          </Text>

          <Tag
            bordered={false}
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 600,
              color: isDarkMode ? '#94a3b8' : token.colorTextSecondary,
              background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
            }}
          >
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </Tag>
        </div>

        {/* Ant Design List of Website Navigation Items - Stable Height Container */}
        <div className="app-search-list-container" ref={listContainerRef}>
          <List
            split={false}
            dataSource={filteredItems}
            locale={{
              emptyText: (
                <div
                  style={{
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        No matching navigation pages found for "{query}"
                      </Text>
                    }
                  />
                </div>
              ),
            }}
            renderItem={(item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <List.Item
                  key={item.id}
                  className={`app-search-nav-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  extra={
                    <Space size={8} style={{ flexShrink: 0 }}>
                      <Tag
                        bordered={false}
                        style={{
                          margin: 0,
                          fontSize: 11,
                          fontWeight: 500,
                          borderRadius: 4,
                          color:
                            item.category === 'Action'
                              ? '#f59e0b'
                              : isDarkMode
                              ? '#a5b4fc'
                              : presetColor,
                          background:
                            item.category === 'Action'
                              ? 'rgba(245, 158, 11, 0.12)'
                              : isDarkMode
                              ? 'rgba(165, 180, 252, 0.12)'
                              : hexToRgba(presetColor, 0.12),
                        }}
                      >
                        {item.category}
                      </Tag>
                      {isSelected ? (
                        <Tag
                          bordered={false}
                          style={{
                            margin: 0,
                            fontSize: 11,
                            padding: '0 5px',
                            lineHeight: '18px',
                            fontFamily: 'monospace',
                            background: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0',
                            color: isDarkMode ? '#cbd5e1' : '#475569',
                          }}
                        >
                          ↵
                        </Tag>
                      ) : (
                        <ArrowRightOutlined
                          style={{
                            fontSize: 12,
                            opacity: 0.35,
                            color: isDarkMode ? '#cbd5e1' : token.colorTextSecondary,
                          }}
                        />
                      )}
                    </Space>
                  }
                >
                  <Space size={12} style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <div
                      className="app-search-item-avatar"
                      style={{
                        backgroundColor: isSelected
                          ? hexToRgba(presetColor, 0.18)
                          : undefined,
                        color: isSelected ? presetColor : undefined,
                      }}
                    >
                      {item.icon}
                    </div>

                    <Space direction="vertical" size={1} style={{ minWidth: 0, overflow: 'hidden' }}>
                      <Text
                        ellipsis
                        style={{
                          fontSize: 14,
                          fontWeight: isSelected ? 600 : 500,
                          color: isSelected
                            ? isDarkMode
                              ? '#ffffff'
                              : token.colorTextHeading
                            : isDarkMode
                            ? '#e5e7eb'
                            : token.colorText,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        ellipsis
                        type="secondary"
                        style={{
                          fontSize: 12,
                          color: isDarkMode ? '#94a3b8' : token.colorTextSecondary,
                        }}
                      >
                        {item.subtitle}
                      </Text>
                    </Space>
                  </Space>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default GlobalSearchModal;
