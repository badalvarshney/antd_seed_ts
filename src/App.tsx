import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ConfigProvider, App as AntdApp, theme } from 'antd';
import { store } from './app/store';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
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
    inputSize = 'middle',
    inputBorderRadius = 10,
    buttonBorderRadius = 10,
    errorStyle = 'text',
    themeWidth,
    rtl,
  } = customization;

  const getControlHeight = (size: string): number => {
    if (size === 'small') return 34;
    if (size === 'middle') return 40;
    if (size === 'large') return 44;
    if (size === 'xlarge') return 48;
    return 40;
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
    document.documentElement.style.setProperty('--button-border-radius', `${buttonBorderRadius}px`);
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
      'input-size-large',
      'input-size-xlarge',
      'error-style-text',
      'error-style-highlight'
    );
    document.body.classList.add(`input-style-${inputStyle || 'normal'}`);
    document.body.classList.add(`input-bg-${inputBackground || 'default'}`);
    document.body.classList.add(`input-size-${inputSize || 'middle'}`);
    document.body.classList.add(`error-style-${errorStyle || 'text'}`);

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [presetColor, fontFamily, fontSize, inputBorderRadius, buttonBorderRadius, inputStyle, inputBackground, inputSize, errorStyle, isDarkMode, inputControlHeight]);

  const dynamicTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      motion: true,
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
      controlHeightLG: inputControlHeight,
      controlHeightSM: inputControlHeight,
    },
    components: {
      Form: {
        verticalLabelPadding: '0 0 6px 0',
        verticalLabelMargin: '0 0 0 0',
        itemMarginBottom: 18,
      },
      Button: {
        colorPrimary: presetColor,
        borderRadius: buttonBorderRadius,
        borderRadiusLG: buttonBorderRadius,
        borderRadiusSM: buttonBorderRadius,
        fontWeight: 600,
        controlHeight: inputControlHeight,
        controlHeightLG: inputControlHeight,
        controlHeightSM: inputControlHeight,
      },
      Input: {
        borderRadius: inputBorderRadius,
        borderRadiusLG: inputBorderRadius,
        borderRadiusSM: inputBorderRadius,
        controlHeight: inputControlHeight,
        controlHeightLG: inputControlHeight,
        controlHeightSM: inputControlHeight,
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
    <ConfigProvider componentSize={inputSize === 'xlarge' ? 'large' : (inputSize as any)} theme={dynamicTheme} direction={rtl ? 'rtl' : 'ltr'}>
      <AntdApp>
        <AntdAppHelper />
        <div className={themeWidth === 'boxed' ? 'theme-boxed-container' : 'theme-fluid-container'}>
          <BrowserRouter>
            <ScrollToTop />
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
