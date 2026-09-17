import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import { store } from './app/store';
import AppRoutes from './routes/AppRoutes';
import ThemeCustomizerTrigger from './components/customization/ThemeCustomizerTrigger';
import ThemeCustomizationDrawer from './components/customization/ThemeCustomizationDrawer';
import { selectCustomization } from './features/customization/customizationSlice';
import { ThemeProvider } from './context/ThemeContext';
import { setGlobalMessageApi } from './utils/antdMessage';
import './styles/index.css';
import './styles/Customizer.css';

const MainAppContent: React.FC = () => {
  const customization = useSelector(selectCustomization);
  const {
    mode,
    presetColor,
    fontFamily,
    fontSize,
    inputStyle = 'normal',
    inputBackground = 'default',
    inputSize = 'large',
    inputBorderRadius = 10,
    themeWidth,
    rtl,
  } = customization;

  const getControlHeight = (size: string): number => {
    if (size === 'small') return 34;
    if (size === 'middle') return 40;
    return 48;
  };

  const inputControlHeight = getControlHeight(inputSize);

  const [systemIsDark, setSystemIsDark] = useState<boolean>(
    () => Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const isDarkMode = mode === 'dark' || (mode === 'system' && systemIsDark);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', presetColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--input-border-radius', `${inputBorderRadius}px`);
    document.documentElement.style.setProperty('--input-height', `${inputControlHeight}px`);

    document.body.classList.remove(
      'input-style-normal',
      'input-style-outlined',
      'input-style-underlined',
      'input-bg-default',
      'input-bg-filled',
      'input-bg-glass',
      'input-style-glass',
      'input-style-filled',
      'input-size-small',
      'input-size-middle',
      'input-size-large'
    );
    document.body.classList.add(`input-style-${inputStyle || 'normal'}`);
    document.body.classList.add(`input-bg-${inputBackground || 'default'}`);
    document.body.classList.add(`input-size-${inputSize || 'large'}`);

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [presetColor, fontFamily, fontSize, inputBorderRadius, inputStyle, inputBackground, inputSize, isDarkMode, inputControlHeight]);

  const dynamicTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: presetColor,
      colorPrimaryHover: presetColor,
      colorLink: presetColor,
      colorBgBase: isDarkMode ? '#0b1720' : '#ffffff',
      colorBgContainer: isDarkMode ? '#111d27' : '#ffffff',
      colorBgElevated: isDarkMode ? '#172633' : '#ffffff',
      colorTextBase: isDarkMode ? '#f8fafc' : '#0f172a',
      colorTextHeading: isDarkMode ? '#ffffff' : '#0f172a',
      colorTextSecondary: isDarkMode ? '#94a3b8' : '#475569',
      colorBorder: isDarkMode ? '#23384a' : '#e2e8f0',
      colorSplit: isDarkMode ? '#1f2e3d' : '#e2e8f0',
      borderRadius: 12,
      fontFamily: fontFamily,
      fontSize: fontSize,
      controlHeight: inputControlHeight,
    },
    components: {
      Button: {
        colorPrimary: presetColor,
        borderRadius: 10,
        fontWeight: 600,
        controlHeight: inputControlHeight,
      },
      Input: {
        borderRadius: inputBorderRadius,
        borderRadiusLG: inputBorderRadius,
        borderRadiusSM: inputBorderRadius,
        controlHeight: inputControlHeight,
        colorBgContainer: isDarkMode
          ? inputBackground === 'filled'
            ? '#1a2936'
            : '#0d1822'
          : inputBackground === 'filled'
            ? '#f1f5f9'
            : '#fafafa',
        colorBorder: isDarkMode ? '#283c4d' : '#e2e8f0',
        activeBorderColor: presetColor,
        hoverBorderColor: presetColor,
      },
      Card: {
        borderRadius: 16,
        colorBgContainer: isDarkMode ? '#111d27' : '#ffffff',
      },
      Checkbox: {
        colorPrimary: presetColor,
      },
    },
  };

  const AntdAppHelper: React.FC = () => {
    const { message } = AntdApp.useApp();
    useEffect(() => {
      setGlobalMessageApi(message);
    }, [message]);
    return null;
  };

  return (
    <ConfigProvider theme={dynamicTheme} direction={rtl ? 'rtl' : 'ltr'}>
      <AntdApp>
        <AntdAppHelper />
        <div className={themeWidth === 'boxed' ? 'theme-boxed-container' : 'theme-fluid-container'}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <ThemeCustomizerTrigger />
          <ThemeCustomizationDrawer />
        </div>
      </AntdApp>
    </ConfigProvider>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainAppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
