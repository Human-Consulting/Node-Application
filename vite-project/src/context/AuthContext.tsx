import { createContext, useContext, useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { UsuarioDto } from '../Utils/types';

export interface AuthContextValue {
  usuario: UsuarioDto | null;
  token: string | null;
  setUsuario: (novoUsuario: UsuarioDto | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getStoredUsuario = (): UsuarioDto | null => {
    try {
        const raw = localStorage.getItem('usuario');
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error('Erro ao ler usuario do localStorage:', error);
        return null;
    }
};

const getStoredToken = (): string | null => {
    try {
        const raw = localStorage.getItem('token');
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error('Erro ao ler token do localStorage:', error);
        return null;
    }
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [usuario, setUsuarioState] = useState<UsuarioDto | null>(getStoredUsuario);
    const [token, setTokenState] = useState<string | null>(getStoredToken);

    const setUsuario = (novoUsuario: UsuarioDto | null) => {
        setUsuarioState(novoUsuario);
        localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    };

    const logout = () => {
        localStorage.clear();
        setUsuarioState(null);
        setTokenState(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, token, setUsuario, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
