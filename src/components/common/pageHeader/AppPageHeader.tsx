import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { useSelector } from 'react-redux';
import { selectCustomization } from '../../../features/customization/customizationSlice';

const { Title, Text } = Typography;

export interface AppPageHeaderProps {
  /**
   * Main title of the page
   */
  title: React.ReactNode;

  /**
   * Subtitle or descriptive paragraph below the title
   */
  description?: React.ReactNode;

  /**
   * Optional leading icon (e.g. <EditOutlined />, <AppstoreOutlined />)
   */
  icon?: React.ReactNode;

  /**
   * Custom background color for the icon container
   */
  iconBgColor?: string;

  /**
   * Custom icon color
   */
  iconColor?: string;

  /**
   * Optional tags or status badges displayed beside or below the title
   */
  tags?: React.ReactNode;

  /**
   * Action buttons or controls rendered on the top right
   */
  extra?: React.ReactNode;

  /**
   * Optional breadcrumb navigation items
   */
  breadcrumbs?: BreadcrumbProps['items'];

  /**
   * Visual presentation variant:
   * - 'contained' (default): sleek card container with subtle border & background
   * - 'ghost': minimal presentation without outer card container
   * - 'elevated': card container with subtle shadow elevation
   */
  variant?: 'contained' | 'ghost' | 'elevated';

  /**
   * Optional content rendered below the header (e.g. tabs, filters, metric bar)
   */
  children?: React.ReactNode;

  /**
   * Custom inline style for the outer container
   */
  style?: React.CSSProperties;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Enterprise Unified Page Header Component
 *
 * Provides a standardized, polished header across all pages with:
 * - Responsive title & action layout
 * - Themed icon box with dynamic primary tint
 * - Breadcrumb navigation support
 * - Tag/badge row
 * - Seamless dark & light mode styling via CSS tokens
 */
export const AppPageHeader: React.FC<AppPageHeaderProps> = ({
  title,
  description,
  icon,
  iconBgColor,
  iconColor,
  tags,
  extra,
  breadcrumbs,
  variant = 'contained',
  children,
  style,
  className = '',
}) => {
  const { presetColor } = useSelector(selectCustomization);

  // Resolved icon colors
  const resolvedIconColor = iconColor || presetColor || '#1677ff';
  const resolvedIconBg = iconBgColor || `${resolvedIconColor}15`;

  // Container styling by variant
  const getContainerStyle = (): React.CSSProperties => {
    if (variant === 'ghost') {
      return {
        padding: '0 0 20px 0',
        marginBottom: 20,
        ...style,
      };
    }

    const baseContained: React.CSSProperties = {
      background: 'var(--ant-color-bg-container, #ffffff)',
      border: '1px solid var(--ant-color-border-secondary, #f0f0f0)',
      borderRadius: 12,
      padding: '20px 24px',
      marginBottom: 24,
      transition: 'background 0.3s ease, border-color 0.3s ease',
    };

    if (variant === 'elevated') {
      return {
        ...baseContained,
        boxShadow: '0 4px 14px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        ...style,
      };
    }

    return {
      ...baseContained,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.03)',
      ...style,
    };
  };

  return (
    <div
      className={`app-page-header app-page-header-${variant} ${className}`}
      style={getContainerStyle()}
    >
      {/* Optional Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}

      {/* Main Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Left Side: Icon + Title + Description + Tags */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, minWidth: 260, flex: 1 }}>
          {icon && (
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: resolvedIconBg,
                border: `1px solid ${resolvedIconColor}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: resolvedIconColor,
                fontSize: 22,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              {icon}
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Title & Inline Tags */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <Title
                level={3}
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: 1.3,
                  color: 'var(--ant-color-text, #1e293b)',
                }}
              >
                {title}
              </Title>
            </div>

            {/* Subtitle / Description */}
            {description && (
              <Text
                type="secondary"
                style={{
                  display: 'block',
                  fontSize: 13.5,
                  marginTop: 4,
                  lineHeight: 1.5,
                  maxWidth: 860,
                }}
              >
                {description}
              </Text>
            )}

            {/* Tags row */}
            {tags && (
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {tags}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Extra Action Buttons */}
        {extra && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              alignSelf: 'center',
            }}
          >
            {extra}
          </div>
        )}
      </div>

      {/* Optional Children (Tabs, Filter Bar, Stats, etc.) */}
      {children && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--ant-color-border-secondary, #f0f0f0)' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default AppPageHeader;
