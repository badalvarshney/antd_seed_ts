import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import DEFAULT_THEME_CONFIG, {
  COLOR_PRESETS,
  type ThemeConfig,
  type ThemeMode,
  type InputStyle,
  type InputBackground,
  type InputSize,
  type ThemeWidth,
  type AuthLayout,
  type AuthSplitRatio,
} from '../../config/themeConfig';

export { COLOR_PRESETS };

const STORAGE_KEY = 'cloud_theme_customization';

export interface CustomizationState extends ThemeConfig {
  drawerOpen: boolean;
}

const loadSavedCustomization = (): Partial<ThemeConfig> | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load theme customization', e);
  }
  return null;
};

const saveCustomization = (state: CustomizationState): void => {
  try {
    const { drawerOpen, ...saveable } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveable));
  } catch (e) {
    console.error('Failed to save theme customization', e);
  }
};

const defaultState: CustomizationState = {
  ...DEFAULT_THEME_CONFIG,
  drawerOpen: false,
};

const savedSettings: any = loadSavedCustomization();

if (savedSettings) {
  if (savedSettings.inputBorderRadius === 24) {
    savedSettings.inputBorderRadius = 50;
  }
  if (savedSettings.inputBackground === 'underlined') {
    savedSettings.inputStyle = 'underlined';
    savedSettings.inputBackground = 'default';
  } else if (savedSettings.inputBackground === 'outlined') {
    if (!savedSettings.inputStyle) savedSettings.inputStyle = 'normal';
    savedSettings.inputBackground = 'default';
  }
}

const initialState: CustomizationState = {
  ...defaultState,
  ...(savedSettings || {}),
  drawerOpen: false,
};

export const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      saveCustomization(state);
    },
    setPresetColor: (state, action: PayloadAction<string>) => {
      state.presetColor = action.payload;
      saveCustomization(state);
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
      saveCustomization(state);
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
      saveCustomization(state);
    },
    setInputStyle: (state, action: PayloadAction<InputStyle>) => {
      state.inputStyle = action.payload;
      saveCustomization(state);
    },
    setInputBackground: (state, action: PayloadAction<InputBackground>) => {
      state.inputBackground = action.payload;
      saveCustomization(state);
    },
    setInputSize: (state, action: PayloadAction<InputSize>) => {
      state.inputSize = action.payload;
      saveCustomization(state);
    },
    setInputBorderRadius: (state, action: PayloadAction<number>) => {
      state.inputBorderRadius = action.payload;
      saveCustomization(state);
    },
    setThemeWidth: (state, action: PayloadAction<ThemeWidth>) => {
      state.themeWidth = action.payload;
      saveCustomization(state);
    },
    setRtl: (state, action: PayloadAction<boolean>) => {
      state.rtl = action.payload;
      saveCustomization(state);
    },
    setAuthLayout: (state, action: PayloadAction<AuthLayout>) => {
      state.authLayout = action.payload;
      saveCustomization(state);
    },
    setAuthSplitRatio: (state, action: PayloadAction<AuthSplitRatio>) => {
      state.authSplitRatio = action.payload;
      saveCustomization(state);
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    resetCustomization: (state) => {
      Object.assign(state, { ...defaultState, drawerOpen: state.drawerOpen });
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const {
  setThemeMode,
  setPresetColor,
  setFontFamily,
  setFontSize,
  setInputStyle,
  setInputBackground,
  setInputSize,
  setInputBorderRadius,
  setThemeWidth,
  setRtl,
  setAuthLayout,
  setAuthSplitRatio,
  toggleDrawer,
  setDrawerOpen,
  resetCustomization,
} = customizationSlice.actions;

export const selectCustomization = (state: { customization: CustomizationState }) => state.customization;

export default customizationSlice.reducer;
