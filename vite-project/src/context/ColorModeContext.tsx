import { createContext, useContext, useState, ReactNode } from 'react';
import PropTypes from 'prop-types';

export type ColorMode = 'light' | 'dark';

export interface ColorModeContextValue {
  mode: ColorMode;
  toggleMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

const STORAGE_KEY = 'colorMode';

const getStoredMode = (): ColorMode => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw === 'light' ? 'light' : 'dark';
    } catch (error) {
        console.error('Erro ao ler colorMode do localStorage:', error);
        return 'dark';
    }
};

interface ColorModeProviderProps {
    children: ReactNode;
}

// Independent from ThemeContext (the animated gradient background colors, which
// only exist post-login and live in `usuario.cores`). This is the app-wide
// light/dark UI preference - it must work even on the pre-login screen.
export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
    const [mode, setMode] = useState<ColorMode>(getStoredMode);

    const toggleMode = () => {
        setMode((prevMode) => {
            const nextMode: ColorMode = prevMode === 'dark' ? 'light' : 'dark';
            localStorage.setItem(STORAGE_KEY, nextMode);
            return nextMode;
        });
    };

    return (
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ColorModeContext.Provider>
    );
};

ColorModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useColorMode = (): ColorModeContextValue => {
    const context = useContext(ColorModeContext);
    if (context === undefined) {
        throw new Error('useColorMode deve ser usado dentro de um ColorModeProvider');
    }
    return context;
};
