export const getNome = (nome) => {
  const partes = nome.split(" ");
  const primeiraLetraPrimeiroNome = partes[0][0];
  const primeiraLetraUltimoNome = partes[partes.length - 1][0];
  return `${primeiraLetraPrimeiroNome}${primeiraLetraUltimoNome}`;
}

export const getTempoRestante = (dtFim) => {
  const hoje = new Date();
  const dataAlvo = new Date(dtFim);

  // Zera horas p/ evitar problemas de horário
  hoje.setHours(0, 0, 0, 0);
  dataAlvo.setHours(0, 0, 0, 0);

  const diffMs = dataAlvo - hoje;
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

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
