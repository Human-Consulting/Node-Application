import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import type { UsuarioDto } from '../../Utils/types';

const renderProtected = () =>
  render(
    <MemoryRouter initialEntries={['/protected']}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<div>login page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>secret</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to "/" (and does not render children) when there is no usuario', () => {
    renderProtected();

    expect(screen.queryByText('secret')).not.toBeInTheDocument();
    expect(screen.getByText('login page')).toBeInTheDocument();
  });

  it('renders the children when a valid usuario is present', () => {
    const usuario: UsuarioDto = { idUsuario: 1, nome: 'Fulano' };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    renderProtected();

    expect(screen.getByText('secret')).toBeInTheDocument();
    expect(screen.queryByText('login page')).not.toBeInTheDocument();
  });
});
