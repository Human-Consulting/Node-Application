import { styled } from "@mui/material";

export const BoxBody = styled('div')(({ theme, finalizado }) => ({
    width: '100%',
    height: '100%',
    background: theme.palette.custom.cardBackground,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
    opacity: finalizado ? 0.25 : 1,
    transition: "opacity 0.3s ease"
}));

export const StatusCircle = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    position: 'absolute',
    right: '5px',
    top: '5px',
    zIndex: 10,
    backgroundColor: theme.palette.custom.statusCircle,
}));

export const Title = styled('p')(({ theme }) => ({
    fontWeight: 500,
    fontSize: '14px',
    color: theme.palette.iconPrimary,
    width: '70%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
}));

export const Subtitle = styled('p')(({ theme }) => ({
    fontWeight: 300,
    fontSize: '12px',
    color: theme.palette.custom.textSecondary,
    width: 'auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
}));

export const HeaderCard = styled('div')(({ theme }) => ({
    height: '50%',
    width: '100%',
    backgroundColor: theme.palette.custom.cardHeader,
    zIndex: '6',
    borderRadius: '10px 10px 0px 0px',
    overflow: 'hidden',
    backgroundSize: 'cover'
}));

export const BodyCard = styled('div')(() => ({
    height: '60%',
    zIndex: '30',
    padding: '0.5rem',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}));

export const ProgressBar = styled('div')(({ theme }) => ({
    height: '10px',
    width: '70%',
    backgroundColor: theme.palette.custom.progressBackground,
    borderRadius: '2px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
}));

export const Progress = styled('div')(({ theme }) => ({
    height: '10px',
    backgroundColor: theme.palette.custom.progressFill,
    borderRadius: '2px',
}));
