import React, { forwardRef } from 'react';
import { Button, Tooltip, Popconfirm } from 'antd';
import type { ButtonProps, TooltipProps, PopconfirmProps } from 'antd';

export type AppButtonStatus =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'default';

export interface AppButtonProps extends Omit<ButtonProps, 'status'> {
  /**
   * Semantic status preset:
   * - 'primary': Brand primary action
   * - 'success': Affirmative / green action (e.g. Save, Approve, Success)
   * - 'warning': Cautionary / amber action (e.g. Warning, Suspend)
   * - 'danger' | 'error': Destructive / red action (e.g. Delete, Terminate)
   * - 'info': Informational / blue action
   * - 'default': Neutral default styling
   */
  status?: AppButtonStatus;

  /**
   * Trailing / end icon displayed after button children
   */
  endIcon?: React.ReactNode;

  /**
   * Custom text displayed when button is in loading state
   */
  loadingText?: React.ReactNode;

  /**
   * Built-in Tooltip text or Ant Design TooltipProps object.
   * Seamlessly works on disabled buttons as well.
   */
  tooltip?: React.ReactNode | TooltipProps;

  /**
   * Built-in confirmation popup (Popconfirm).
   * Can be a string message or a full Ant Design PopconfirmProps configuration.
   * When provided, onClick is triggered only after the user confirms.
   */
  confirm?: React.ReactNode | PopconfirmProps;

  /**
   * Full width container shortcut (alias for `block`)
   */
  fullWidth?: boolean;
}

export interface AppButtonComponent
  extends React.ForwardRefExoticComponent<
    AppButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>
  > {
  Group: typeof Button.Group;
}

/**
 * Enterprise Reusable AppButton Component
 *
 * Built on top of Ant Design Button, fully compatible with Ant Design ConfigProvider
 * tokens, theme customizer, and dark mode.
 *
 * Features:
 * - Semantic statuses ('success', 'warning', 'info', 'danger')
 * - Built-in Tooltip support (even for disabled buttons)
 * - Built-in Popconfirm support for destructive actions
 * - Leading and trailing icon support (`icon` & `endIcon`)
 * - Loading indicator with optional `loadingText`
 * - Full type-safety and ref forwarding
 */
export const AppButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AppButtonProps>(
  (
    {
      children,
      type = 'primary',
      status,
      endIcon,
      loadingText,
      tooltip,
      confirm,
      fullWidth,
      block,
      disabled,
      loading,
      onClick,
      style,
      className,
      color,
      variant,
      danger,
      ...restProps
    },
    ref
  ) => {
    const isBlock = Boolean(block || fullWidth);

    // Resolve Status and Colors
    let resolvedType: ButtonProps['type'] = type;
    let resolvedColor = color;
    let resolvedVariant = variant;
    let resolvedDanger = danger;

    if (status) {
      switch (status) {
        case 'success':
          resolvedColor = color ?? 'green';
          resolvedVariant =
            variant ??
            (type === 'primary'
              ? 'solid'
              : type === 'dashed'
                ? 'dashed'
                : type === 'text' || type === 'link'
                  ? type
                  : 'outlined');
          resolvedType = undefined;
          break;
        case 'warning':
          resolvedColor = color ?? 'gold';
          resolvedVariant =
            variant ??
            (type === 'primary'
              ? 'solid'
              : type === 'dashed'
                ? 'dashed'
                : type === 'text' || type === 'link'
                  ? type
                  : 'outlined');
          resolvedType = undefined;
          break;
        case 'info':
          resolvedColor = color ?? 'blue';
          resolvedVariant =
            variant ??
            (type === 'primary'
              ? 'solid'
              : type === 'dashed'
                ? 'dashed'
                : type === 'text' || type === 'link'
                  ? type
                  : 'outlined');
          resolvedType = undefined;
          break;
        case 'danger':
        case 'error':
          resolvedDanger = true;
          resolvedType = type;
          break;
        case 'primary':
          resolvedType = 'primary';
          break;
        case 'default':
          resolvedType = 'default';
          break;
      }
    }

    // Resolve Popconfirm logic
    const isConfirmActive = Boolean(confirm && !disabled);
    let popconfirmProps: PopconfirmProps | undefined = undefined;

    if (isConfirmActive) {
      const isConfirmConfigObject =
        typeof confirm === 'object' &&
        confirm !== null &&
        !React.isValidElement(confirm) &&
        ('title' in (confirm as object) || 'description' in (confirm as object));

      if (isConfirmConfigObject) {
        const customConfig = confirm as PopconfirmProps;
        popconfirmProps = {
          ...customConfig,
          onConfirm: customConfig.onConfirm || ((e) => onClick?.(e as any)),
        };
      } else {
        popconfirmProps = {
          title: confirm as React.ReactNode,
          onConfirm: (e) => onClick?.(e as any),
        };
      }
    }

    // Resolve Tooltip logic
    const isTooltipConfigObject =
      typeof tooltip === 'object' &&
      tooltip !== null &&
      !React.isValidElement(tooltip) &&
      ('title' in (tooltip as object) || 'content' in (tooltip as object));

    const tooltipProps: TooltipProps | undefined = tooltip
      ? isTooltipConfigObject
        ? (tooltip as TooltipProps)
        : { title: tooltip as React.ReactNode }
      : undefined;

    // Resolve Children & Loading / EndIcon
    let content: React.ReactNode = children;

    if (loading && loadingText) {
      content = loadingText;
    }

    if (endIcon && !loading) {
      if (content !== undefined && content !== null && content !== '') {
        content = (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {content}
            <span
              className="app-btn-end-icon"
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              {endIcon}
            </span>
          </span>
        );
      } else {
        content = endIcon;
      }
    }

    // Render Base Ant Design Button
    let buttonNode: React.ReactElement = (
      <Button
        ref={ref}
        type={resolvedType}
        color={resolvedColor}
        variant={resolvedVariant}
        danger={resolvedDanger}
        block={isBlock}
        disabled={disabled}
        loading={loading}
        style={style}
        className={className}
        onClick={isConfirmActive ? undefined : onClick}
        {...restProps}
      >
        {content}
      </Button>
    );

    // Wrap with Popconfirm if active
    if (popconfirmProps) {
      buttonNode = <Popconfirm {...popconfirmProps}>{buttonNode}</Popconfirm>;
    }

    // Wrap with Tooltip if provided
    if (tooltipProps) {
      if (disabled) {
        buttonNode = (
          <Tooltip {...tooltipProps}>
            <span
              style={{
                display: isBlock ? 'block' : 'inline-block',
                cursor: 'not-allowed',
                width: isBlock ? '100%' : undefined,
              }}
            >
              {buttonNode}
            </span>
          </Tooltip>
        );
      } else {
        buttonNode = <Tooltip {...tooltipProps}>{buttonNode}</Tooltip>;
      }
    }

    return buttonNode;
  }
) as AppButtonComponent;

AppButton.Group = Button.Group;

export default AppButton;
