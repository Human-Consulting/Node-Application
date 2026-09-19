import { Stack, Tooltip, Typography, Pagination, IconButton, Box, Popover, TextField, ButtonBase } from '@mui/material'
import { CardZone, ChipElement, ChipZone, DivisorOne, DivisorTwo, Header, Item, LateralNavBar, Title } from './LateralBar.styles'
import { Home, Insights, Chat, Group, Widgets, ChevronRight, ChevronLeft, Logout, Search, DarkMode, LightMode } from '@mui/icons-material';
import ProjectsTypes, { ProjectsTypesEntidade } from '../../Atoms/ProjectsTypes';
import { useNavigate, useParams } from 'react-router';
import { MouseEvent, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useColorMode } from '../../context/ColorModeContext';

interface LateralBarProps {
    // menuRapido/kpis shapes are consumed loosely here (paged-object-like
    // fields such as .content/.totalPages and ad-hoc kpi fields) which don't
    // line up 1:1 with the array-returning crud signatures in
    // CrudsLateralBars.ts — kept intentionally loose rather than forcing a
    // mismatched type onto pre-existing runtime data.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuRapido?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kpis?: any;
    atualizarLaterais: (params?: { idEmpresa?: string; page?: number; nome?: string | null; impedidos?: boolean; concluidos?: boolean }) => void | Promise<unknown>;
    diminuirLateralBar?: boolean;
    toogleLateralBar: () => void;
    telaAtual?: string | null;
}

const LateralBar = ({ menuRapido, kpis, atualizarLaterais, diminuirLateralBar, toogleLateralBar, telaAtual }: LateralBarProps) => {

    const [menuLista, setMenuLista] = useState<ProjectsTypesEntidade[]>(menuRapido?.content || []);
    const [filtroConcluido, setFiltroConcluido] = useState(false);
    const [filtroImpedimento, setFiltroImpedimento] = useState(false);
    const [menuRapidoAberto] = useState(true);
    const [totalPages, setTotalPages] = useState(menuRapido?.totalPages || 0);
    const [page, setPage] = useState(0);

    const caosList = kpis?.impedidos?.length || 0;

    const { nomeEmpresa, idEmpresa } = useParams();
    const navigate = useNavigate()
    const { usuario: usuarioLogado, logout } = useAuth();
    const { mode, toggleMode } = useColorMode();
    const [buscaTitulo, setBuscaTitulo] = useState("");

    const handleOpenHome = () => {
        if (usuarioLogado?.permissao?.includes('CONSULTOR')) navigate(`/Home/Empresas/1`);
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
        logout();
        navigate('/');
    }

    const handleClick = (acao: 'concluido' | 'impedido') => {
        if (acao == 'concluido') {
            setFiltroConcluido(prev => !prev);
            setFiltroImpedimento(false);
        } else if (acao == 'impedido') {
            setFiltroImpedimento(prev => !prev);
            setFiltroConcluido(false);
        }
    }

    useEffect(() => {
        let nome: string | null = null;
        if (buscaTitulo.length > 0) nome = buscaTitulo.toLowerCase();
        if (filtroConcluido) {
            atualizarLaterais({ idEmpresa, concluidos: true, nome });
        } else if (filtroImpedimento) {
            atualizarLaterais({ idEmpresa, impedidos: true, nome });
        } else {
            atualizarLaterais({ idEmpresa, page: 0, nome });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtroConcluido, filtroImpedimento, buscaTitulo]);

    useEffect(() => {
        setMenuLista(menuRapido?.content || []);
        setTotalPages(menuRapido?.totalPages || 0);
    }, [menuRapido])

    useEffect(() => {
        atualizarLaterais({ idEmpresa: idEmpresa, page: page });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, nomeEmpresa])

    const [anchorSearch, setAnchorSearch] = useState<HTMLElement | null>(null);

    const handleOpenSearch = (event: MouseEvent<HTMLElement>) => {
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
                    <IconButton onClick={handleExit} sx={{
                        padding: 0,
                        borderRadius: '50%',
                        '&:hover': {
                            backgroundColor: '#333'
                        }
                    }}>
                        <Logout sx={{ cursor: 'pointer' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={mode === 'dark' ? 'Tema claro' : 'Tema escuro'}>
                    <IconButton onClick={toggleMode} sx={{
                        padding: 0,
                        borderRadius: '50%',
                        '&:hover': {
                            backgroundColor: '#333'
                        }
                    }}>
                        {mode === 'dark' ? <LightMode sx={{ cursor: 'pointer' }} /> : <DarkMode sx={{ cursor: 'pointer' }} />}
                    </IconButton>
                </Tooltip>
                {diminuirLateralBar ? null : <Typography variant="h6" sx={{ fontFamily: "Bebas Neue" }}>Human Consulting</Typography>}
                {diminuirLateralBar ?
                    <IconButton onClick={toogleLateralBar} sx={{
                        padding: 0,
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: '#333' }
                    }}>
                        <ChevronRight sx={{ cursor: 'pointer' }} />
                    </IconButton>
                    :
                    <IconButton onClick={toogleLateralBar} sx={{
                        padding: 0,
                        borderRadius: '50%',
                        '&:hover': { backgroundColor: '#333' }
                    }}>
                        <ChevronLeft sx={{ cursor: 'pointer' }} />
                    </IconButton>
                }
            </Header>
            <DivisorOne>
                <Item component={ButtonBase} telaAtual={telaAtual} item="Home" diminuido={diminuirLateralBar} onClick={handleOpenHome}>
                    <Home />
                    {diminuirLateralBar ? null :
                        <Title>
                            Home
                        </Title>
                    }
                </Item>
                <Item component={ButtonBase} telaAtual={telaAtual} item="Chat" diminuido={diminuirLateralBar} onClick={handleOpenChat}>
                    <Chat />
                    {diminuirLateralBar ? null :
                        <Title>
                            Chat
                        </Title>
                    }

                </Item>
                <Item component={ButtonBase} telaAtual={telaAtual} item="Dash" diminuido={diminuirLateralBar} onClick={handleOpenDash}>
                    <Insights />
                    {diminuirLateralBar ? null :
                        <Title>
                            Dashboard Geral
                        </Title>
                    }
                </Item>
                <Item component={ButtonBase} telaAtual={telaAtual} item="Usuarios" diminuido={diminuirLateralBar} onClick={handleOpenUsuarios}>
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
                </Item>

                {menuRapidoAberto ? (
                    <>
                        {!diminuirLateralBar && (
                            <ChipZone>
                                <ChipElement filtro={filtroConcluido} cor="#1976d2" label="Concluídos" onClick={() => handleClick('concluido')} />
                                <ChipElement filtro={filtroImpedimento} cor="#D32F2F" label={`Impedidos ${caosList > 0 ? `(${caosList})` : ''}`} onClick={() => handleClick('impedido')} />
                                <ChipElement label={<Search sx={{ fontSize: '16px' }} />} onClick={handleOpenSearch} />
                            </ChipZone>
                        )}
                        <CardZone>
                            {menuLista.length > 0 && menuLista.map(entidade => (
                                <ProjectsTypes key={entidade.idProjeto || entidade.idEmpresa} entidade={entidade} diminuirLateralBar={diminuirLateralBar} />
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
