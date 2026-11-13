import React, { forwardRef, useState, useRef, useEffect } from 'react';
import {
  Input,
  Tooltip,
  Space,
  AutoComplete,
  Select,
  InputNumber,
  ColorPicker,
  DatePicker,
  TimePicker,
  Progress,
  Tag,
  Button,
} from 'antd';
import type {
  InputProps,
  InputRef,
  InputNumberProps,
  DatePickerProps,
  TimePickerProps,
} from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { SearchProps } from 'antd/es/input';
import type { OTPProps } from 'antd/es/input/OTP';
import {
  LoadingOutlined,
  InfoCircleOutlined,
  CheckCircleFilled,
  CloseCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  InboxOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  DeleteOutlined,
  CopyOutlined,
  CheckOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  NumberOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import { FileInput } from './FileInput';
import type { FileInputProps as AppInputFileProps, AppUploadedFile } from './FileInput';
import { SelectInput } from './SelectInput';
import type { SelectInputProps } from './SelectInput';

export type { AppInputFileProps, AppUploadedFile, SelectInputProps };

// ============================================================================
// Core Interfaces
// ============================================================================

export interface AppInputProps extends InputProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  loading?: boolean;
  clearable?: boolean;
  containerStyle?: React.CSSProperties;
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

// ============================================================================
// Specialized Input Interfaces
// ============================================================================

export interface AppInputEmailProps extends Omit<InputProps, 'onChange'> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  domains?: string[];
  strict?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValidChange?: (isValid: boolean) => void;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface CountryOption {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
  format: string;
}

export const DEFAULT_COUNTRY_OPTIONS: CountryOption[] = [
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳', format: '##### #####' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸', format: '(###) ###-####' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧', format: '#### ######' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪', format: '## ### ####' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬', format: '#### ####' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺', format: '### ### ###' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦', format: '(###) ###-####' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪', format: '### #######' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷', format: '# ## ## ## ##' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵', format: '## #### ####' },
];

export interface AppInputPhoneProps extends Omit<InputProps, 'onChange'> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  countryCode?: string;
  defaultCountryCode?: string;
  onCountryCodeChange?: (countryCode: string) => void;
  countries?: CountryOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (fullNumber: string, localNumber: string, dialCode: string) => void;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}


export interface AppInputNumberProps extends InputNumberProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  unit?: string;
  showLimitsBadge?: boolean;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputColorProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (hexColor: string) => void;
  presets?: { label: string; colors: string[] }[];
  showText?: boolean;
  allowCopy?: boolean;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputDateProps extends DatePickerProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export interface AppInputTimeProps extends TimePickerProps {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

// ============================================================================
// Compound Component Type Definition
// ============================================================================

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
  Email: React.ForwardRefExoticComponent<
    AppInputEmailProps & React.RefAttributes<any>
  >;
  Phone: React.ForwardRefExoticComponent<
    AppInputPhoneProps & React.RefAttributes<InputRef>
  >;
  File: React.FC<AppInputFileProps>;
  Select: React.ForwardRefExoticComponent<any>;
  Number: React.ForwardRefExoticComponent<
    AppInputNumberProps & React.RefAttributes<any>
  >;
  Color: React.FC<AppInputColorProps>;
  Date: React.FC<AppInputDateProps>;
  Time: React.FC<AppInputTimeProps>;
  Group: typeof Input.Group;
}

// ============================================================================
// Shared Wrapper
// ============================================================================

