import { Chip, Stack } from '@mui/material'
import { CardZone, ChipZone, DivisorOne, DivisorTwo, LateralNavBar, Title } from './LateralBar.styles'
import HomeIcon from '@mui/icons-material/Home';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupIcon from '@mui/icons-material/Group';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ProjectsTypes from '../../Atoms/ProjectsTypes';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@mui/material';
import { useState } from 'react';

const LateralBar = ({ projetos, empresas }) => {

    const [projetosFiltrados, setProjetosFiltrados] = useState(projetos);
    const [empresasFiltradas, setEmpresasFiltradas] = useState(empresas);
    const [filtroConcluido, setFiltroConcluido] = useState(false);
    const [filtroImpedimento, setFiltroImpedimento] = useState(false);

    const { nomeEmpresa, idEmpresa } = useParams();
    const navigate = useNavigate()
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleOpenHome = () => {
        if (usuarioLogado.permissao.includes('CONSULTOR')) navigate(`/Home/Empresas/1`);
        else navigate(`/Home/${nomeEmpresa}/${idEmpresa}`);
    }

    const handleOpenUsuarios = () => {
        navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Usuarios`);
    }

    const handleOpenDash = () => {
        navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash`);
    }

    const handleExit = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleClick = (acao) => {
        if (acao == 'concluido') {
            setFiltroConcluido(!filtroConcluido);
            setFiltroImpedimento(false);
            setProjetosFiltrados(projetos.filter(projeto => projeto.progresso == 100));
            setEmpresasFiltradas(empresas.filter(empresa => empresa.progresso == 100));
        } else if (acao == 'impedido') {
            setFiltroImpedimento(!filtroImpedimento);
            setFiltroConcluido(false);
            setProjetosFiltrados(projetos.filter(projeto => projeto.comImpedimento));
            setEmpresasFiltradas(empresas.filter(empresa => empresa.comImpedimento));
        } else if (acao == 'todos') {
            setFiltroConcluido(false);
            setFiltroImpedimento(false);
            setProjetosFiltrados(projetos);
            setEmpresasFiltradas(empresas);
        }
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
                {idEmpresa != 1 ?
                    <Stack sx={{ cursor: 'pointer', padding: '0rem 1rem', gap: '0.5rem', flexDirection: 'row', alignItems: 'center', width: '100%', height: 'calc(100% / 2)', borderRadius: '10px', backgroundColor: '#0d0d0d' }} onClick={handleOpenDash}>
                        <InsightsIcon sx={{ color: '#ffff' }} />
                        <Title>
                            Dashboard Geral
                        </Title>

                    </Stack>
                    : null}
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
                        <Title>Menu Rápido</Title>
                    </Stack>
                    <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                        <Chip sx={{ backgroundColor: '#1D1D1D', color: '#fff', fontSize: '12px', }}
                            label="Todos" onClick={() => handleClick('todos')} />
                        
                        <Chip sx={{ backgroundColor: filtroConcluido ? '#2e7d32' : '#1D1D1D', color: '#fff', fontSize: '12px' }}
                            label="Concluídos" onClick={() => handleClick('concluido')} />
                        
                        <Chip sx={{ backgroundColor: filtroImpedimento ? '#D32F2F' : '#1D1D1D', color: '#fff', fontSize: '12px' }}
                            label="Impedídos" onClick={() => handleClick('impedido')} />
                    </Stack>

                </ChipZone>
                <CardZone>
                    {idEmpresa != 1 && projetosFiltrados.length > 0 ? projetosFiltrados.map(projeto => (
                        <ProjectsTypes entidade={projeto} />
                    ))
                        :
                        empresasFiltradas.length > 0 ? empresasFiltradas.filter(empresa => empresa.idEmpresa != 1).map(empresa => (
                            <ProjectsTypes entidade={empresa} />
                        )) : null
                    }
                </CardZone>
                <Stack>
                    <Button variant='outlined' sx={{ position: 'absolute', bottom: '5%', left: '1rem' }} onClick={handleExit}>Sair</Button>
                </Stack>
            </DivisorTwo>
        </LateralNavBar>
    )
}

export default LateralBar
