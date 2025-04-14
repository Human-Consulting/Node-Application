import { Chip, Stack } from '@mui/material'
import { CardZone, ChipZone, DivisorOne, DivisorTwo, LateralNavBar, Title } from './LateralBar.styles'
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupIcon from '@mui/icons-material/Group';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ProjectsTypes from '../../Atoms/ProjectsTypes';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';

const LateralBar = ({ projetos, idEmpresa }) => {
    const navigate = useNavigate()

    const handleOpenHome = () => {
        navigate(`/Home/${idEmpresa}`);
    }

    const handleOpenUsuarios = () => {
        navigate(`/Home/${idEmpresa}/Usuarios/${idEmpresa}`);
    }

    const handleExit = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleClick = () => {
    }


    return (
        <LateralNavBar>
            <DivisorOne>
                <Stack sx={{ cursor: 'pointer', padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }} onClick={handleOpenHome}>
                    <HomeIcon sx={{ color: '#ffff' }} />
                    <Title>
                        Home
                    </Title>
                </Stack>
                <Stack sx={{ cursor: 'pointer', padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }}>
                    <InsightsIcon sx={{ color: '#ffff' }} />
                    <Title>
                        Dashboard Geral
                    </Title>

                </Stack>
                <Stack sx={{ cursor: 'pointer', padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }} onClick={handleOpenUsuarios}>
                    <GroupIcon sx={{ color: '#ffff' }} />
                    <Title>
                        Gerenciamento de Usuários
                    </Title>
                </Stack>

            </DivisorOne>
            <DivisorTwo>
                <ChipZone>
                    <Stack sx={{ padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center' }}>
                        <WidgetsIcon sx={{ color: '#ffff' }} />
                        <Title>Menu rapido</Title>
                    </Stack>
                    <Stack sx={{ padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center' }}>
                        <Chip sx={{ background: '#1d1d1d', color: '#fff' }} label="Concluidos" onClick={handleClick} />
                        <Chip sx={{ background: '#1d1d1d', color: '#fff' }} label="Impedidos" onClick={handleClick} />
                        <Chip sx={{ background: '#1d1d1d', color: '#fff' }} label="Atenção" onClick={handleClick} />
                        <Chip sx={{ background: '#1d1d1d', color: '#fff' }} label="Certo" onClick={handleClick} />
                    </Stack>

                </ChipZone>
                <CardZone>
                    {projetos.map(projeto => (
                        <ProjectsTypes idEmpresa={idEmpresa} projeto={projeto} />
                    ))}
                </CardZone>
                <Button variant='outlined' sx={{ position: 'absolute', bottom: '5%', left: '1rem' }} onClick={handleExit}>Sair</Button>
            </DivisorTwo>
        </LateralNavBar>
    )
}

export default LateralBar
