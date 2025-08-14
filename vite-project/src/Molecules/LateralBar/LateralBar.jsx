import { Chip, Stack, Typography } from '@mui/material'
import { CardZone, ChipZone, DivisorOne, DivisorTwo, Header, Item, LateralNavBar, Title } from './LateralBar.styles'
import { Home, Insights, Chat, Group, Widgets, ChevronRight, ChevronLeft, Logout, HourglassEmpty, CheckCircle, Block } from '@mui/icons-material';
import ProjectsTypes from '../../Atoms/ProjectsTypes';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';

const LateralBar = ({ projetos, empresas, diminuirLateralBar, toogleLateralBar, telaAtual }) => {

    
    const [projetosFiltrados, setProjetosFiltrados] = useState(projetos);
    const [empresasFiltradas, setEmpresasFiltradas] = useState(empresas);
    const [filtroConcluido, setFiltroConcluido] = useState(false);
    const [filtroImpedimento, setFiltroImpedimento] = useState(false);
    const [menuRapidoAberto, setMenuRapidoAberto] = useState(true);
    
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

    const handleOpenChat = () => {
        navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Chat`);
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

    const toggleMenuRapido = () => {
        setMenuRapidoAberto(!menuRapidoAberto);
    }

    return (
        <LateralNavBar diminuido={diminuirLateralBar}>
            <Header>
                <Logout onClick={handleExit} sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#333'
                    }
                }} />
                {diminuirLateralBar ? null : <Typography variant="h6" sx={{ fontFamily: "Bebas Neue" }}>Human Consulting</Typography>}
                {diminuirLateralBar ? <ChevronRight onClick={toogleLateralBar} sx={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: '#333'
                    }
                }} /> : <ChevronLeft onClick={toogleLateralBar} sx={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    '&:hover': {
                        backgroundColor: '#333'
                    }
                }} />}
            </Header>
            <DivisorOne>
                <Item telaAtual={telaAtual} item="Home" diminuido={diminuirLateralBar} onClick={handleOpenHome}>
                    <Home />
                    {diminuirLateralBar ? null :
                        <Title>
                            Home
                        </Title>
                    }
                </Item>
                <Item telaAtual={telaAtual} item="Chat" diminuido={diminuirLateralBar} onClick={handleOpenChat}>
                    <Chat />
                    {diminuirLateralBar ? null :
                        <Title>
                            Chat
                        </Title>
                    }

                </Item>
                {idEmpresa != 1 ?
                    <>
                        <Item telaAtual={telaAtual} item="Dash" diminuido={diminuirLateralBar} onClick={handleOpenDash}>
                            <Insights />
                            {diminuirLateralBar ? null :
                                <Title>
                                    Dashboard Geral
                                </Title>
                            }
                        </Item>
                    </>
                    : null}
                <Item telaAtual={telaAtual} item="Usuarios" diminuido={diminuirLateralBar} onClick={handleOpenUsuarios}>
                    <Group />
                    {diminuirLateralBar ? null :
                        <Title>
                            Gerenciamento de Usuários
                        </Title>
                    }
                </Item>

            </DivisorOne>
            <DivisorTwo>
                <Item diminuido={diminuirLateralBar} sx={{ height: 'fit-content', padding: diminuirLateralBar ? '1rem' : '1rem 1rem 1rem 0' }} onClick={toggleMenuRapido}>
                    <Widgets />
                    {!diminuirLateralBar && (<Title style={{ flex: 1 }}>Menu Rápido</Title>)}
                    {menuRapidoAberto ? <ChevronLeft sx={{ transform: 'rotate(90deg)' }} /> : <ChevronLeft sx={{ transform: 'rotate(-90deg)' }} />}
                </Item>

                {menuRapidoAberto ? (
                    <>
                        {!diminuirLateralBar && (
                            <ChipZone>
                                <Chip sx={{ backgroundColor: '#1D1D1D', color: '#fff', fontSize: '12px' }}
                                    label="Todos" onClick={() => handleClick('todos')} />

                                <Chip sx={{ backgroundColor: filtroConcluido ? '#2e7d32' : '#1D1D1D', color: '#fff', fontSize: '12px' }}
                                    label="Concluídos" onClick={() => handleClick('concluido')} />

                                <Chip sx={{ backgroundColor: filtroImpedimento ? '#D32F2F' : '#1D1D1D', color: '#fff', fontSize: '12px' }}
                                    label="Impedidos" onClick={() => handleClick('impedido')} />
                            </ChipZone>
                        )}

                        <CardZone sx={{ marginInline: diminuirLateralBar ? '-15px' : 0 }}>
                            {idEmpresa != 1 && projetosFiltrados.length > 0 ? projetosFiltrados.map(projeto => (
                                <ProjectsTypes key={projeto.idProjeto} entidade={projeto} diminuirLateralBar={diminuirLateralBar} telaAtual={telaAtual} />
                            ))
                                :
                                empresasFiltradas.length > 0 ? empresasFiltradas
                                    .filter(empresa => empresa.idEmpresa != 1)
                                    .map(empresa => (
                                        <ProjectsTypes key={empresa.idEmpresa} entidade={empresa} diminuirLateralBar={diminuirLateralBar} />
                                    )) : null
                            }
                        </CardZone>
                    </>
                ) :
                    <Stack sx={{ display: 'flex', flex: 1, gap: '1.5rem', marginInline: '-5px', alignItems: diminuirLateralBar ? 'center' : 'start' }}>
                        <Typography sx={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stack sx={{ padding: '5px', border: 'solid #FFD700 2px', borderRadius: '50%' }}>
                                <HourglassEmpty sx={{ fontSize: '24px' }} />
                            </Stack>
                            {diminuirLateralBar ? null : "Ativos:"} {idEmpresa === 1 ? empresas.filter(p => p.progresso < 100 && !p.comImpedimento).length : projetos.filter(p => p.progresso < 100 && !p.comImpedimento).length}
                        </Typography>

                        <Typography sx={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stack sx={{ padding: '5px', border: 'solid #2e7d32 2px', borderRadius: '50%' }}>
                                <CheckCircle sx={{ fontSize: '24px' }} />
                            </Stack>
                            {diminuirLateralBar ? null : "Concluídos:"} {idEmpresa === 1 ? empresas.filter(p => p.progresso === 100).length : projetos.filter(p => p.progresso === 100).length}
                        </Typography>

                        <Typography sx={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Stack sx={{ padding: '5px', border: 'solid #D32F2F 2px', borderRadius: '50%' }}>
                                <Block sx={{ fontSize: '24px' }} />
                            </Stack>
                            {diminuirLateralBar ? null : "Com Impedimento:"} {idEmpresa === 1 ? empresas.filter(p => p.comImpedimento).length : projetos.filter(p => p.comImpedimento).length}
                        </Typography>
                    </Stack>
                }

            </DivisorTwo>
        </LateralNavBar>
    )
}

export default LateralBar
