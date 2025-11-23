import { Box, styled } from "@mui/material";

export const TarefaBody = styled(Box)(({ theme, inclui, finalizado }) => ({
    width: '100%',
    display: 'flex',
    fontSize: '14px',
    flexDirection: 'column',
    gap: '1rem',
    padding: '0.5rem',
    justifyContent: 'center',

    // CARD — antes: #1A1A1A
    background: theme.palette.background.paper,
    borderRadius: '10px',

    // antes: '#FFFFFF'
    border: `solid ${
        inclui ? theme.palette.custom.textPrimary : "transparent"
    } 3px`,

    opacity: finalizado ? 0.25 : 1,
    transition: "opacity 0.3s ease",
}));

export const ProgressBar = styled('div')(({ theme }) => ({
    height: '10px',
    width: '70%',
    flex: 1,

    // antes: #2A2A2A
    backgroundColor: theme.palette.custom.sidebarItem,

    borderRadius: '2px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
}));

export const Progress = styled('div')(({ theme }) => ({
    height: '10px',

    // antes: #36518C
    backgroundColor: theme.palette.primary.main,

    borderRadius: '2px',
}));
