import axios from 'axios';
import { normalizeUserData } from './LowerCase';

export const handleSubmitCadastro = async (nomeCadastro, emailCadastro, senhaCadastro, confirmarSenhaCadastro, setLoading, setResponseMessage, setResponseSucess) => {
  if (nomeCadastro && emailCadastro && senhaCadastro && confirmarSenhaCadastro) {
    if (!emailCadastro.includes("@")) {
      setResponseMessage('O e-mail precisa conter @.');
      setTimeout(() => {
        setResponseMessage('');
      }, 3000);
    } else {
      if (senhaCadastro === confirmarSenhaCadastro) {
        const { normalizedNome, normalizedEmail } = normalizeUserData(nomeCadastro, emailCadastro);

        console.log(nomeCadastro, normalizedNome)

        const userData = {
          nomeCadastro: normalizedNome,
          emailCadastro: normalizedEmail,
          senhaCadastro,
        };

        setLoading(true);

        try {
          const response = await axios.post('http://localhost:3000/usuario', userData);
          if (response.status === 201) {
            setResponseSucess('Usuário registrado com sucesso!');
            setTimeout(() => {
              setResponseSucess('');
            }, 3000);
          }
        } catch (error) {
          setResponseMessage('Houve um erro ao registrar o usuário.');
          setTimeout(() => {
            setResponseMessage('');
          }, 3000);
          console.error('Erro:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResponseMessage('As senhas não coincidem, tente novamente.');
        setTimeout(() => {
          setResponseMessage('');
        }, 3000);
      }
    }
  } else {
    setResponseMessage('Preencha todos os dados para prosseguir.');
    setTimeout(() => {
      setResponseMessage('');
    }, 3000);
  }
};
