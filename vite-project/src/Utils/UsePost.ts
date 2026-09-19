import { NavigateFunction } from 'react-router';
import { apiRequest } from './apiClient';
import { UsuarioDto } from './types';

interface LoginUsuario extends UsuarioDto {
  token?: string;
  permissao?: string[];
  nomeEmpresa?: string;
}

export const handleSubmitLogin = async (
  emailLogin: string,
  senhaLogin: string,
  navigate: NavigateFunction,
  setResponseMessage: (message: string) => void,
  setLoading: (loading: boolean) => void,
  setUsuario?: (usuario: UsuarioDto | null) => void
): Promise<void> => {
  if (emailLogin && senhaLogin) {
    setLoading(true);

    try {
      const { response, data: usuario } = await apiRequest<LoginUsuario>('/usuarios/autenticar', {
        method: 'POST',
        body: { email: emailLogin, senha: senhaLogin },
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok && usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("token", JSON.stringify(usuario.token));
        setUsuario?.(usuario);

        if (usuario.permissao?.includes('CONSULTOR')) {
          navigate(`/Home/Empresas/${usuario.idEmpresa}`);
        } else {
          navigate(`/Home/${usuario.nomeEmpresa}/${Number(usuario.idEmpresa)}`);
        }
        setResponseMessage('');
      } else {
        setResponseMessage('Credenciais inválidas!');
        setTimeout(() => setResponseMessage(''), 3000);
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login: ', error);
      setResponseMessage('Erro ao tentar fazer login.');
      setTimeout(() => setResponseMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  } else {
    setResponseMessage('Preencha todos os campos para prosseguir!');
    setTimeout(() => setResponseMessage(''), 3000);
  }
};
