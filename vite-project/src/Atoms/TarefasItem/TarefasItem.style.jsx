import { Box, styled } from "@mui/material";

export const TarefaBody = styled(Box)({
    width: '100%',
    minHeight: 'calc(250px - 0.5rem)',
    maxHeight: 'calc(250px - 0.5rem)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    background: '#000',
    paddingTop: '0.5rem',
    scrollSnapAlign: 'center',
    position: 'relative',

    '&::-webkit-scrollbar': {
        width: '0px',
      },
    
});
export const Progress = styled('div')({
  height: '100%',
  backgroundColor: '#36518c',
  borderRadius: '2px',
})