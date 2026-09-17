import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SafetyCertificateOutlined, CheckCircleFilled, RocketOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCustomization } from '../features/customization/customizationSlice';
import { adjustColor, hexToRgba } from '../utils/colorUtils';
import '../styles/AuthLayout.css';

export const AuthLayout: React.FC = () => {
  const customization = useSelector(selectCustomization);
  const { presetColor, authLayout = 'split', authSplitRatio = '50-50' } = customization;

  const getSplitRatioFlex = (ratio: string): { hero: string; form: string } => {
    if (ratio === '70-30') return { hero: '7 7 0%', form: '3 3 0%' };
    if (ratio === '30-70') return { hero: '3 3 0%', form: '7 7 0%' };
    return { hero: '5 5 0%', form: '5 5 0%' };
  };

  const splitFlex = getSplitRatioFlex(authSplitRatio);

  const heroBackground = `linear-gradient(145deg, ${adjustColor(presetColor, 10)} 0%, ${presetColor} 50%, ${adjustColor(presetColor, -25)} 100%)`;
  const blob1Background = `radial-gradient(circle, ${hexToRgba(presetColor, 0.25)} 0%, rgba(237, 231, 246, 0) 70%)`;

  const BrandLogoHeader: React.FC = () => (
    <div className="auth-minimal-logo-header">
      <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div className="auth-logo-icon-box" style={{ backgroundColor: presetColor, boxShadow: `0 4px 14px ${hexToRgba(presetColor, 0.4)}` }}>
          C
        </div>
        <span className="auth-logo-brand-title">Cloud Auth</span>
      </Link>
    </div>
  );

  if (authLayout === 'minimal') {
    return (
      <div className="auth-layout-container auth-layout-minimal-bg">
        <div className="auth-bg-blob-1" style={{ background: blob1Background }} />
        <div className="auth-bg-blob-2" />
        <div
          className="auth-minimal-card fade-in"
          style={{ boxShadow: `0 20px 40px -10px ${hexToRgba(presetColor, 0.18)}, 0 0 0 1px rgba(226, 232, 240, 0.6)` }}
        >
          <BrandLogoHeader />
          <div className="auth-form-card">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  if (authLayout === 'full-split') {
    return (
      <div className="auth-full-split-container">
        <div className="auth-full-split-hero" style={{ flex: splitFlex.hero, background: heroBackground, transition: 'flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div className="auth-hero-pattern" />
          <div className="auth-full-split-content">
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 40 }}>
              <div className="auth-hero-logo-icon">C</div>
              <span className="auth-hero-brand-name">Cloud Auth</span>
            </Link>
            <div className="auth-hero-badge">
              <SafetyCertificateOutlined /> Enterprise Grade Security
            </div>
            <h1 className="auth-hero-title" style={{ fontSize: 42 }}>
              Secure & Seamless Cloud Authentication
            </h1>
            <p className="auth-hero-desc" style={{ fontSize: 16, maxWidth: 480 }}>
              Build scalable, modern user workflows with enterprise security standards, multi-factor support, and customizable UI tokens.
            </p>
            <div className="auth-hero-card-preview" style={{ marginTop: 24 }}>
              <div className="auth-hero-avatar" style={{ color: presetColor }}>
                <RocketOutlined />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Production Ready Suite <CheckCircleFilled style={{ color: '#00e676', fontSize: 14 }} />
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.85)', marginTop: 2 }}>
                  Redux Toolkit + Ant Design v5 + Formik Validation
                </div>
              </div>
            </div>
          </div>
          <div className="auth-hero-footer">
            <span>© 2026 Cloud Auth Suite</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ cursor: 'pointer' }}>Privacy</span>
              <span style={{ cursor: 'pointer' }}>Terms</span>
            </div>
          </div>
        </div>
        <div className="auth-full-split-form-panel" style={{ flex: splitFlex.form, transition: 'flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div className="auth-form-card" style={{ maxWidth: 440 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-layout-container">
      <div className="auth-bg-blob-1" style={{ background: blob1Background }} />
      <div className="auth-bg-blob-2" />

      <div
        className="auth-card-wrapper fade-in"
        style={{ boxShadow: `0 25px 50px -12px ${hexToRgba(presetColor, 0.2)}, 0 0 0 1px rgba(226, 232, 240, 0.6)` }}
      >
        <div className="auth-hero-section" style={{ background: heroBackground }}>
          <div className="auth-hero-pattern" />

          <div className="auth-hero-header">
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div className="auth-hero-logo-icon">C</div>
              <span className="auth-hero-brand-name">Cloud Auth</span>
            </Link>
          </div>

          <div className="auth-hero-content">
            <div className="auth-hero-badge">
              <SafetyCertificateOutlined /> Enterprise Grade Security
            </div>
            <h1 className="auth-hero-title">
              Hi, Welcome Back to Cloud Authentication
            </h1>
            <p className="auth-hero-desc">
              Experience a modern, flexible, and scalable authentication workflow built with React, Ant Design, Redux Toolkit, and Formik.
            </p>

            <div className="auth-hero-card-preview float-slow">
              <div className="auth-hero-avatar" style={{ color: presetColor }}>
                <RocketOutlined />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  Production Ready <CheckCircleFilled style={{ color: '#00e676', fontSize: 14 }} />
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.8)', marginTop: 2 }}>
                  Redux Toolkit + Formik + Yup + Axios Integration
                </div>
              </div>
            </div>
          </div>

          <div className="auth-hero-footer">
            <span>© 2026 Cloud Auth Module</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            </div>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-card">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
