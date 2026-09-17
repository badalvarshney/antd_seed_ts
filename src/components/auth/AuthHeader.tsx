import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCustomization } from '../../features/customization/customizationSlice';

const { Title, Text } = Typography;

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkTo?: string;
  linkLabel?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  linkText,
  linkTo,
  linkLabel,
}) => {
  const { presetColor } = useSelector(selectCustomization);

  return (
    <div style={{ marginBottom: 14, textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.5px' }}>
            {title}
          </Title>
          {subtitle && (
            <Text type="secondary" style={{ fontSize: 14, marginTop: 4, display: 'block' }}>
              {subtitle}
            </Text>
          )}
        </div>
        {linkTo && linkText && (
          <Text style={{ fontSize: 13.5 }}>
            {linkLabel}{' '}
            <Link to={linkTo} style={{ fontWeight: 700, color: presetColor }}>
              {linkText}
            </Link>
          </Text>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;