export const renderInputWrapper = (
  inputNode: React.ReactNode,
  label?: React.ReactNode,
  required?: boolean,
  tooltip?: React.ReactNode,
  helperText?: React.ReactNode,
  status?: '' | 'error' | 'warning' | 'success',
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
  } else if (status === 'success') {
    helperColor = '#10b981';
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

// ============================================================================
// 1. AppInput (Base)
// ============================================================================

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
    const resolvedAllowClear = clearable !== undefined ? clearable : allowClear;

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

// ============================================================================
// 2. AppInput.Password
// ============================================================================

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

// ============================================================================
// 3. AppInput.TextArea
// ============================================================================

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

// ============================================================================
// 4. AppInput.Search
// ============================================================================

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

// ============================================================================
// 5. AppInput.OTP
// ============================================================================

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

// ============================================================================
// 6. AppInput.Email (Strict RFC Validation + AutoComplete Domain Suggestions)
// ============================================================================

const DEFAULT_EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'proton.me',
  'enterprise.io',
];

const EMAIL_RFC_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AppInputEmail = forwardRef<any, AppInputEmailProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      domains = DEFAULT_EMAIL_DOMAINS,
      strict = true,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onValidChange,
      status,
      containerStyle,
      containerClassName,
      placeholder = 'e.g. alexander.smith@domain.com',
      ...restProps
    },
    ref
  ) => {
    const [innerValue, setInnerValue] = useState<string>(defaultValue);
    const [touched, setTouched] = useState<boolean>(false);
    const value = controlledValue !== undefined ? controlledValue : innerValue;

    const isValid = value.trim() ? EMAIL_RFC_REGEX.test(value.trim()) : false;
    const hasError = strict && touched && value.trim().length > 0 && !isValid;

    useEffect(() => {
      onValidChange?.(isValid);
    }, [isValid, onValidChange]);

    // Generate AutoComplete Domain Suggestions
    const getOptions = () => {
      if (!value || value.includes(' ')) return [];
      const parts = value.split('@');
      const prefix = parts[0];
      const domainPart = parts[1] || '';

      if (!prefix) return [];

      return domains
        .filter((d) => d.toLowerCase().startsWith(domainPart.toLowerCase()))
        .map((d) => ({
          value: `${prefix}@${d}`,
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                <span style={{ fontWeight: 600 }}>{prefix}</span>@{d}
              </span>
              <Tag color="blue" style={{ fontSize: 10, margin: 0 }}>domain</Tag>
            </div>
          ),
        }));
    };

    const handleChange = (data: string) => {
      // Disallow spaces
      const sanitized = data.replace(/\s/g, '');
      if (controlledValue === undefined) {
        setInnerValue(sanitized);
      }
      onChange?.(sanitized);
    };

    const resolvedStatus = status || (hasError ? 'error' : isValid ? 'success' : undefined);
    const resolvedHelper = hasError
      ? 'Please enter a valid email address (e.g. name@domain.com)'
      : isValid
        ? 'Valid email address format verified.'
        : helperText;

    const suffixIcon = isValid ? (
      <CheckCircleFilled style={{ color: '#10b981', fontSize: 14 }} />
    ) : hasError ? (
      <CloseCircleOutlined style={{ color: '#ef4444', fontSize: 14 }} />
    ) : null;

    const inputNode = (
      <AutoComplete
        options={getOptions()}
        value={value}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        <Input
          ref={ref}
          type="email"
          status={resolvedStatus as any}
          placeholder={placeholder}
          prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
          suffix={suffixIcon}
          onBlur={() => setTouched(true)}
          allowClear
          {...restProps}
        />
      </AutoComplete>
    );

    return renderInputWrapper(
      inputNode,
      label,
      required,
      tooltip,
      resolvedHelper,
      resolvedStatus as any,
      containerStyle,
      containerClassName
    );
  }
);

// ============================================================================
// 7. AppInput.Phone (Country Code Selector + Digits Masking)
// ============================================================================

