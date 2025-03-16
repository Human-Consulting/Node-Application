export const normalizeUserData = (nomeCadastro, emailCadastro) => {
    const normalizedNome = nomeCadastro.toLowerCase();
    const normalizedEmail = emailCadastro.toLowerCase();
    return { normalizedNome, normalizedEmail };
  };