import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../../context/AuthContext';
import { getAppTheme } from '../../theme/theme';
import LoginContainer from './LoginContainer';

// LoginContainer renders a ShaderGradientCanvas/ShaderGradient background
// (from the `shadergradient` package, which pulls in three.js/WebGL). jsdom
// has no WebGL context, so the 3D background is mocked out here to keep this
// a lightweight smoke test of the actual login form.
vi.mock('shadergradient', () => ({
  ShaderGradientCanvas: ({ children }: { children?: ReactNode }) => (
    <div data-testid="shader-canvas-mock">{children}</div>
  ),
  ShaderGradient: () => null,
}));

describe('LoginContainer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the email/password login fields without crashing', () => {
    render(
      <MemoryRouter>
        <MuiThemeProvider theme={getAppTheme('dark')}>
          <AuthProvider>
            <LoginContainer />
          </AuthProvider>
        </MuiThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });
});
