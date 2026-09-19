import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { ElementType } from 'react';

export const LateralMessage = styled(Box)(({ theme }) => ({
    width: '25%',
    height: '100%',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: '0.5rem',
    gap: '1rem',
    zIndex: 6
}));

export const LateralHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
});

export const ItemHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export const LateralList = styled(Box)({
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
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#aaa',
    },
});

interface ActiveProps {
    active?: boolean;
    // Box is polymorphic at runtime (accepts `component`), but the styled()
    // callback-function overload used below narrows its exported prop type
    // away from that polymorphism - declared explicitly here so callers can
    // keep passing `component={ButtonBase}` as before.
    component?: ElementType;
}

export const ContactItem = styled(Box)(({ theme, active }: ActiveProps & { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    border: active ? '1px solid #3f5a88' : '1px solid transparent',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: theme.palette.divider,
    },
}));
