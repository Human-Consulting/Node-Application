export const getNome = (nome) => {
  if (!nome) return "??";
  const partes = nome.split(" ");
  const primeiraLetraPrimeiroNome = partes[0][0];
  const primeiraLetraUltimoNome = partes[partes.length - 1][0];
  return `${primeiraLetraPrimeiroNome}${primeiraLetraUltimoNome}`;
}

export const getTempoRestante = (dtFim) => {
  const diffDias = getDiffDias(dtFim);

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

export const getDiffDias = (dtFim) => {
  const hoje = new Date();
  const dataAlvo = new Date(dtFim);
  hoje.setHours(0, 0, 0, 0);
  dataAlvo.setHours(0, 0, 0, 0);

  const diffMs = dataAlvo.getTime() - hoje.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}
