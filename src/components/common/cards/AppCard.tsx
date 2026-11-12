import React, { forwardRef, useState } from 'react';
import { Card, Badge, Tooltip, Button } from 'antd';
import type { CardProps } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

export type CardTabListType = NonNullable<CardProps['tabList']>[number];

export type AppCardElevation = 'none' | 'low' | 'medium' | 'high' | 'hover';

export interface AppCardRibbonConfig {
  text: React.ReactNode;
  color?: string;
  placement?: 'start' | 'end';
  /**
   * Clearance offset in pixels to prevent ribbon overlap with header elements.
   * Defaults to 96px.
   */
  offset?: number;
}

export interface AppCardProps extends CardProps {
  /**
   * Elevation shadow preset:
   * - 'none': No box shadow (flat)
   * - 'low': Subtle subtle shadow for dense layouts
   * - 'medium': Standard card elevation
   * - 'high': Floating prominent elevation
   * - 'hover': Interactive elevation that lifts on mouse hover
   */
  elevation?: AppCardElevation;

  /**
   * Ribbon badge shortcut (renders Ant Design Badge.Ribbon)
   */
  ribbon?: React.ReactNode | AppCardRibbonConfig;

  /**
   * Placement of the collapse chevron icon:
   * - 'start': Placed to the left of the title (standard accordion style, best with ribbons)
   * - 'end': Placed in the extra actions slot on the right
   * Defaults to 'start' when ribbon is present, and 'end' otherwise.
   */
  collapsePlacement?: 'start' | 'end';

  /**
   * Enables collapsible card body with toggle icon in the header
   */
  collapsible?: boolean;

  /**
   * Controlled collapsed state
   */
  collapsed?: boolean;

  /**
   * Initial collapsed state if uncontrolled
   */
  defaultCollapsed?: boolean;

  /**
   * Callback fired when collapsed state changes
   */
  onCollapseChange?: (collapsed: boolean) => void;

  /**
   * Quick refresh button trigger in header extra
   */
  refreshable?: boolean;

  /**
   * Callback fired when header refresh button is clicked
   */
  onRefresh?: () => void;

  /**
   * Whether the refresh operation is currently in progress
   */
  isRefreshing?: boolean;

  /**
   * Accent color border indicator:
   * - 'top': Prominent colored top bar (KPI / Metric cards)
   * - 'left': Semantic status strip on left (Alerts / Notifications)
   * - 'bottom': Underline indicator bar
   * - 'none': Standard uniform border
   */
  accentBar?: 'top' | 'left' | 'bottom' | 'none';

  /**
   * Custom color for the accent bar (defaults to primary theme color)
   */
  accentColor?: string;

  /**
   * Gradient background preset or custom CSS gradient string:
   * - true: Uses default primary gradient
   * - 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan' | 'dark'
   * - Or custom CSS linear-gradient string
   */
  gradient?: boolean | 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'cyan' | 'dark' | string;
}

export interface AppCardComponent
  extends React.ForwardRefExoticComponent<
    AppCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Meta: typeof Card.Meta;
  Grid: typeof Card.Grid;
}

