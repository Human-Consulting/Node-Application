export const handleSubmitLogin = async (emailLogin, senhaLogin, navigate, setResponseMessage, setLoading) => {
  if (emailLogin && senhaLogin) {
    setLoading(true);

    try {
      const newUsuario = { email: emailLogin, senha: senhaLogin };
      const formattedUsuario = JSON.stringify(newUsuario);

      const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/autenticar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formattedUsuario,
      });
      if (res.ok) {
        const usuario = await res.json();
        

        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("token", JSON.stringify(usuario.token));

        if (usuario.permissao.includes('CONSULTOR')) {
          
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
      setResponseMessage('Erro ao tentar fazer login: ', error);
      setTimeout(() => setResponseMessage(''), 3000);

    } finally {
      setLoading(false);
    }
  } else {
    setResponseMessage('Preencha todos os campos para prosseguir!');
    setTimeout(() => setResponseMessage(''), 3000);
  }
};
