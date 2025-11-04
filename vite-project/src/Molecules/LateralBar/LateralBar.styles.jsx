import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)(({ diminuido }) => ({
    width: diminuido ? '100px' : '300px',
    minWidth: diminuido ? '100px' : '300px',
    maxWidth: diminuido ? '100px' : '350px',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
}));

export const Header = styled(Box)({
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
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
    gap: '1rem',
    paddingInline: '1rem',
    flex: 1,
}));

export const ChipZone = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '0.5rem',
    flexWrap: 'wrap',
});

export const CardZone = styled(Box)(({
    overflowY: 'auto',
    maxHeight: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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
    padding: '0.5rem 1rem 0.5rem 1rem',
    gap: '0.75rem',
    flexDirection: 'row',
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