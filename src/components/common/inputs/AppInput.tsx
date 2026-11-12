import React, { forwardRef } from 'react';
import { Input, Tooltip, Space } from 'antd';
import type { InputProps, InputRef } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { SearchProps } from 'antd/es/input';
import type { OTPProps } from 'antd/es/input/OTP';
import { LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons';

export interface AppInputProps extends InputProps {
  /**
   * Field label displayed above the input
   */
  label?: React.ReactNode;

  /**
   * Shows a red asterisk (*) next to the label indicating a required field
   */
  required?: boolean;

  /**
   * Help text or validation error message displayed below the input
   */
  helperText?: React.ReactNode;

  /**
   * Helpful information tooltip icon placed next to the label or in the suffix
   */
  tooltip?: React.ReactNode;

  /**
   * Displays an animated loading spinner inside the suffix slot
   */
  loading?: boolean;

  /**
   * Convenience alias for allowClear
   */
  clearable?: boolean;

  /**
   * Outer container style when label/helperText are used
   */
  containerStyle?: React.CSSProperties;

  /**
   * Outer container className
   */
  containerClassName?: string;
}

export interface AppInputPasswordProps extends React.ComponentProps<typeof Input.Password> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputTextAreaProps extends TextAreaProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputSearchProps extends SearchProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputOTPProps extends OTPProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputComponent
  extends React.ForwardRefExoticComponent<
    AppInputProps & React.RefAttributes<InputRef>
  > {
  Password: React.ForwardRefExoticComponent<
    AppInputPasswordProps & React.RefAttributes<InputRef>
  >;
  TextArea: React.ForwardRefExoticComponent<
    AppInputTextAreaProps & React.RefAttributes<any>
  >;
  Search: React.ForwardRefExoticComponent<
    AppInputSearchProps & React.RefAttributes<InputRef>
  >;
  OTP: React.ForwardRefExoticComponent<
    AppInputOTPProps & React.RefAttributes<any>
  >;
  Group: typeof Input.Group;
}

const renderInputWrapper = (
  inputNode: React.ReactNode,
  label?: React.ReactNode,
  required?: boolean,
  tooltip?: React.ReactNode,
  helperText?: React.ReactNode,
  status?: '' | 'error' | 'warning',
  containerStyle?: React.CSSProperties,
  containerClassName?: string
) => {
  if (!label && !helperText) {
    return <>{inputNode}</>;
  }

  let helperColor = 'var(--ant-color-text-secondary, #64748b)';
  if (status === 'error') {
    helperColor = '#ef4444';
  } else if (status === 'warning') {
    helperColor = '#f59e0b';
  }

  return (
    <div
      className={`app-input-container ${containerClassName || ''}`}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', ...containerStyle }}
    >
      {label && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ant-color-text, #1e293b)',
            }}
          >
            {label}
            {required && (
              <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>
            )}
          </span>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined
                style={{ color: '#94a3b8', cursor: 'help', fontSize: 13 }}
              />
            </Tooltip>
          )}
        </div>
      )}

      {inputNode}

      {helperText && (
        <div
          style={{
            fontSize: 12,
            marginTop: 4,
            color: helperColor,
            lineHeight: 1.4,
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

/**
 * Enterprise Reusable AppInput Component
 *
 * Enhanced version of Ant Design Input with:
 * - Built-in Top Label with required indicator (*)
 * - Bottom HelperText / Error feedback with status-aware coloring
 * - Built-in Info Tooltip icon
 * - Async Loading spinner in suffix
 * - Forwarded ref for focus/blur management
 * - Full Dark Mode & ConfigProvider token compatibility
 */
export const AppInput = forwardRef<InputRef, AppInputProps>(
  (
    {
      label,
      required = false,
      helperText,
      tooltip,
      loading = false,
      clearable,
      allowClear,
      suffix,
      status,
      containerStyle,
      containerClassName,
      style,
      ...restProps
    },
    ref
  ) => {
    // Resolve allowClear
    const resolvedAllowClear = clearable !== undefined ? clearable : allowClear;

    // Resolve suffix with optional loading spinner or tooltip
    let resolvedSuffix = suffix;
    if (loading) {
      const loader = (
        <LoadingOutlined
          spin
          style={{ color: 'var(--primary-color, #1677ff)' }}
        />
      );
      resolvedSuffix = suffix ? (
        <Space size={6}>
          {suffix}
          {loader}
        </Space>
      ) : (
        loader
      );
    } else if (tooltip && !label) {
      const tooltipIcon = (
        <Tooltip title={tooltip}>
          <InfoCircleOutlined
            style={{ color: '#94a3b8', cursor: 'help', fontSize: 13 }}
          />
        </Tooltip>
      );
      resolvedSuffix = suffix ? (
        <Space size={6}>
          {suffix}
          {tooltipIcon}
        </Space>
      ) : (
        tooltipIcon
      );
    }

    const inputElement = (
      <Input
        ref={ref}
        status={status}
        allowClear={resolvedAllowClear}
        suffix={resolvedSuffix}
        style={style}
        {...restProps}
      />
    );

    return renderInputWrapper(
      inputElement,
      label,
      required,
      tooltip,
      helperText,
      status as any,
      containerStyle,
      containerClassName
    );
  }
) as AppInputComponent;

// AppInput.Password with label & helper wrapper
const AppInputPassword = forwardRef<InputRef, AppInputPasswordProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      status,
      containerStyle,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return renderInputWrapper(
      <Input.Password ref={ref} status={status} {...props} />,
      label,
      required,
      tooltip,
      helperText,
      status as any,
      containerStyle,
      containerClassName
    );
  }
);

// AppInput.TextArea with label & helper wrapper
const AppInputTextArea = forwardRef<any, AppInputTextAreaProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      status,
      containerStyle,
      containerClassName,
      rows = 3,
      style,
      ...props
    },
    ref
  ) => {
    return renderInputWrapper(
      <Input.TextArea
        ref={ref}
        rows={rows}
        status={status}
        style={{ width: '100%', ...style }}
        {...props}
      />,
      label,
      required,
      tooltip,
      helperText,
      status as any,
      containerStyle,
      containerClassName
    );
  }
);

// AppInput.Search with label & helper wrapper
const AppInputSearch = forwardRef<InputRef, AppInputSearchProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      status,
      containerStyle,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return renderInputWrapper(
      <Input.Search ref={ref} status={status} {...props} />,
      label,
      required,
      tooltip,
      helperText,
      status as any,
      containerStyle,
      containerClassName
    );
  }
);

// AppInput.OTP with label & helper wrapper
const AppInputOTP = forwardRef<any, AppInputOTPProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      status,
      containerStyle,
      containerClassName,
      style,
      ...props
    },
    ref
  ) => {
    return renderInputWrapper(
      <Input.OTP ref={ref} status={status} style={style} {...props} />,
      label,
      required,
      tooltip,
      helperText,
      status as any,
      containerStyle,
      containerClassName
    );
  }
);

AppInput.Password = AppInputPassword as any;
AppInput.TextArea = AppInputTextArea as any;
AppInput.Search = AppInputSearch as any;
AppInput.OTP = AppInputOTP as any;
AppInput.Group = Input.Group;

export default AppInput;
