import {styled } from "@mui/material";

export const BoxBody = styled('div')({
    width: 'calc(90%)',
    height: '200px',
    background: '#1d1d1d',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    borderRadius: '10px',
    flexShrink: 0,
    position: 'relative',
    alignItems: 'center',
    paddingTop: '0.5rem'
});

export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '20px',
    color: '#fff'

})
export const Subtitle = styled('p')({
    fontWeight: 300,
    fontSize: '14px',
    color: '#fff'

})

export const BodyCard = styled('div')({
    height: '50%',
    backgroundColor: '#1d1d1d',
    top: '60%',
    padding: '0.5rem',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '90%'
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
      