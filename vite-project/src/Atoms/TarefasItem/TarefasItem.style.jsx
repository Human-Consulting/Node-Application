import { Box, styled } from "@mui/material";

export const TarefaBody = styled(Box)(({ inclui, finalizado }) => ({
    width: '100%',
    display: 'flex',
    fontSize: '14px',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0.5rem',
    justifyContent: 'center',

    // CARD
    background: '#1A1A1A', // bgCard
    borderRadius: '10px',
    border: `solid ${inclui ? '#FFF' : "transparent"} 3px`,
    opacity: finalizado ? 0.25 : 1,
    transition: "opacity 0.3s ease",
}));

export const ProgressBar = styled('div')({
    height: '10px',
    width: '70%',
    flex: 1,
    backgroundColor: '#2A2A2A', // border / bg-level-2
    borderRadius: '2px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
});

export const Progress = styled('div')({
    height: '10px',
    backgroundColor: '#36518C', // primary
    borderRadius: '2px',
});
