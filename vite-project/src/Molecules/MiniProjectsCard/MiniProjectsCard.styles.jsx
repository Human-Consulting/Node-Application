import {styled } from "@mui/material";

export const BoxBody = styled('div')({
    width: '200px',
    height: '175px',
    background: '#1d1d1d',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    borderRadius: '10px',
    flexShrink: 0,
    position: 'relative',
});

export const StatusCircle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    height: '32px',
    width: '32px',
    position: 'absolute',
    right: '-22px',
    top: '-14px'

})
export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '14px',
    color: '#fff',

})
export const Subtitle = styled('p')({
    fontWeight: 300,
    fontSize: '12px',
    color: '#fff',

})
export const HeaderCard = styled('div')({
    height: '50%',
    width: '100%',
    backgroundColor: '#1d1d1d',
    zIndex: '30',
    position: 'absolute',
    top: '0%',
    right: '0%',
    borderRadius: '10px 10px 0px 0px',
    overflow: 'hidden',
    backgroundSize: 'cover'
})

export const BodyCard = styled('div')({
    height: '50%',
    backgroundColor: '#1d1d1d',
    zIndex: '30',
    position: 'absolute',
    top: '60%',
    right: '0',
    left: '0',
    padding: '0.5rem',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
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
      