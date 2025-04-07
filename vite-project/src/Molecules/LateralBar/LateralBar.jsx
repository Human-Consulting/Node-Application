import { Chip, Stack } from '@mui/material'
import { CardZone, ChipZone, DivisorOne, DivisorTwo, LateralNavBar, Title } from './LateralBar.styles'
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupIcon from '@mui/icons-material/Group';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ProjectsTypes from '../../Atoms/ProjectsTypes';
import { useEffect, useState } from 'react';
import { getProjetos } from '../../Utils/cruds/CrudsProjeto'
import { useNavigate } from 'react-router';

const LateralBar = () => {
    const navigate = useNavigate()

    const [projetos, setProjetos] = useState([]);

    const atualizarProjetos = async () => {
        const projetos = await getProjetos();
        setProjetos(projetos);
    };

    const handleOpenHome = () => {
        navigate(`/Home`);
        console.log('estou')
    }

    useEffect(() => {
        atualizarProjetos();
    }, []);

    const handleClick = () => {
        console.log('0i')
    }


    return (
        <LateralNavBar>
            <DivisorOne>
                <Stack sx={{ padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }}>
                    <HomeIcon sx={{ color: '#ffff' }} />
                    <Title onClick={handleOpenHome}>
                        Home
                    </Title>
                </Stack>
                <Stack sx={{ padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }}>
                    <InsightsIcon sx={{ color: '#ffff' }} />
                    <Title>
                        Dashboard Geral
                    </Title>

                </Stack>
                <Stack sx={{ padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }}>
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
                        <ProjectsTypes projeto={projeto} />
                    ))}
                </CardZone>
            </DivisorTwo>
        </LateralNavBar>
    )
}

export default LateralBar
