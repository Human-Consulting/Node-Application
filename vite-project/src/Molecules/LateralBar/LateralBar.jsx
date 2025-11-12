import { Chip, Stack, Tooltip, Typography, Pagination, IconButton, Box, Popover, TextField } from '@mui/material'
import { CardZone, ChipZone, DivisorOne, DivisorTwo, Header, Item, LateralNavBar, Title } from './LateralBar.styles'
import { Home, Insights, Chat, Group, Widgets, ChevronRight, ChevronLeft, Logout, HourglassEmpty, CheckCircle, Block, Search } from '@mui/icons-material';
import ProjectsTypes from '../../Atoms/ProjectsTypes';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';

const LateralBar = ({ menuRapido, kpis, atualizarLaterais, diminuirLateralBar, toogleLateralBar, telaAtual }) => {

    const [menuLista, setMenuLista] = useState(menuRapido?.content || []);
    const [filtroConcluido, setFiltroConcluido] = useState(false);
    const [filtroImpedimento, setFiltroImpedimento] = useState(false);
    const [menuRapidoAberto, setMenuRapidoAberto] = useState(true);
    const [totalPages, setTotalPages] = useState(menuRapido?.totalPages || 0);
    const [page, setPage] = useState(0);

    const caosList = kpis?.impedidos?.length || 0;
    const noneList = kpis?.totalAndamento || 0;
    const finalizadosList = kpis?.finalizados?.length || 0;

    const { nomeEmpresa, idEmpresa } = useParams();
    const navigate = useNavigate()
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    const [buscaTitulo, setBuscaTitulo] = useState("");

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
            setFiltroConcluido(prev => !prev);
            setFiltroImpedimento(false);
        } else if (acao == 'impedido') {
            setFiltroImpedimento(prev => !prev);
            setFiltroConcluido(false);
        }
    }

    useEffect(() => {
        let nome = null;
        if (buscaTitulo.length > 0) nome = buscaTitulo.toLowerCase();
        if (filtroConcluido) {
            atualizarLaterais({ idEmpresa, concluidos: true, nome });
        } else if (filtroImpedimento) {
            atualizarLaterais({ idEmpresa, impedidos: true, nome });
        } else {
            atualizarLaterais({ idEmpresa, page: 0, nome });
        }
    }, [filtroConcluido, filtroImpedimento, buscaTitulo]);

    useEffect(() => {
        setMenuLista(menuRapido?.content || []);
        setTotalPages(menuRapido?.totalPages || 0);
    }, [menuRapido])

    useEffect(() => {
        atualizarLaterais({ idEmpresa: idEmpresa, page: page });
    }, [page, nomeEmpresa])

    const toggleMenuRapido = () => {
        setMenuRapidoAberto(!menuRapidoAberto);
    }

    const [anchorSearch, setAnchorSearch] = useState(null);

    const handleOpenSearch = (event) => {
        setAnchorSearch(event.currentTarget);
    };

    const handleCloseSearch = () => {
        setAnchorSearch(null);
        setBuscaTitulo("");
    };

    return (
        <LateralNavBar diminuido={diminuirLateralBar}>
            <Header>
                <Tooltip title="Sair">
                    <Logout onClick={handleExit} sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#333'
                        }
                    }} />
                </Tooltip>
                {diminuirLateralBar ? null : <Typography variant="h6" sx={{ fontFamily: "Bebas Neue" }}>Human Consulting</Typography>}
                {diminuirLateralBar ?
                    <ChevronRight onClick={toogleLateralBar} sx={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: '#333' }
                    }} />
                    :
                    <ChevronLeft onClick={toogleLateralBar} sx={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: '#333' }
                    }} />
                }
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
                <Item telaAtual={telaAtual} item="Dash" diminuido={diminuirLateralBar} onClick={handleOpenDash}>
                    <Insights />
                    {diminuirLateralBar ? null :
                        <Title>
                            Dashboard Geral
                        </Title>
                    }
                </Item>
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
                <Item diminuido={diminuirLateralBar} //onClick={toggleMenuRapido}
                >
                    <Widgets />
                    {!diminuirLateralBar && (<Title style={{ flex: 1 }}>Menu Rápido</Title>)}
                    {/* {menuRapidoAberto ? <ChevronLeft sx={{ transform: 'rotate(90deg)' }} /> : <ChevronLeft sx={{ transform: 'rotate(-90deg)' }} />} */}
                </Item>

                {menuRapidoAberto ? (
                    <>
                        {!diminuirLateralBar && (
                            <ChipZone>
                                <Chip sx={{ backgroundColor: filtroConcluido ? '#1976d2' : '#1D1D1D', color: '#fff', fontSize: '12px' }}
                                    label="Concluídos" onClick={() => handleClick('concluido')} />

                                <Chip sx={{ backgroundColor: filtroImpedimento ? '#D32F2F' : '#1D1D1D', color: '#fff', fontSize: '12px' }}
                                    label={`Impedidos ${caosList > 0 ? `(${caosList})` : ''}`} onClick={() => handleClick('impedido')} />
                                <Chip sx={{ backgroundColor: '#1D1D1D', color: '#fff' }}
                                    label={<Search sx={{ fontSize: '16px' }} />} onClick={handleOpenSearch} />
                            </ChipZone>
                        )}

                        <CardZone sx={{ marginInline: diminuirLateralBar ? '-15px' : 0 }}>
                            {menuLista.length > 0 && menuLista.map(entidade => (
                                <ProjectsTypes key={entidade.idProjeto || entidade.idEmpresa} entidade={entidade} diminuirLateralBar={diminuirLateralBar} telaAtual={telaAtual} />
                            ))}
                        </CardZone>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="space-between"
                        >
                            {diminuirLateralBar ? (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <IconButton
                                        size="small"
                                        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                                        disabled={page === 0}
                                    >
                                        <ChevronLeft sx={{ color: "#fff", fontSize: 18 }} />
                                    </IconButton>

                                    <Box
                                        sx={{
                                            fontSize: "0.75rem",
                                            color: "#fff",
                                            backgroundColor: "#1976d2",
                                            borderRadius: "50%",
                                            width: "22px",
                                            height: "22px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {page + 1}
                                    </Box>

                                    <IconButton
                                        size="small"
                                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
                                        disabled={page + 1 >= totalPages}
                                    >
                                        <ChevronRight sx={{ color: "#fff", fontSize: 18 }} />
                                    </IconButton>
                                </Stack>
                            ) : (
                                <Pagination
                                    count={totalPages}
                                    page={page + 1}
                                    onChange={(e, value) => setPage(value - 1)}
                                    color="primary"
                                    size='small'
                                    siblingCount={1}
                                    boundaryCount={1}
                                    sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
                                />
                            )}
                        </Stack>
                    </>
                ) :
                    // <Stack sx={{ display: 'flex', flex: 1, gap: '1.5rem', marginInline: '-5px', alignItems: diminuirLateralBar ? 'center' : 'start' }}>
                    //     <Typography sx={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    //         <Stack sx={{ padding: '5px', border: 'solid #FFF 2px', borderRadius: '50%' }}>
                    //             <HourglassEmpty sx={{ fontSize: '24px' }} />
                    //         </Stack>
                    //         {diminuirLateralBar ? null : "Ativos:"} {noneList}
                    //     </Typography>

                    //     <Typography sx={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    //         <Stack sx={{ padding: '5px', border: 'solid #2e7d32 2px', borderRadius: '50%' }}>
                    //             <CheckCircle sx={{ fontSize: '24px' }} />
                    //         </Stack>
                    //         {diminuirLateralBar ? null : "Concluídos:"} {finalizadosList}
                    //     </Typography>

                    //     <Typography sx={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    //         <Stack sx={{ padding: '5px', border: 'solid #D32F2F 2px', borderRadius: '50%' }}>
                    //             <Block sx={{ fontSize: '24px' }} />
                    //         </Stack>
                    //         {diminuirLateralBar ? null : "Com Impedimento:"} {caosList}
                    //     </Typography>
                    // </Stack>
                    null
                }

            </DivisorTwo>

            <Popover
                open={Boolean(anchorSearch)}
                anchorEl={anchorSearch}
                onClose={handleCloseSearch}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ bgcolor: '#22272B', color: 'white', p: 1, borderRadius: 2 }}>
                    <TextField
                        autoFocus
                        placeholder={`Buscar ${nomeEmpresa == 'Empresas' ? 'empresa' : 'projeto'}...`}
                        variant="outlined"
                        size="small"
                        value={buscaTitulo}
                        onChange={(e) => setBuscaTitulo(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: '#ccc' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2' }
                            }
                        }}
                    />
                </Box>
            </Popover>
        </LateralNavBar>
    )
}

export default LateralBar
