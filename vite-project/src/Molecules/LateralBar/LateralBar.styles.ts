import { Box, Chip } from '@mui/material';
import { styled } from '@mui/system';

interface LateralNavBarProps {
    diminuido?: boolean;
}

export const LateralNavBar = styled(Box)<LateralNavBarProps>(({ theme, diminuido }) => ({
    width: diminuido ? '8%' : '20%',
    minWidth: diminuido ? '8%' : '20%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
}));

export const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
});

export const DivisorOne = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '0.5rem',
});

export const DivisorTwo = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexGrow: 1,
    minHeight: 0,
    paddingBottom: '0.5rem',
}));

export const ChipZone = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '0.5rem'
});

export const CardZone = styled(Box)(({
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingInline: '0.5rem',
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#aaa',
    },
}));

interface ItemProps {
    telaAtual?: string | null;
    item?: string;
    diminuido?: boolean;
}

export const Item = styled(Box)<ItemProps>(({ theme, telaAtual, item, diminuido }) => ({
    display: 'flex',
    cursor: 'pointer',
    padding: diminuido ? '0.8rem' : '0.6rem 1rem',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: diminuido ? 'center' : 'start',
    borderRadius: '10px',
    backgroundColor: theme.palette.background.default,
    transition: 'background 0.2s',
    border: telaAtual === item && telaAtual != null ? 'solid #084B8A 2px' : null,
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Title = styled('p')(({ theme }) => ({
    fontWeight: 600,
    fontSize: '13px',
    color: theme.palette.text.primary,
}));

interface ChipElementProps {
    filtro?: boolean;
    cor?: string;
}

export const ChipElement = styled(Chip)<ChipElementProps>(({ theme, filtro, cor }) => ({
    backgroundColor: filtro ? cor : theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontSize: '12px'
}))
