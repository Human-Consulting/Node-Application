import { Box, styled } from "@mui/material";

export const AreaDataBox = styled(Box)({
    width: 'calc(100% / 4)',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

export const TextDefault = styled('p')({
    fontSize: '14px',
    fontWeight: 600
});

export const Number = styled('p')({
    fontSize: '22px',
    fontWeight: 600
});

export const ProgressBar = styled('div')({
    height: '10px',
    width: '100%',
    backgroundColor: '#474747',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
    
})

export const Progress = styled('div')({
    height: '10px',
    backgroundColor: '#36518c',
})
      