import { Box, styled } from "@mui/material";

export const ProjectsTypesBox = styled(Box)(({ diminuido, idAtual, idItem }) => ({
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
  backgroundColor: '#111',
  border: idAtual == idItem && idAtual != null ? 'solid #084B8A 2px' : null,
  transition: 'background 0.2s',
  '&:hover': {
    backgroundColor: '#1a1a1a',
  }
}));

export const ImageBox = styled('img')({
  width: '42px',
  height: '42px',
  borderRadius: '8px',
  objectFit: 'cover'
});

export const Title = styled('p')(({ diminuido }) => ({
  fontWeight: 600,
  fontSize: diminuido ? '10px' : '13px',
  color: '#fff',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  margin: 0,
}));

export const SubTitle = styled('p')({
  fontWeight: 400,
  fontSize: '11px',
  color: '#b0b0b0',
  margin: 0,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});
