import { Box, styled } from "@mui/material";

export const ProjectsTypesBox = styled(Box)({
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    cursor: 'pointer',
});

export const ImageBox = styled('img')({
    width: '42px',
    height: '42px',
});

export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '12px',
    color: '#fff',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
});

export const SubTitle = styled('p')({
    fontWeight: 500,
    fontSize: '12px',
    color: '#d4d4d4',
    maxWidth: 'auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
})

