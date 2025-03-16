import axios from 'axios';

export const handleSubmitCadastro = async (nomeCadastro, emailCadastro, senhaCadastro, confirmarSenhaCadastro, setLoading, setResponseMessage, setResponseSucess) => {
  // Verifica se todos os campos foram preenchidos
  if (nomeCadastro && emailCadastro && senhaCadastro && confirmarSenhaCadastro) {
    // Verifica se o e-mail contém o símbolo '@'
    if (!emailCadastro.includes("@")) {
      setResponseMessage('O e-mail precisa conter @.');
      setTimeout(() => {
        setResponseMessage('');
      }, 3000);
    } else {
      // Verifica se as senhas coincidem
      if (senhaCadastro === confirmarSenhaCadastro) {
        const userData = {
          nomeCadastro,
          emailCadastro,
          senhaCadastro,
        };

        setLoading(true); // Inicia o carregamento

        try {
          const response = await axios.post('http://localhost:3000/usuario', userData);
          if (response.status === 200) {
            // Exibe a mensagem de sucesso
            setResponseSucess('Usuário registrado com sucesso!');
            
            // Limpa a mensagem de sucesso após 3 segundos
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
