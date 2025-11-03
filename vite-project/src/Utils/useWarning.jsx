import { Block, Check } from "@mui/icons-material";
import { Box } from "@mui/material";

export const useWarningValidator = (impedimento, dataFinal) => {
  const hoje = new Date();
  const final = new Date(dataFinal);
  const diffMs = final - hoje;
  const diffDias = diffMs / (1000 * 60 * 60 * 24);

  let cor, Icon;

  if (!impedimento) {
    cor = "#28a745";
    Icon = Check;
  } else if (diffDias <= 7) {
    cor = "#ff1744";
    Icon = Block;
  } else {
    cor = "#ffca28";
    Icon = Block;
  }

  const Componente = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `4px solid ${cor}`,
        borderRadius: '50%',
        width: 40,
        height: 40,
        bgcolor: 'transparent',
      }}
    >
      <Icon sx={{ fontSize: 28, color: cor }} />
    </Box>
  );

  return { cor, Icon, Componente };
};
