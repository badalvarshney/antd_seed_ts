import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

export interface AppButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

/**
 * Dedicated Master Reusable AppButton component
 * Integrates seamlessly with Ant Design ConfigProvider tokens & Theme Customizer.
 */
export const AppButton: React.FC<AppButtonProps> = ({
  children,
  type = 'primary',
  style,
  className,
  ...props
}) => {
  return (
    <Button
      type={type}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
