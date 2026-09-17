import React, { useState } from 'react';
import { Drawer, Button, Tooltip, Select, Slider } from 'antd';
import {
  SunOutlined,
  MoonOutlined,
  DesktopOutlined,
  CheckOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCustomization,
  setThemeMode,
  setPresetColor,
  setFontFamily,
  setFontSize,
  setInputStyle,
  setInputBackground,
  setInputSize,
  setInputBorderRadius,
  setRtl,
  setAuthLayout,
  setAuthSplitRatio,
  setDrawerOpen,
  resetCustomization,
  COLOR_PRESETS,
} from '../../features/customization/customizationSlice';
import { selectIsAuthenticated } from '../../features/auth/authSelectors';
import {
  FONT_OPTIONS,
  AUTH_LAYOUT_OPTIONS,
  AUTH_SPLIT_RATIO_OPTIONS,
  INPUT_SHAPE_OPTIONS,
  INPUT_STYLE_OPTIONS,
  INPUT_BACKGROUND_OPTIONS,
  INPUT_SIZE_OPTIONS,
  type AuthLayout,
  type AuthSplitRatio,
  type InputStyle,
  type InputBackground,
  type InputSize,
} from '../../config/themeConfig';
import { hexToRgba } from '../../utils/colorUtils';

export const ThemeCustomizationDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const customization = useSelector(selectCustomization);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [activeTab, setActiveTab] = useState<'palette' | 'typography'>('palette');

  const {
    mode,
    presetColor,
    fontFamily,
    fontSize,
    inputStyle = 'normal',
    inputBackground = 'default',
    inputSize = 'large',
    inputBorderRadius = 10,
    rtl,
    authLayout = 'split',
    authSplitRatio = '50-50',
    drawerOpen,
  } = customization;

  const handleClose = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleReset = () => {
    dispatch(resetCustomization());
  };

  const activeOptionStyle: React.CSSProperties = {
    borderColor: presetColor,
    color: presetColor,
    backgroundColor: hexToRgba(presetColor, 0.12),
    boxShadow: `0 0 10px ${hexToRgba(presetColor, 0.25)}`,
  };

  const activeTabStyle: React.CSSProperties = {
    color: presetColor,
    borderBottomColor: presetColor,
  };

  return (
    <Drawer
      title="Theme Customization"
      placement="right"
      size={360 as any}
      onClose={handleClose}
      open={drawerOpen}
      className="customizer-drawer"
      extra={
        <Button
          size="small"
          danger
          onClick={handleReset}
          style={{
            borderColor: '#ff4d4f',
            color: '#ff4d4f',
            background: 'transparent',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          Reset
        </Button>
      }
    >
      <div className="customizer-drawer-body">
        {/* Top Tabs Header */}
        <div className="customizer-tabs">
          <div
            className={`customizer-tab-btn ${activeTab === 'palette' ? 'active' : ''}`}
            style={activeTab === 'palette' ? activeTabStyle : undefined}
            onClick={() => setActiveTab('palette')}
            title="Theme & Colors"
          >
            <BgColorsOutlined />
          </div>
          <div
            className={`customizer-tab-btn ${activeTab === 'typography' ? 'active' : ''}`}
            style={activeTab === 'typography' ? activeTabStyle : undefined}
            onClick={() => setActiveTab('typography')}
            title="Typography Settings"
          >
            <FontSizeOutlined />
          </div>
        </div>

        {/* Tab 1: Theme & Color Palette Controls */}
        {activeTab === 'palette' && (
          <div className="fade-in">
            {/* THEME MODE */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">THEME MODE</div>
              <div className="customizer-mode-grid">
                <Tooltip title="Light Mode">
                  <div
                    className={`customizer-option-card ${mode === 'light' ? 'active' : ''}`}
                    style={mode === 'light' ? activeOptionStyle : undefined}
                    onClick={() => dispatch(setThemeMode('light'))}
                  >
                    <SunOutlined />
                  </div>
                </Tooltip>
                <Tooltip title="Dark Mode">
                  <div
                    className={`customizer-option-card ${mode === 'dark' ? 'active' : ''}`}
                    style={mode === 'dark' ? activeOptionStyle : undefined}
                    onClick={() => dispatch(setThemeMode('dark'))}
                  >
                    <MoonOutlined />
                  </div>
                </Tooltip>
                <Tooltip title="System Mode">
                  <div
                    className={`customizer-option-card ${mode === 'system' ? 'active' : ''}`}
                    style={mode === 'system' ? activeOptionStyle : undefined}
                    onClick={() => dispatch(setThemeMode('system'))}
                  >
                    <DesktopOutlined />
                  </div>
                </Tooltip>
              </div>
            </div>

            {/* AUTH PAGE LAYOUT (ONLY VISIBLE ON AUTH PAGES WHEN NOT LOGGED IN) */}
            {!isAuthenticated && (
              <div className="customizer-section-block">
                <div className="customizer-section-title">AUTH PAGE LAYOUT (4 DESIGNS)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {AUTH_LAYOUT_OPTIONS.map((opt) => {
                    const isActive = authLayout === opt.id;
                    const isFullSplit = opt.id === 'full-split';
                    return (
                      <div
                        key={opt.id}
                        className={`dual-option-card ${isActive ? 'active' : ''}`}
                        style={{
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          textAlign: 'left',
                          height: 'auto',
                          width: '100%',
                          ...(isActive ? activeOptionStyle : {}),
                        }}
                        onClick={() => dispatch(setAuthLayout(opt.id as AuthLayout))}
                      >
                        <div style={{ fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {isActive && <CheckOutlined style={{ color: presetColor }} />}
                          {opt.name}
                        </div>
                        <div style={{ fontSize: 11.5, opacity: 0.8, marginTop: 2 }}>
                          {opt.subtitle}
                        </div>

                        {/* Variant 3 Sub-Options: Split Ratio (50/50, 70/30, 30/70) */}
                        {isActive && isFullSplit && (
                          <div
                            style={{
                              marginTop: 10,
                              width: '100%',
                              paddingTop: 8,
                              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={{ fontSize: 10.5, fontWeight: 700, opacity: 0.85, marginBottom: 6, letterSpacing: '0.5px' }}>
                              SPLIT SCREEN RATIO
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                              {AUTH_SPLIT_RATIO_OPTIONS.map((ratioOpt) => {
                                const isRatioActive = authSplitRatio === ratioOpt.id;
                                return (
                                  <div
                                    key={ratioOpt.id}
                                    style={{
                                      padding: '6px 2px',
                                      borderRadius: 6,
                                      border: isRatioActive ? `1.5px solid ${presetColor}` : '1px solid rgba(255, 255, 255, 0.15)',
                                      backgroundColor: isRatioActive ? hexToRgba(presetColor, 0.22) : 'rgba(255, 255, 255, 0.04)',
                                      color: isRatioActive ? presetColor : 'inherit',
                                      textAlign: 'center',
                                      fontWeight: 700,
                                      fontSize: 11,
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                    }}
                                    onClick={() => dispatch(setAuthSplitRatio(ratioOpt.id as AuthSplitRatio))}
                                  >
                                    {ratioOpt.name}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PRESET COLOR */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">PRESET COLOR</div>
              <div className="color-swatches-grid">
                {COLOR_PRESETS.map((preset) => {
                  const isActive = presetColor === preset.primary;
                  return (
                    <Tooltip key={preset.primary} title={preset.name}>
                      <div
                        className={`color-swatch-item ${isActive ? 'active' : ''}`}
                        style={{
                          backgroundColor: preset.primary,
                          boxShadow: isActive
                            ? `0 0 0 2px rgba(6, 17, 24, 0.8), 0 0 0 4px ${preset.primary}`
                            : undefined,
                        }}
                        onClick={() => dispatch(setPresetColor(preset.primary))}
                      >
                        {isActive && <CheckOutlined className="color-swatch-check" />}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>

            {/* INPUT STYLE */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">INPUT STYLE</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {INPUT_STYLE_OPTIONS.map((opt) => {
                  const isActive = inputStyle === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`dual-option-card ${isActive ? 'active' : ''}`}
                      style={{
                        position: 'relative',
                        padding: '10px 4px',
                        fontSize: 11.5,
                        fontWeight: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        height: 'auto',
                        minHeight: 52,
                        ...(isActive ? activeOptionStyle : {}),
                      }}
                      onClick={() => dispatch(setInputStyle(opt.id as InputStyle))}
                    >
                      {isActive && (
                        <CheckOutlined
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 6,
                            fontSize: 10.5,
                            color: presetColor,
                          }}
                        />
                      )}
                      <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{opt.name}</div>
                      <span style={{ fontSize: 9.5, opacity: 0.75, fontWeight: 400, textAlign: 'center' }}>{opt.subtitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INPUT BACKGROUND */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">INPUT BACKGROUND</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {INPUT_BACKGROUND_OPTIONS.map((opt) => {
                  const isActive = inputBackground === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`dual-option-card ${isActive ? 'active' : ''}`}
                      style={{
                        position: 'relative',
                        padding: '10px 4px',
                        fontSize: 11.5,
                        fontWeight: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        height: 'auto',
                        minHeight: 52,
                        ...(isActive ? activeOptionStyle : {}),
                      }}
                      onClick={() => dispatch(setInputBackground(opt.id as InputBackground))}
                    >
                      {isActive && (
                        <CheckOutlined
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 6,
                            fontSize: 10.5,
                            color: presetColor,
                          }}
                        />
                      )}
                      <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{opt.name}</div>
                      <span style={{ fontSize: 9.5, opacity: 0.75, fontWeight: 400, textAlign: 'center' }}>{opt.subtitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INPUT FIELD SIZE */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">INPUT FIELD SIZE</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {INPUT_SIZE_OPTIONS.map((opt) => {
                  const isActive = inputSize === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`dual-option-card ${isActive ? 'active' : ''}`}
                      style={{
                        position: 'relative',
                        padding: '10px 4px',
                        fontSize: 11.5,
                        fontWeight: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        height: 'auto',
                        minHeight: 52,
                        ...(isActive ? activeOptionStyle : {}),
                      }}
                      onClick={() => dispatch(setInputSize(opt.id as InputSize))}
                    >
                      {isActive && (
                        <CheckOutlined
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 6,
                            fontSize: 10.5,
                            color: presetColor,
                          }}
                        />
                      )}
                      <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{opt.name}</div>
                      <span style={{ fontSize: 9.5, opacity: 0.75, fontWeight: 400, textAlign: 'center' }}>{opt.subtitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INPUT CORNER SHAPE */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">INPUT CORNER SHAPE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {INPUT_SHAPE_OPTIONS.map((shape) => {
                  const isActive = inputBorderRadius === shape.radius;
                  return (
                    <div
                      key={shape.id}
                      className={`dual-option-card ${isActive ? 'active' : ''}`}
                      style={{
                        padding: '10px 8px',
                        fontSize: 12,
                        fontWeight: 600,
                        ...(isActive ? activeOptionStyle : {}),
                      }}
                      onClick={() => dispatch(setInputBorderRadius(shape.radius))}
                    >
                      {isActive && <CheckOutlined style={{ marginRight: 4, color: presetColor }} />}
                      {shape.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RTL DIRECTION */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">RTL DIRECTION</div>
              <div className="dual-option-grid">
                <div
                  className={`dual-option-card ${!rtl ? 'active' : ''}`}
                  style={!rtl ? activeOptionStyle : undefined}
                  onClick={() => dispatch(setRtl(false))}
                >
                  <AlignLeftOutlined /> LTR
                </div>
                <div
                  className={`dual-option-card ${rtl ? 'active' : ''}`}
                  style={rtl ? activeOptionStyle : undefined}
                  onClick={() => dispatch(setRtl(true))}
                >
                  <AlignRightOutlined /> RTL
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Typography Controls */}
        {activeTab === 'typography' && (
          <div className="fade-in">
            {/* FONT FAMILY */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">FONT FAMILY</div>
              <Select
                value={fontFamily}
                onChange={(val) => dispatch(setFontFamily(val))}
                style={{ width: '100%' }}
                options={FONT_OPTIONS}
              />
            </div>

            {/* FONT SIZE */}
            <div className="customizer-section-block">
              <div className="customizer-section-title">BASE FONT SIZE ({fontSize}px)</div>
              <Slider
                min={12}
                max={18}
                value={fontSize}
                onChange={(val) => dispatch(setFontSize(val))}
                marks={{
                  12: '12px',
                  14: '14px',
                  16: '16px',
                  18: '18px',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default ThemeCustomizationDrawer;
