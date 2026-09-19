export interface NormalizedUserData {
  normalizedNome: string;
  normalizedEmail: string;
}

export const normalizeUserData = (nomeCadastro: string, emailCadastro: string): NormalizedUserData => {
    const normalizedNome = nomeCadastro.toLowerCase();
    const normalizedEmail = emailCadastro.toLowerCase();
    return { normalizedNome, normalizedEmail };
  };
