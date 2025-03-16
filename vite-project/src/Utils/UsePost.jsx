// src/services/loginService.js

export const handleSubmitLogin = async (emailLogin, senhaLogin, navigate, setResponseMessage, setLoading) => {
    if (emailLogin && senhaLogin) {
      setLoading(true);  // Inicia o carregamento
  
      try {
        const response = await fetch('http://localhost:3000/usuario');
        const users = await response.json();
    
        const usuario = users.find(user => user.email === emailLogin && user.senha === senhaLogin);
    
        if (usuario) {
          console.log('Login bem-sucedido!');
          navigate('/Home');  // Navega para a página inicial após login bem-sucedido
          setResponseMessage(''); // Limpa a mensagem de erro anterior
        } else {
          setResponseMessage('Credenciais inválidas!');  // Exibe a mensagem de erro
          setTimeout(() => setResponseMessage(''), 3000);  // Limpa a mensagem após 3 segundos
        }
      } catch (error) {
        setResponseMessage('Erro ao tentar fazer login!');  // Exibe a mensagem de erro
        setTimeout(() => setResponseMessage(''), 3000);  // Limpa a mensagem após 3 segundos
        console.log('Erro ao tentar fazer login!', error);
      } finally {
        setLoading(false);  // Finaliza o carregamento
      }
    } else {
      setResponseMessage('Preencha todos os campos para prosseguir!');  // Exibe a mensagem de erro
      setTimeout(() => setResponseMessage(''), 3000);  // Limpa a mensagem após 3 segundos
    }
  };
  