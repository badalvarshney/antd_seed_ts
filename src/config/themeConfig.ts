/**
 * ==============================================================================
 * GLOBAL APP THEME & CUSTOMIZATION DEFAULT CONFIGURATION
 * ==============================================================================
 */

export type ThemeMode = 'light' | 'dark' | 'system';
export type InputStyle = 'normal' | 'outlined' | 'underlined';
export type InputBackground = 'default' | 'filled' | 'glass';
export type InputSize = 'small' | 'middle' | 'large';
export type ThemeWidth = 'fluid' | 'boxed';
export type AuthLayout = 'split' | 'minimal' | 'full-split' | 'glass';
export type AuthSplitRatio = '50-50' | '70-30' | '30-70';

export interface ThemeConfig {
  mode: ThemeMode;
  presetColor: string;
  fontFamily: string;
  fontSize: number;
  inputStyle: InputStyle;
  inputBackground: InputBackground;
  inputSize: InputSize;
  themeWidth: ThemeWidth;
  rtl: boolean;
  authLayout: AuthLayout;
  authSplitRatio: AuthSplitRatio;
  minPasswordLength: number;
  inputBorderRadius: number;
}

export interface ColorPreset {
  name: string;
  primary: string;
  hover: string;
}

export interface FontOption {
  label: string;
  value: string;
}

export interface AuthLayoutOption {
  id: AuthLayout;
  name: string;
  subtitle: string;
}

export interface AuthSplitRatioOption {
  id: AuthSplitRatio;
  name: string;
  subtitle: string;
}

export interface InputStyleOption {
  id: InputStyle;
  name: string;
  subtitle: string;
}

export interface InputBackgroundOption {
  id: InputBackground;
  name: string;
  subtitle: string;
}

export interface InputSizeOption {
  id: InputSize;
  name: string;
  subtitle: string;
}

export interface InputShapeOption {
  id: string;
  name: string;
  radius: number;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  mode: 'light',
  presetColor: '#3f51b5',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 14,
  inputStyle: 'normal',
  inputBackground: 'default',
  inputSize: 'large',
  themeWidth: 'fluid',
  rtl: false,
  authLayout: 'split',
  authSplitRatio: '50-50',
  minPasswordLength: 6,
  inputBorderRadius: 10,
};

export const MIN_PASSWORD_LENGTH: number = DEFAULT_THEME_CONFIG.minPasswordLength;

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Indigo Blue', primary: '#3f51b5', hover: '#303f9f' },
  { name: 'Indigo Purple', primary: '#673ab7', hover: '#5e35b1' },
  { name: 'Teal Cyan', primary: '#00bfa5', hover: '#009688' },
  { name: 'Rose Pink', primary: '#ec407a', hover: '#d81b60' },
  { name: 'Amber Orange', primary: '#ffa726', hover: '#fb8c00' },
  { name: 'Dark Teal', primary: '#00897b', hover: '#00695c' },
  { name: 'Mint Green', primary: '#26a69a', hover: '#00897b' },
  { name: 'Ocean Blue', primary: '#2196f3', hover: '#1e88e5' },
];

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Plus Jakarta Sans (Default)', value: "'Plus Jakarta Sans', sans-serif" },
  { label: 'Inter', value: "'Inter', sans-serif" },
  { label: 'Roboto', value: "'Roboto', sans-serif" },
  { label: 'Outfit', value: "'Outfit', sans-serif" },
  { label: 'System Default', value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
];

export const AUTH_LAYOUT_OPTIONS: AuthLayoutOption[] = [
  { id: 'split', name: 'Variant 1: Split Card', subtitle: 'Centered card with left hero canvas' },
  { id: 'minimal', name: 'Variant 2: Minimal Card', subtitle: 'Clean centered card with top logo' },
  { id: 'glass', name: 'Variant 3: Glass Aurora', subtitle: 'Frosted glass floating canvas' },
  { id: 'full-split', name: 'Variant 4: Full Split', subtitle: 'Full height side-by-side screen split' },
];

export const AUTH_SPLIT_RATIO_OPTIONS: AuthSplitRatioOption[] = [
  { id: '50-50', name: '50 / 50', subtitle: 'Equal Split' },
  { id: '70-30', name: '70 / 30', subtitle: '70% Hero / 30% Form' },
  { id: '30-70', name: '30 / 70', subtitle: '30% Hero / 70% Form' },
];

export const INPUT_STYLE_OPTIONS: InputStyleOption[] = [
  { id: 'normal', name: 'Normal', subtitle: 'Standard label on top' },
  { id: 'outlined', name: 'Outlined', subtitle: 'Label on input border' },
  { id: 'underlined', name: 'Underline', subtitle: 'Bottom line only' },
];

export const INPUT_BACKGROUND_OPTIONS: InputBackgroundOption[] = [
  { id: 'default', name: 'Default', subtitle: 'Standard background' },
  { id: 'filled', name: 'Filled', subtitle: 'Soft tinted fill' },
  { id: 'glass', name: 'Glass', subtitle: 'Ambient glass look' },
];

export const INPUT_SIZE_OPTIONS: InputSizeOption[] = [
  { id: 'small', name: 'Small (34px)', subtitle: 'Compact' },
  { id: 'middle', name: 'Middle (40px)', subtitle: 'Standard' },
  { id: 'large', name: 'Large (48px)', subtitle: 'Spacious' },
];

export const INPUT_SHAPE_OPTIONS: InputShapeOption[] = [
  { id: 'standard', name: 'Standard (10px)', radius: 10 },
  { id: 'pill', name: 'Pill (Full Rounded)', radius: 50 },
  { id: 'smooth', name: 'Smooth (6px)', radius: 6 },
  { id: 'sharp', name: 'Sharp (0px)', radius: 0 },
];

export default DEFAULT_THEME_CONFIG;
