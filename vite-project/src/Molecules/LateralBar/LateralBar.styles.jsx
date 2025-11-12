import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)(({ diminuido }) => ({
    width: diminuido ? '8%' : '20%',
    minWidth: diminuido ? '8%' : '20%',
    backgroundColor: '#000000',
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

export const DivisorTwo = styled(Box)(({
    backgroundColor: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexGrow: 1,
    minHeight: 0,
    paddingBottom: '0.5rem'
}));

export const ChipZone = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '0.5rem'
});

export const CardZone = styled(Box)(({
    overflowY: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingInline: '0.5rem',
    '&::-webkit-scrollbar': {
        width: '8px',
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

export const Item = styled(Box)(({ telaAtual, item, diminuido }) => ({
    display: 'flex',
    cursor: 'pointer',
    padding: diminuido ? '1rem' : '0.5rem 0 0.5rem 0',
    padding: diminuido ? '0.8rem' : '0.6rem 1rem',
    gap: '0.75rem',
    alignItems: 'center',
    justifyContent: diminuido ? 'center' : 'start',
    borderRadius: '10px',
    backgroundColor: '#0d0d0d',
    transition: 'background 0.2s',
    border: telaAtual === item && telaAtual != null ? 'solid #084B8A 2px' : null,
    '&:hover': {
        backgroundColor: '#1a1a1a',
    },
}));

export const Title = styled('p')({
    fontWeight: 600,
    fontSize: '13px',
    color: '#fff',
});