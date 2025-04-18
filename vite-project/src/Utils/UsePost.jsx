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
        if (usuario.permissao.includes('CONSULTOR')) {
          navigate(`/Home/2`);
        } else {
          navigate(`/Home/${Number(usuario.fkEmpresa)}`);
        }
        setResponseMessage('');

      } else {
        setResponseMessage('Credenciais inválidas!');
        setTimeout(() => setResponseMessage(''), 3000);
      }
    } catch (error) {
      setResponseMessage('Erro ao tentar fazer login!');
      setTimeout(() => setResponseMessage(''), 3000);

    } finally {
      setLoading(false);
    }
  } else {
    setResponseMessage('Preencha todos os campos para prosseguir!');
    setTimeout(() => setResponseMessage(''), 3000);
  }
};
