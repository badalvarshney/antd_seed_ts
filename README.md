# Cloud Auth - Ant Design & React TypeScript Boilerplate

A modern, production-ready **Vite + React 19 + TypeScript** authentication suite & theme customization seed built with **Ant Design (v6)**, **Redux Toolkit**, **Formik**, **Yup**, and **Axios**.

---

## 🌟 Key Features

- **100% Pure TypeScript**: Fully typed codebase with zero `.js` / `.jsx` files. Strict type safety across components, Redux slices, Axios requests, and utilities.
- **Complete Auth Flow**:
  - 🔑 **Sign In**: Email & password authentication with "Keep me logged in" & Quick-fill demo credentials.
  - 📝 **Registration**: User signup with real-time password strength meter.
  - 🔒 **Forgot & Reset Password**: Token-based password recovery workflows.
  - ✉️ **Email / OTP Verification**: Custom 6-digit numeric OTP input with auto-focus, backspace navigation, paste support, and resend cooldown timer.
- **3 Auth Page Layout Designs**:
  - **Variant 1**: Split Card with Hero Canvas (Default)
  - **Variant 2**: Minimal Centered Card
  - **Variant 3**: Full Screen Split (Supports 50/50, 70/30, 30/70 screen ratios)
- **Live Theme Customizer Drawer**:
  - **Theme Modes**: Light, Dark, System preference
  - **Color Presets**: Live accent color swatches (Indigo, Teal, Pink, Amber, etc.)
  - **Typography**: Font family selector & base font size slider
  - **Input Styling**: Normal, Outlined, Underlined, Glass, Pill & Rounded border options
  - **RTL Support**: One-click Right-To-Left text orientation toggle
- **State & API Management**:
  - Redux Toolkit (`authSlice`, `customizationSlice`) with persistent localStorage sync.
  - Axios instance with automatic Bearer token interceptor & mock API fallback mode.
- **Vercel Ready**: Pre-configured `vercel.json` rewrite rules to prevent 404 errors on page refresh in SPAs.

---

## 🛠️ Technology Stack

| Library / Tool | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | UI Library |
| **TypeScript** | `^5.x` | Static Type Checking |
| **Vite** | `^8.3.0` | Build Tool & Dev Server |
| **Ant Design** | `^6.6.4` | Enterprise UI Component System |
| **Redux Toolkit** | `^2.12.0` | Global State Management |
| **React Router** | `^7.18.3` | Client-side Routing |
| **Formik & Yup** | `^2.4` / `^1.7` | Form Handling & Schema Validation |
| **Axios** | `^1.20.0` | HTTP Client & Mock Engine |

---

## 📂 Project Directory Structure

```text
Antd_Seed_ts/
├── src/
│   ├── api/                  # Axios instance & Mock API handler (axios.ts)
│   ├── app/                  # Redux Store configuration (store.ts)
│   ├── components/           # Reusable UI Components
│   │   ├── auth/             # AuthHeader, SocialAuthButtons
│   │   ├── common/           # FormikAntdField, PasswordStrengthBar, ProtectedRoute
│   │   └── customization/    # ThemeCustomizationDrawer, ThemeCustomizerTrigger
│   ├── config/               # Global Theme Defaults & Presets (themeConfig.ts)
│   ├── context/              # React ThemeContext & useTheme hook (ThemeContext.tsx)
│   ├── features/             # Redux Slices
│   │   ├── auth/             # authSlice, authSelectors, authThunks
│   │   └── customization/    # customizationSlice
│   ├── layouts/              # AuthLayout component (AuthLayout.tsx)
│   ├── pages/                # Page Views
│   │   ├── auth/             # Login, Register, ForgotPassword, ResetPassword, VerifyEmail
│   │   └── Dashboard.tsx     # Authenticated User Dashboard
│   ├── routes/               # React Router routes definition (AppRoutes.tsx)
│   ├── services/             # API Service exports (api.ts)
│   ├── styles/               # CSS Design Token Styles (index.css, Customizer.css, AuthLayout.css)
│   ├── utils/                # Helper functions (colorUtils, antdMessage, validationSchemas)
│   ├── App.tsx               # Root App component with ConfigProvider
│   ├── main.tsx              # DOM Entry point
│   └── vite-env.d.ts         # Vite client type definitions
├── index.html                # HTML Template
├── tsconfig.json             # TypeScript Compiler Configuration
├── tsconfig.node.json        # TypeScript Node Config for Vite
├── vite.config.ts            # Vite Configuration
├── vercel.json               # Vercel SPA Routing Configuration
└── package.json              # Project Dependencies & Scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.x or later) and **npm** installed on your system.

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/NSaiEPS/React_Components.git
cd Antd_Seed_ts
npm install
```

### 2. Run Development Server

Start the local dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Quick Demo Credentials

On the **Login** page, click **"Quick Fill Demo Credentials"** to quickly auto-fill test credentials and sign in directly to the Dashboard.

---

## 📦 Build & Deployment

### Check TypeScript Types

```bash
npx tsc --noEmit
```

### Build for Production

```bash
npm run build
```

This runs `tsc -b && vite build` and generates an optimized production bundle in the `dist/` directory.

### Deploying to Vercel

This repository includes a root `vercel.json` configured for SPA routing. 

When deploying to Vercel:
1. Framework Preset: **Vite**
2. Build Command: `npm run build`
3. Output Directory: `dist`

All routes (`/login`, `/register`, `/verify-email`, etc.) will automatically route to `index.html` without throwing 404 errors on page refresh.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
