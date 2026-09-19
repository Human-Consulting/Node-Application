import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import type { UsuarioDto } from '../Utils/types';

// Mirrors the real nesting order in MainContent.tsx: AuthProvider wraps
// ThemeProvider (ThemeProvider reads usuario via useAuth()).
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </AuthProvider>
);

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('falls back to the documented default colors when usuario/cores is absent', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.color1).toBe('#606080');
    expect(result.current.color2).toBe('#8d7dca');
    expect(result.current.color3).toBe('#4e5e8c');
    expect(result.current.animate).toBe(true);
  });

  it('initializes color1/color2/color3/animate from usuario.cores', () => {
    const usuario: UsuarioDto = {
      idUsuario: 1,
      cores: '#111111|#222222|#333333|false',
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.color1).toBe('#111111');
    expect(result.current.color2).toBe('#222222');
    expect(result.current.color3).toBe('#333333');
    expect(result.current.animate).toBe(false);
  });

  it('setters update state', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setColor1('#abcdef');
      result.current.setColor2('#fedcba');
      result.current.setColor3('#123456');
      result.current.setAnimate(false);
    });

    expect(result.current.color1).toBe('#abcdef');
    expect(result.current.color2).toBe('#fedcba');
    expect(result.current.color3).toBe('#123456');
    expect(result.current.animate).toBe(false);
  });
});
