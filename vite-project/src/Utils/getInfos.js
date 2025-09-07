export const getNome = (nome) => {
    const partes = nome.split(" ");
    const primeiraLetraPrimeiroNome = partes[0][0];
    const primeiraLetraUltimoNome = partes[partes.length - 1][0];
    return `${primeiraLetraPrimeiroNome}${primeiraLetraUltimoNome}`;
}

export const getTempoRestante = (dtFim) => {
    const hoje = new Date();
    const dataAlvo = new Date(dtFim);
    hoje.setHours(0, 0, 0, 0);
    dataAlvo.setHours(0, 0, 0, 0);

    const diffMs = dataAlvo - hoje;
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias > 14) {
      return "2s";
    } else if (diffDias > 7) {
      return "1s";
    } else if (diffDias > 0) {
      return `${diffDias}d`;
    } else {
      return "0d";
    }
  }