const AppInputPhone = forwardRef<InputRef, AppInputPhoneProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      countryCode: controlledCountryCode,
      defaultCountryCode = '+91',
      onCountryCodeChange,
      countries = DEFAULT_COUNTRY_OPTIONS,
      value: controlledValue,
      defaultValue = '',
      onChange,
      status,
      containerStyle,
      containerClassName,
      placeholder = 'Enter mobile number',
      ...restProps
    },
    ref
  ) => {
    const [selectedCode, setSelectedCode] = useState<string>(defaultCountryCode);
    const [innerNumber, setInnerNumber] = useState<string>(defaultValue);

    const dialCode = controlledCountryCode !== undefined ? controlledCountryCode : selectedCode;
    const number = controlledValue !== undefined ? controlledValue : innerNumber;

    const activeCountry = countries.find((c) => c.dialCode === dialCode) || countries[0];

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Keep only digits, dashes, and spaces
      const raw = e.target.value.replace(/[^0-9]/g, '');
      if (controlledValue === undefined) {
        setInnerNumber(raw);
      }
      onChange?.(`${dialCode} ${raw}`, raw, dialCode);
    };

    const handleCountryChange = (code: string) => {
      if (controlledCountryCode === undefined) {
        setSelectedCode(code);
      }
      onCountryCodeChange?.(code);
      onChange?.(`${code} ${number}`, number, code);
    };

    const isComplete = number.replace(/[^0-9]/g, '').length >= 10;

    const countrySelect = (
      <Select
        value={dialCode}
        onChange={handleCountryChange}
        popupMatchSelectWidth={false}
        style={{ width: 105 }}
        dropdownStyle={{ minWidth: 260 }}
      >
        {countries.map((c) => (
          <Select.Option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
            <span style={{ marginRight: 6 }}>{c.flag}</span>
            <span>{c.dialCode}</span>
          </Select.Option>
        ))}
      </Select>
    );

    const inputNode = (
      <Input
        ref={ref}
        type="tel"
        addonBefore={countrySelect}
        prefix={<PhoneOutlined style={{ color: '#94a3b8' }} />}
        placeholder={placeholder}
        value={number}
        onChange={handleNumberChange}
        maxLength={15}
        allowClear
        status={status}
        suffix={
          isComplete ? (
            <CheckCircleFilled style={{ color: '#10b981', fontSize: 14 }} />
          ) : undefined
        }
        {...restProps}
      />
    );

    return renderInputWrapper(
      inputNode,
      label,
      required,
      tooltip,
      helperText || `Format: ${activeCountry.name} (${activeCountry.dialCode})`,
      status as any,
      containerStyle,
      containerClassName
    );
  }
);

// ============================================================================
// 8. AppInput.Number (Min, Max, Step, Currency & Unit)
// ============================================================================

const AppInputNumber = forwardRef<any, AppInputNumberProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      unit,
      min,
      max,
      step = 1,
      showLimitsBadge = true,
      status,
      containerStyle,
      containerClassName,
      style,
      ...props
    },
    ref
  ) => {
    const limitsBadge = showLimitsBadge && (min !== undefined || max !== undefined) ? (
      <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>
        Limits: [{min ?? '-∞'} to {max ?? '+∞'}, step {step}]
      </span>
    ) : null;

    const customLabel = label ? (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <span>{label}</span>
        {limitsBadge}
      </div>
    ) : null;

    const inputNode = (
      <InputNumber
        ref={ref}
        min={min}
        max={max}
        step={step}
        status={status}
        addonAfter={unit}
        style={{ width: '100%', ...style }}
        {...props}
      />
    );

    return renderInputWrapper(
      inputNode,
      customLabel,
      required,
      tooltip,
      helperText,
      status as any,
      containerStyle,
      containerClassName
    );
  }
);

// ============================================================================
// 10. AppInput.Color (Hex Display, Preset Swatches & Live Picker)
// ============================================================================

const DEFAULT_COLOR_PRESETS = [
  {
    label: 'Modern Enterprise Palette',
    colors: [
      '#1677ff', // Brand Primary
      '#10b981', // Emerald Success
      '#8b5cf6', // Violet Purple
      '#f59e0b', // Sunset Amber
      '#ef4444', // Crimson Alert
      '#06b6d4', // Ocean Cyan
      '#1e293b', // Deep Slate
    ],
  },
];

