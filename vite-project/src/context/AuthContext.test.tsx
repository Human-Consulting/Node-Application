import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import type { UsuarioDto } from '../Utils/types';

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with usuario/token as null when localStorage is empty', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.usuario).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it('picks up usuario/token from localStorage on init', () => {
    const usuario: UsuarioDto = { idUsuario: 1, nome: 'Fulano' };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', JSON.stringify('abc'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.usuario).toEqual(usuario);
    expect(result.current.token).toBe('abc');
  });

  it('setUsuario updates both the returned value and localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const novoUsuario: UsuarioDto = { idUsuario: 2, nome: 'Novo Usuario' };

    act(() => {
      result.current.setUsuario(novoUsuario);
    });

    expect(result.current.usuario).toEqual(novoUsuario);
    expect(localStorage.getItem('usuario')).toBe(JSON.stringify(novoUsuario));
  });

  it('logout clears both React state and localStorage for usuario/token', () => {
    const usuario: UsuarioDto = { idUsuario: 1, nome: 'Fulano' };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', JSON.stringify('abc'));

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.usuario).toEqual(usuario);

    act(() => {
      result.current.logout();
    });

    expect(result.current.usuario).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
