import React, { createContext, useContext, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomization, type CustomizationState } from '../features/customization/customizationSlice';
import DEFAULT_THEME_CONFIG, { COLOR_PRESETS, FONT_OPTIONS, type ColorPreset, type FontOption } from '../config/themeConfig';

export interface ThemeContextValue extends CustomizationState {
  colorPresets: ColorPreset[];
  fontOptions: FontOption[];
}

const defaultValue: ThemeContextValue = {
  ...DEFAULT_THEME_CONFIG,
  drawerOpen: false,
  colorPresets: COLOR_PRESETS,
  fontOptions: FONT_OPTIONS,
};

export const ThemeContext = createContext<ThemeContextValue>(defaultValue);

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const customization = useSelector(selectCustomization);

  const value: ThemeContextValue = {
    ...DEFAULT_THEME_CONFIG,
    ...customization,
    colorPresets: COLOR_PRESETS,
    fontOptions: FONT_OPTIONS,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to consume theme settings anywhere in the app
 * Usage: const { mode, presetColor, fontFamily } = useTheme();
 */
export const useTheme = (): ThemeContextValue => useContext(ThemeContext);

export default ThemeContext;
