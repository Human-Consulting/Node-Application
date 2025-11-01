import { Box, styled } from "@mui/material";

export const TarefaBody = styled(Box)({
    width: '100%',
    display: 'flex',
    fontSize: '14px',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0.5rem',
    justifyContent: 'center',
    background: '#22272B',
    borderRadius: '10px',
});

export const ProgressBar = styled('div')({
    height: '10px',
    width: '70%',
    flex: 1,
    backgroundColor: '#474747',
    borderRadius: '2px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
    
})

export const Progress = styled('div')({
    height: '10px',
    backgroundColor: '#36518c',
    borderRadius: '2px',
})