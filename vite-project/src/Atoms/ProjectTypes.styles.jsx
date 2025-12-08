import { Box, styled } from "@mui/material";

export const ProjectsTypesBox = styled(Box)(
  ({ theme, diminuido, idAtual, idItem, finalizado }) => ({
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: diminuido ? 'column' : 'row',
    justifyContent: 'start',
    alignItems: 'center',
    gap: diminuido ? '0.25rem' : '0.75rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '10px',

    backgroundColor: theme.palette.background.paper,

    border:
      idAtual == idItem && idAtual != null
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${theme.palette.borderPrimary}`,

    transition: 'background 0.2s',

    '&:hover': {
      backgroundColor: theme.palette.background.bgCard,
    },

    opacity: finalizado ? 0.25 : 1,
    transition: "opacity 0.3s ease",
  })
);

export const ImageBox = styled('img')({
  width: '42px',
  height: '42px',
  borderRadius: '8px',
  objectFit: 'cover'
});

export const Title = styled('p')(({ theme, diminuido }) => ({
  fontWeight: 600,
  fontSize: diminuido ? '10px' : '13px',
  color: theme.palette.text.primary,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  margin: 0,
}));

export const SubTitle = styled('p')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '11px',
  color: theme.palette.text.secondary,
  margin: 0,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));
