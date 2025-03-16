import { Box, styled } from "@mui/material";

export const ProjectsTypesBox = styled(Box)({
    width: '100%',
    height: '42px',
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem'
});

export const ImageBox = styled('img')({
    width: '42px',
    height: '42px',
});
export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '18px',
    color: '#fff',

})
export const SubTitle = styled('p')({
    fontWeight: 500,
    fontSize: '12px',
    color: '#d4d4d4',

})

