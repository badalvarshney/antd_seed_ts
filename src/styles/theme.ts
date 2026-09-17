import type { ThemeConfig } from 'antd';

// Ant Design Custom Theme Tokens matching Cloud Dashboard Aesthetics
export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#673ab7', // Cloud Purple
    colorPrimaryHover: '#5e35b1',
    colorPrimaryActive: '#4527a0',
    colorLink: '#673ab7',
    colorLinkHover: '#5e35b1',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorTextBase: '#1e293b',
    colorTextHeading: '#0f172a',
    colorTextSecondary: '#64748b',
    colorBorder: '#e2e8f0',
    borderRadius: 12,
    fontSize: 14,
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    controlHeight: 44,
    boxShadow: '0 10px 25px -5px rgba(103, 58, 183, 0.08), 0 8px 10px -6px rgba(103, 58, 183, 0.04)',
  },
  components: {
    Button: {
      colorPrimary: '#673ab7',
      colorPrimaryHover: '#5e35b1',
      colorPrimaryActive: '#4527a0',
      borderRadius: 10,
      fontWeight: 600,
      controlHeight: 46,
    },
    Input: {
      borderRadius: 10,
      controlHeight: 46,
      paddingInline: 16,
      colorBgContainer: '#fafafa',
      activeBorderColor: '#673ab7',
      hoverBorderColor: '#b39ddb',
    },
    Card: {
      borderRadius: 16,
      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
      paddingLG: 32,
    },
    Checkbox: {
      colorPrimary: '#673ab7',
    },
    Alert: {
      borderRadius: 10,
    },
    Divider: {
      colorSplit: '#e2e8f0',
    },
  },
};
