import { Box, styled } from "@mui/material";

export const AreaDataBox = styled(Box)({
    width: 'calc(100% / 4)',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    border: 'solid #fff 2px',
    borderRadius: '10px',
    padding: '0.5rem'
});

export const TextDefault = styled('p')({
    fontSize: '14px',
    fontWeight: 600,
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});

export const Number = styled('p')({
    fontSize: '16px',
    fontWeight: 600
});

export const ProgressBar = styled('div')({
    height: '10px',
    width: '70%',
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
      