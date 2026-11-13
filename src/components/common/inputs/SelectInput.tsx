import React, { forwardRef } from 'react';
import { Select } from 'antd';
import type { SelectProps, RefSelectProps } from 'antd';
import type { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import { renderInputWrapper } from './AppInput';

export interface SelectInputProps<
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
> extends SelectProps<ValueType, OptionType> {
  /**
   * Field label displayed above the select box
   */
  label?: React.ReactNode;

  /**
   * Required field indicator (*)
   */
  required?: boolean;

  /**
   * Helper text or validation message displayed below
   */
  helperText?: React.ReactNode;

  /**
   * Informative tooltip icon next to the label
   */
  tooltip?: React.ReactNode;

  /**
   * Optional prefix icon displayed inside or before the select box
   */
  prefixIcon?: React.ReactNode;

  /**
   * Outer container style
   */
  containerStyle?: React.CSSProperties;

  /**
   * Outer container class name
   */
  containerClassName?: string;
}

/**
 * Enterprise Reusable Select Box & Multi-Select Component
 *
 * Supports:
 * - Single select mode (standard dropdown)
 * - Multiple select mode (`mode="multiple"`) with tag badges & responsive wrapping
 * - Tags mode (`mode="tags"`) for user-created custom tokens
 * - Search & case-insensitive filtering
 * - Prefix icon support
 * - Option groups & rich option templates
 * - Clearable (`allowClear`) and loading states
 * - Label, required asterisk, and status-aware helper text
 */
export const SelectInput = forwardRef<RefSelectProps, SelectInputProps>(
  (
    {
      label,
      required,
      helperText,
      tooltip,
      prefixIcon,
      mode,
      maxTagCount = 'responsive',
      showSearch = true,
      allowClear = true,
      status,
      style,
      containerStyle,
      containerClassName,
      placeholder = 'Select an option',
      filterOption = (input, option) => {
        const text = option?.label ? String(option.label) : String(option?.value || '');
        return text.toLowerCase().includes(input.toLowerCase());
      },
      ...restProps
    },
    ref
  ) => {
    const selectNode = (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
        {prefixIcon && (
          <span
            style={{
              position: 'absolute',
              left: 11,
              zIndex: 2,
              pointerEvents: 'none',
              color: 'var(--ant-color-text-tertiary, #94a3b8)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {prefixIcon}
          </span>
        )}
        <Select
          ref={ref}
          mode={mode}
          maxTagCount={maxTagCount}
          showSearch={showSearch}
          allowClear={allowClear}
          status={status}
          placeholder={placeholder}
          filterOption={filterOption}
          style={{
            width: '100%',
            paddingLeft: prefixIcon ? 20 : 0,
            ...style,
          }}
          {...restProps}
        />
      </div>
    );

    return renderInputWrapper(
      selectNode,
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

export default SelectInput;