const AppInputColor: React.FC<AppInputColorProps> = ({
  label,
  required,
  helperText,
  tooltip,
  value: controlledValue,
  defaultValue = '#1677ff',
  onChange,
  presets = DEFAULT_COLOR_PRESETS,
  showText = true,
  allowCopy = true,
  containerStyle,
  containerClassName,
}) => {
  const [innerColor, setInnerColor] = useState<string>(defaultValue);
  const [copied, setCopied] = useState<boolean>(false);

  const hexColor = controlledValue !== undefined ? controlledValue : innerColor;

  const handleColorChange = (_: any, hex: string) => {
    if (controlledValue === undefined) {
      setInnerColor(hex);
    }
    onChange?.(hex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputNode = (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ColorPicker
          value={hexColor}
          onChange={handleColorChange}
          showText={false}
          size="large"
        />
        <Input
          value={hexColor}
          onChange={(e) => handleColorChange(null, e.target.value)}
          prefix={<BgColorsOutlined style={{ color: hexColor }} />}
          suffix={
            allowCopy ? (
              <Button
                type="text"
                size="small"
                icon={copied ? <CheckOutlined style={{ color: '#10b981' }} /> : <CopyOutlined />}
                onClick={handleCopy}
                style={{ padding: '0 4px', height: 24 }}
                title="Copy color hex"
              />
            ) : undefined
          }
          style={{ fontFamily: 'monospace', fontWeight: 600, flex: 1 }}
        />
      </div>

      {/* Preset Swatches */}
      {presets && presets.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>Presets:</span>
          {presets[0].colors.map((c) => (
            <div
              key={c}
              onClick={() => handleColorChange(null, c)}
              title={c}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                backgroundColor: c,
                cursor: 'pointer',
                border: hexColor.toLowerCase() === c.toLowerCase() ? '2px solid #000000' : '1px solid rgba(0,0,0,0.15)',
                boxShadow: hexColor.toLowerCase() === c.toLowerCase() ? '0 0 0 2px var(--primary-color, #1677ff)' : undefined,
                transition: 'transform 0.15s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  return renderInputWrapper(
    inputNode,
    label,
    required,
    tooltip,
    helperText,
    undefined,
    containerStyle,
    containerClassName
  );
};

// ============================================================================
// 11. AppInput.Date & AppInput.Time
// ============================================================================

const AppInputDate: React.FC<AppInputDateProps> = ({
  label,
  required,
  helperText,
  tooltip,
  status,
  containerStyle,
  containerClassName,
  style,
  ...props
}) => {
  return renderInputWrapper(
    <DatePicker status={status} style={{ width: '100%', ...style }} {...props} />,
    label,
    required,
    tooltip,
    helperText,
    status as any,
    containerStyle,
    containerClassName
  );
};

const AppInputTime: React.FC<AppInputTimeProps> = ({
  label,
  required,
  helperText,
  tooltip,
  status,
  containerStyle,
  containerClassName,
  style,
  ...props
}) => {
  return renderInputWrapper(
    <TimePicker status={status} style={{ width: '100%', ...style }} {...props} />,
    label,
    required,
    tooltip,
    helperText,
    status as any,
    containerStyle,
    containerClassName
  );
};

// ============================================================================
// Attach Compound Subcomponents
// ============================================================================

AppInput.Password = AppInputPassword as any;
AppInput.TextArea = AppInputTextArea as any;
AppInput.Search = AppInputSearch as any;
AppInput.OTP = AppInputOTP as any;
AppInput.Email = AppInputEmail as any;
AppInput.Phone = AppInputPhone as any;
AppInput.File = FileInput as any;
AppInput.Select = SelectInput as any;
AppInput.Number = AppInputNumber as any;
AppInput.Color = AppInputColor as any;
AppInput.Date = AppInputDate as any;
AppInput.Time = AppInputTime as any;
AppInput.Group = Input.Group;

export default AppInput;
