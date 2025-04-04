import { ButtonFilter, HeaderContent, InputSearch, MidleCarrousel, PrincipalContainerStyled, TituloHeader } from './PrincipalContainer.styles'
import { Avatar, Stack } from '@mui/material'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import MockList from '../../Mock/MockList/MockList'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';

const PrincipalContainer = () => {
    return (
        <PrincipalContainerStyled>
                <HeaderContent>
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
                            urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true'
                          />
                      
                        </ShaderGradientCanvas>
                    <Stack sx={{flexDirection: 'row', width: '100%', gap: '1rem', position: 'relative', zIndex: '6'}}>
                    <Avatar sx={{background: 'none', border: '1px solid gray'}}>OP</Avatar>
                    <ButtonFilter><FilterAltIcon/>Filtrar</ButtonFilter>
                        <InputSearch sx={{background: 'none'}} type='text' placeholder='Pesquise um projeto...'/>
                    </Stack>
                    <TituloHeader>Seus projetos</TituloHeader>
                </HeaderContent>
                <MidleCarrousel>
                    {MockList.map(Card => (
                    <ProjectsCard image={Card.image} subtitle={Card.subtitle} title={Card.title} key={Card.id} numberId={Card.id} status = {Card.status} progress={Card.progresso}></ProjectsCard>
                    ))}
                </MidleCarrousel>
        </PrincipalContainerStyled>
    )
 }

export default PrincipalContainer
