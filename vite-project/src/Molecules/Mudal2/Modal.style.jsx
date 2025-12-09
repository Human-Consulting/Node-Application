import { styled, DialogContent, DialogActions } from "@mui/material";

export const Content = styled(DialogContent)(({ theme }) => ({
  background: theme.palette.background.paper,   // Fundo interno do modal
  color: theme.palette.text.primary,            // Texto correto no tema
}));

export const Actions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.paper,   // Mesmo fundo do modal
  borderTop: `1px solid ${theme.palette.borderPrimary}`, // Separador elegante
}));
