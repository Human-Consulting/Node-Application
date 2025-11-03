export const useWarningValidator = (impedimento, dataFinal) => {
  if (!dataFinal) return null;

  const hoje = new Date();
  const final = new Date(dataFinal);
  const diffMs = final - hoje;
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  if (diffDias <= 7 && impedimento) {
    return "#ff1744"; 
  } else if (diffDias >7 && impedimento ) {
    return "#ffca28"; 
  } else {
    return "#28a745"; 
  }
};
