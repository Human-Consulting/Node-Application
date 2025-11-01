export const getNome = (nome) => {
  const partes = nome.split(" ");
  const primeiraLetraPrimeiroNome = partes[0][0];
  const primeiraLetraUltimoNome = partes[partes.length - 1][0];
  return `${primeiraLetraPrimeiroNome}${primeiraLetraUltimoNome}`;
}

export const getTempoRestante = (dtFim) => {
  const hoje = new Date();
  const dataAlvo = new Date(dtFim);

  // Zera usando UTC pra evitar erro de timezone
  hoje.setUTCHours(0, 0, 0, 0);
  dataAlvo.setUTCHours(0, 0, 0, 0);

  // Diferença em dias inteiros
  const diffMs = dataAlvo.getTime() - hoje.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Casos específicos
  if (diffDias < 0) {
    return `-${Math.abs(diffDias)}d`;
  }

  if (diffDias === 0) {
    return "Hoje!";
  }

  if (diffDias === 1) {
    return "Amanhã";
  }

  if (diffDias < 7) {
    return `${diffDias}d`;
  }

  if (diffDias < 30) {
    const semanas = Math.floor(diffDias / 7);
    return `${semanas} sem`;
  }

  if (diffDias < 365) {
    const meses = Math.floor(diffDias / 30);
    return `${meses}m`;
  }

  const anos = Math.floor(diffDias / 365);
  return `${anos}a`;
};
