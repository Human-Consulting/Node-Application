import { Stack } from '@mui/material'
import { BoxDetail, ContainerBack, DashContainer, DashKpi, KpiContainer, TextDefault, TextDefaultKpi, Title } from './Dashboard.styles'
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient'
import LineChart from './LineChart/LineChart'
import MinimalBarChart from './BarChart/BarChart'
import AreaData from '../../Atoms/AreaData/AreaData'
import LensIcon from '@mui/icons-material/Lens';
import PizzaChart from './PizzaChart'
import RadialChart from './RadialChart'
import { useEffect } from 'react'

const Dashboard = ({ toogleLateralBar }) => {

  useEffect(() => {
    toogleLateralBar();
  }, [])

  return (
    <ContainerBack>
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',

        }}
      >

        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true'
        />

      </ShaderGradientCanvas>
      <Stack sx={{ width: '100%', height: '90vh%', overflowY: 'scroll', gap: '2rem', flex: '0 0 auto', position: 'relative', zIndex: '1000' }}>
        <KpiContainer>

          <Title>
            Dashboard de projetos
          </Title>
          <DashKpi>
            <Stack sx={{ bgcolor: '#0d0d0d', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Stack sx={{ alignItems: 'start' }}>
                <TextDefaultKpi sx={{ fontWeight: '300' }}>Quantidade total</TextDefaultKpi>
                <TextDefaultKpi sx={{ fontSize: '22px' }}>50K</TextDefaultKpi>
              </Stack>
              <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
            </Stack>
            <Stack sx={{ bgcolor: '#0d0d0d', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Stack sx={{ alignItems: 'start' }}>
                <TextDefaultKpi sx={{ fontWeight: '300' }}>Quantidade total</TextDefaultKpi>
                <TextDefaultKpi sx={{ fontSize: '22px' }}>50K</TextDefaultKpi>
              </Stack>
              <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
            </Stack>
            <Stack sx={{ bgcolor: '#0d0d0d', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Stack sx={{ alignItems: 'start' }}>
                <TextDefaultKpi sx={{ fontWeight: '300' }}>Quantidade total</TextDefaultKpi>
                <TextDefaultKpi sx={{ fontSize: '22px' }}>50K</TextDefaultKpi>
              </Stack>
              <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
            </Stack>
            <Stack sx={{ bgcolor: '#0d0d0d', padding: '0rem 1rem', borderRadius: '20px', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Stack sx={{ alignItems: 'start' }}>
                <TextDefaultKpi sx={{ fontWeight: '300' }}>Quantidade total</TextDefaultKpi>
                <TextDefaultKpi sx={{ fontSize: '22px' }}>50K</TextDefaultKpi>
              </Stack>
              <LensIcon sx={{ fontSize: '2.5rem', color: '#d4d4d4' }}></LensIcon>
            </Stack>
          </DashKpi>
          <BoxDetail>
            <PizzaChart></PizzaChart>
            <RadialChart></RadialChart>
          </BoxDetail>

        </KpiContainer>

        <DashContainer>
          <Stack sx={{ bgcolor: '#0d0d0d', borderRadius: '20px', width: '100%', height: '100%', padding: '1rem', justifyContent: 'space-between' }}>
            <MinimalBarChart></MinimalBarChart>
            <Stack>
              <TextDefault sx={{ color: '#eeeeee' }}>Área com mais entrega</TextDefault>
              <TextDefault sx={{ fontSize: '12px', fontWeight: '400' }}>Nos ultimos meses</TextDefault>

            </Stack>

            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <AreaData></AreaData>
              <AreaData></AreaData>
              <AreaData></AreaData>
            </Stack>

          </Stack>
          <Stack sx={{ bgcolor: '#0d0d0d', borderRadius: '20px', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <LineChart></LineChart>

          </Stack>
        </DashContainer>
      </Stack>
    </ContainerBack>
  )
}

export default Dashboard
