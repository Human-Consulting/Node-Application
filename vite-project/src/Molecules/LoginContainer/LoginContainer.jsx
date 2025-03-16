import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import ContainerBoard from '../ContainerBoard/ContainerBoard'
import { Container, LoginTitulo } from '../ContainerBoard/ContainerBoard.styles'
import { ContainerFrase, IconeSample } from './LoginContainer.styles'
import { Stack } from '@mui/material'

export default function LoginContainer() {
  return (
    <Container>
      <ContainerFrase>
        <Stack sx={{width: '72%', gap: '2rem'}}>
          <IconeSample></IconeSample>
        <LoginTitulo sx={{fontSize: '150px', lineHeight: '120px', textDecorationColor: 'white', textDecoration: 'underline' }}>
          Human consulting
        </LoginTitulo>
        <p style={{fontSize: '24px', fontWeight: '300'}}>
        Sua ideia, <b>nosso planejamento</b>, e a <b>execução que garante o sucesso</b> do seu <b>projeto</b>.
        </p>
        </Stack>
        
      </ContainerFrase>

    <ShaderGradientCanvas
      style={{
       position: 'absolute',
       inset: 0,
       zIndex: 5,
      pointerEvents:'none'

      }}
    >
        
      <ShaderGradient
        control='query'
        urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=9.1&color1=%23000047&color2=%2393a2ca&color3=%23212121&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=50&rotationY=0&rotationZ=-60&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.5&uFrequency=0&uSpeed=0.3&uStrength=1.5&uTime=8&wireframe=false'
      />
  
    </ShaderGradientCanvas>
    <ContainerBoard>
        
    </ContainerBoard>
    
    </Container>
    
  )
}