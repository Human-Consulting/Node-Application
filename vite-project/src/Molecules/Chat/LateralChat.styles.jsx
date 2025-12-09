import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralMessage = styled(Box)(({ theme }) => ({
    width: '25%',
    height: '100%',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: '0.5rem',
    gap: '1rem',
    zIndex: 6,
}));

export const LateralHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
}));

export const ItemHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
}));

export const LateralList = styled(Box)(({ theme }) => ({
    overflowY: 'auto',
    flex: 1,
    paddingInline: '0.5rem',
    width: '100%',
    boxSizing: 'border-box',

    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.action.hover,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.action.selected,
    },
}));

export const ContactItem = styled(Box)(({ theme, active }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    border: active
        ? `1px solid ${theme.palette.primary.main}`
        : `1px solid transparent`,
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));
