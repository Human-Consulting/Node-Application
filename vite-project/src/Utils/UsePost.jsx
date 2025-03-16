export const handleSubmitLogin = async (emailLogin, senhaLogin, navigate, setResponseMessage, setLoading) => {
  if (emailLogin && senhaLogin) {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/usuario');
      const users = await response.json();
  
      const usuario = users.find(user => user.email === emailLogin && user.senha === senhaLogin);
  
      if (usuario) {
        navigate('/Home');
        setResponseMessage('');
      } else {
        setResponseMessage('Credenciais inválidas!');
        setTimeout(() => setResponseMessage(''), 3000);
      }
    } catch (error) {
      setResponseMessage('Erro ao tentar fazer login!');
      setTimeout(() => setResponseMessage(''), 3000);
      console.log('Erro ao tentar fazer login!', error);
    } finally {
      setLoading(false);
    }
  } else {
    setResponseMessage('Preencha todos os campos para prosseguir!');
    setTimeout(() => setResponseMessage(''), 3000);
  }
};
