import {styled } from "@mui/material";

export const BoxBody = styled('div')({
    width: '100%',
    maxWidth: '250px',
    height: '225px',
    gap: '0.5rem',
    background: '#101010',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    position: 'relative',
    alignItems: 'center',
    padding: '0.5rem',
    marginBottom: '3rem',
});

export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '20px',
    color: '#fff'

})
export const Subtitle = styled('p')({
    fontWeight: 300,
    fontSize: '14px',
    color: '#fff',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
})

export const BodyCard = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
})
export const ProgressBar = styled('div')({
    height: '10px',
    width: '70%',
    backgroundColor: '#474747',
    borderRadius: '2px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
    
})

export const Progress = styled('div')({
    height: '10px',
    backgroundColor: '#36518c',
    borderRadius: '2px',
})
      