const elevationStyles: Record<AppCardElevation, React.CSSProperties> = {
  none: {
    boxShadow: 'none',
  },
  low: {
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
  },
  medium: {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
  },
  high: {
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
  },
  hover: {
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
};

/**
 * Enterprise Reusable AppCard Component
 *
 * Enhanced version of Ant Design Card with:
 * - Built-in Ribbon badge shortcut (`ribbon`)
 * - Collapsible card body with smooth collapse/expand (`collapsible`)
 * - Preset elevation shadow styling (`elevation`)
 * - Header refresh action shortcut (`refreshable` & `onRefresh`)
 * - Full Dark Mode & ConfigProvider token responsiveness
 */
export const AppCard = forwardRef<HTMLDivElement, AppCardProps>(
  (
    {
      children,
      title,
      extra,
      elevation = 'medium',
      ribbon,
      collapsible = false,
      collapsePlacement,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapseChange,
      refreshable = false,
      onRefresh,
      isRefreshing = false,
      accentBar,
      accentColor,
      gradient,
      style,
      className,
      hoverable,
      ...restProps
    },
    ref
  ) => {
    // Collapsible internal state
    const [internalCollapsed, setInternalCollapsed] = useState<boolean>(defaultCollapsed);
    const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

    const handleToggleCollapse = (e: React.MouseEvent) => {
      e.stopPropagation();
      const nextCollapsed = !isCollapsed;
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(nextCollapsed);
      }
      onCollapseChange?.(nextCollapsed);
    };

    // Resolve Ribbon configuration
    const isRibbonObject =
      typeof ribbon === 'object' &&
      ribbon !== null &&
      !React.isValidElement(ribbon) &&
      'text' in (ribbon as object);

    const ribbonConfig: AppCardRibbonConfig | undefined = isRibbonObject
      ? (ribbon as AppCardRibbonConfig)
      : ribbon
        ? { text: ribbon as React.ReactNode }
        : undefined;

    const ribbonPlacement = ribbonConfig?.placement || 'end';
    const hasRibbonEnd = Boolean(ribbon && ribbonPlacement === 'end');
    const hasRibbonStart = Boolean(ribbon && ribbonPlacement === 'start');

    // Dynamic ribbon offset calculation based on text length to prevent action overlap
    const ribbonTextLength =
      typeof ribbonConfig?.text === 'string'
        ? ribbonConfig.text.length
        : typeof ribbonConfig?.text === 'number'
          ? String(ribbonConfig.text).length
          : 8;
    const calculatedRibbonOffset = Math.max(86, ribbonTextLength * 8 + 28);
    const resolvedRibbonOffset = ribbonConfig?.offset ?? calculatedRibbonOffset;

    // Default collapsePlacement: 'start' (left of title) when ribbon is on top-right, otherwise 'end'
    const resolvedCollapsePlacement =
      collapsePlacement || (hasRibbonEnd ? 'start' : 'end');

    // Reusable Collapse toggle icon button
    const collapseButton = collapsible ? (
      <Tooltip title={isCollapsed ? 'Expand' : 'Collapse'}>
        <Button
          type="text"
          size="small"
          icon={
            resolvedCollapsePlacement === 'start' ? (
              isCollapsed ? <RightOutlined style={{ fontSize: 12 }} /> : <DownOutlined style={{ fontSize: 12 }} />
            ) : (
              isCollapsed ? <DownOutlined style={{ fontSize: 12 }} /> : <UpOutlined style={{ fontSize: 12 }} />
            )
          }
          onClick={handleToggleCollapse}
          style={{ width: 26, height: 26, padding: 0 }}
        />
      </Tooltip>
    ) : null;

    // Header Title with optional leading collapse chevron
    const renderedTitle = title ? (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginInlineStart: hasRibbonStart ? resolvedRibbonOffset : undefined,
        }}
      >
        {resolvedCollapsePlacement === 'start' && collapseButton}
        <span>{title}</span>
      </div>
    ) : (
      resolvedCollapsePlacement === 'start' ? collapseButton : undefined
    );

    // Header Extra with optional trailing collapse chevron, refresh button, and custom extra
    const hasRightCollapse = resolvedCollapsePlacement === 'end' && collapsible;
    const hasCustomExtraActions = refreshable || hasRightCollapse;
    const hasAnyExtra = hasCustomExtraActions || Boolean(extra);

    const renderedExtra = hasAnyExtra ? (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          marginInlineEnd: hasRibbonEnd ? resolvedRibbonOffset : undefined,
        }}
      >
        {extra}
        {refreshable && (
          <Tooltip title="Refresh">
            <Button
              type="text"
              size="small"
              icon={<ReloadOutlined spin={isRefreshing} />}
              onClick={onRefresh}
              disabled={isRefreshing}
              style={{ width: 28, height: 28, padding: 0 }}
            />
          </Tooltip>
        )}
        {hasRightCollapse && collapseButton}
      </div>
    ) : undefined;

    // Gradient presets
    const gradientPresets: Record<string, string> = {
      primary: 'linear-gradient(135deg, var(--primary-color, #1677ff) 0%, #3b82f6 100%)',
      success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      purple: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      cyan: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
      dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    };

    let backgroundStyle: React.CSSProperties = {};
    if (gradient) {
      const gradientValue =
        typeof gradient === 'string'
          ? gradientPresets[gradient] || gradient
          : 'linear-gradient(135deg, var(--primary-color, #1677ff) 0%, #4338ca 100%)';
      backgroundStyle = {
        background: gradientValue,
        color: '#ffffff',
      };
    }

    let accentStyle: React.CSSProperties = {};
    if (accentBar && accentBar !== 'none') {
      const resolvedAccentColor = accentColor || 'var(--primary-color, #1677ff)';
      if (accentBar === 'top') {
        accentStyle = { borderTop: `4px solid ${resolvedAccentColor}` };
      } else if (accentBar === 'left') {
        accentStyle = { borderLeft: `4px solid ${resolvedAccentColor}` };
      } else if (accentBar === 'bottom') {
        accentStyle = { borderBottom: `4px solid ${resolvedAccentColor}` };
      }
    }

    // Merge elevation styles
    const mergedStyle: React.CSSProperties = {
      borderRadius: 12,
      ...elevationStyles[elevation],
      ...backgroundStyle,
      ...accentStyle,
      ...style,
    };

    // Card Node
    let cardNode = (
      <Card
        ref={ref}
        title={renderedTitle}
        extra={renderedExtra}
        hoverable={hoverable || elevation === 'hover'}
        style={mergedStyle}
        className={`app-card ${gradient ? 'app-card-gradient' : ''} ${collapsible && isCollapsed ? 'app-card-collapsed' : ''} ${className || ''}`}
        {...restProps}
      >
        {!isCollapsed && children}
      </Card>
    );

    // Wrap with Badge.Ribbon if ribbon prop is provided
    if (ribbon && ribbonConfig) {
      cardNode = (
        <Badge.Ribbon
          text={ribbonConfig.text}
          color={ribbonConfig.color}
          placement={ribbonConfig.placement || 'end'}
          style={{ fontWeight: 600 }}
        >
          {cardNode}
        </Badge.Ribbon>
      );
    }

    return cardNode;
  }
) as AppCardComponent;

AppCard.Meta = Card.Meta;
AppCard.Grid = Card.Grid;

export default AppCard;
