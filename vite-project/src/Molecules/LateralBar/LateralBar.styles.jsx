import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)(({ theme, diminuido }) => ({
    width: diminuido ? '8%' : '20%',
    minWidth: diminuido ? '8%' : '20%',
    backgroundColor: theme.palette.custom.sidebar,
    display: 'flex',
    flexDirection: 'column',
}));

export const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    color: theme.palette.iconPrimary,
}));

export const DivisorOne = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    color: theme.palette.iconPrimary,
}));

export const DivisorTwo = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.custom.sidebarItem,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexGrow: 1,
    minHeight: 0,
    paddingBottom: '0.5rem',
    paddingInline: '0.5rem',
}));

export const ChipZone = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '0.5rem',
    color: theme.palette.custom.textSecondary,
}));

export const CardZone = styled(Box)(({ theme }) => ({
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',

    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.custom.scrollbar,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.custom.scrollbarHover,
    },
}));

export const Item = styled(Box)(({ theme, telaAtual, item, diminuido }) => ({
    display: 'flex',
    cursor: 'pointer',
    padding: diminuido ? '0.8rem' : '0.6rem 1rem',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: diminuido ? 'center' : 'start',
    borderRadius: '10px',
    backgroundColor: theme.palette.custom.sidebarItem,
    transition: 'background 0.2s',
    border:
        telaAtual === item && telaAtual != null
            ? `solid ${theme.palette.custom.sidebarBorderSelected} 2px`
            : 'none',

    '&:hover': {
        backgroundColor: theme.palette.custom.sidebarItemHover,
    },

    '& svg': {
        color: 'unset !important',  // <- devolve o controle ao MUI
    }
}));


export const Title = styled('p')(({ theme }) => ({
    fontWeight: 600,
    fontSize: '13px',
    color: theme.palette.iconPrimary,
}));
