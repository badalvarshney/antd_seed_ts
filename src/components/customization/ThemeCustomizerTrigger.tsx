import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer, selectCustomization } from '../../features/customization/customizationSlice';
import { adjustColor, hexToRgba } from '../../utils/colorUtils';

export const ThemeCustomizerTrigger: React.FC = () => {
  const dispatch = useDispatch();
  const { presetColor } = useSelector(selectCustomization);

  const dynamicBg = `radial-gradient(circle at 30% 30%, ${adjustColor(presetColor, 25)} 0%, ${presetColor} 100%)`;
  const dynamicGlow = `-4px 0 20px ${hexToRgba(presetColor, 0.6)}, 0 0 15px ${hexToRgba(presetColor, 0.4)}`;

  return (
    <div
      className="theme-customizer-trigger"
      onClick={() => dispatch(toggleDrawer())}
      title="Theme Customization"
      style={{
        background: dynamicBg,
        boxShadow: dynamicGlow,
      }}
    >
      <SettingOutlined className="theme-customizer-gear-icon" />
    </div>
  );
};

export default ThemeCustomizerTrigger;
