import { createTheme, Theme } from '@mui/material/styles';
import { ColorMode } from '../context/ColorModeContext';

// Same accent/brand color in both palettes so the app stays recognizable when
// switching modes - this is the primary color already used across confirm
// buttons/links (SwalHelper, form submit buttons, etc.) before this theme existed.
const BRAND_PRIMARY = '#4dabf5';

// Dark palette canonicalizes the hex values that were hardcoded throughout the
// app before this theme existed (backgrounds around #0d0d0d/#101010/#1A1E22,
// white text) - the default, so existing users see no visual change.
const darkPalette = {
    mode: 'dark' as const,
    primary: { main: BRAND_PRIMARY },
    background: {
        default: '#0d0d0d',
        paper: '#1a1e22',
    },
    text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: '#333333',
};

const lightPalette = {
    mode: 'light' as const,
    primary: { main: BRAND_PRIMARY },
    background: {
        default: '#f4f5f7',
        paper: '#ffffff',
    },
    text: {
        primary: '#1a1a1a',
        secondary: 'rgba(0, 0, 0, 0.6)',
    },
    divider: '#e0e0e0',
};

export const getAppTheme = (mode: ColorMode): Theme =>
    createTheme({
        palette: mode === 'dark' ? darkPalette : lightPalette,
    });
