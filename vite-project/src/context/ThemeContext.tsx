import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';

export interface ThemeContextValue {
  color1: string;
  setColor1: Dispatch<SetStateAction<string>>;
  color2: string;
  setColor2: Dispatch<SetStateAction<string>>;
  color3: string;
  setColor3: Dispatch<SetStateAction<string>>;
  animate: boolean;
  setAnimate: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const { usuario } = useAuth();

    const stringFinal = usuario?.cores || "#606080|#8d7dca|#4e5e8c|true";
    const [cor1, cor2, cor3, animateStr] = stringFinal.split("|");

    const [color1, setColor1] = useState(cor1);
    const [color2, setColor2] = useState(cor2);
    const [color3, setColor3] = useState(cor3);
    const [animate, setAnimate] = useState(animateStr === "true");

    return (
        <ThemeContext.Provider value={{ color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
};
