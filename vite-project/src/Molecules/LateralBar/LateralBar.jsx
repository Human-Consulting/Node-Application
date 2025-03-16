
import { Chip, Stack } from '@mui/material'
import { CardZone, ChipZone, DivisorOne, DivisorTwo, LateralNavBar, Title } from './LateralBar.styles'
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ProjectsTypes from '../../Atoms/ProjectsTypes';
import MockList from '../../Mock/MockList/MockList';

const LateralBar = () => {
    const handleClick = () => {
        console.log('0i')
    }
    return (
        <LateralNavBar>
            <DivisorOne>
                <Stack sx={{padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d'}}>
                    <HomeIcon sx={{color: '#ffff'}}/>
                    <Title>
                        Home
                    </Title>
                </Stack>
                <Stack sx={{padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d'}}>
                    <AssessmentIcon sx={{color: '#ffff'}}/>
                    <Title>
                        Relatório
                    </Title>

                </Stack>

            </DivisorOne>
            <DivisorTwo>
                <ChipZone>
                <Stack sx={{padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center'}}>
                <WidgetsIcon sx={{color: '#ffff'}}/>
                <Title>Menu rapido</Title>
                </Stack>
                <Stack sx={{padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center'}}>
                <Chip sx={{background: '#1d1d1d', color: '#fff'}} label="Concluidos" onClick={handleClick} />
                <Chip sx={{background: '#1d1d1d', color: '#fff'}} label="Impedidos" onClick={handleClick} />
                <Chip sx={{background: '#1d1d1d', color: '#fff'}} label="Atenção" onClick={handleClick} />
                <Chip sx={{background: '#1d1d1d', color: '#fff'}} label="Certo" onClick={handleClick} />
            </Stack>

                </ChipZone>
                <CardZone>
                    {MockList.map(Card => (
                                  <ProjectsTypes urlImage={Card.image} subtitle={Card.subtitle} title={Card.title} key={Card.id} progresso={Card.progresso} status={Card.status} />
                                ))}
                </CardZone>
            </DivisorTwo>
        </LateralNavBar>
    )
}

export default LateralBar
