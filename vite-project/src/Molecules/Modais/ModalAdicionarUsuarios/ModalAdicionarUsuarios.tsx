import { Dialog, Stack, Typography, Pagination, TextField, Button, Checkbox, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUsuarios, Usuario, PagedResponse } from "../../../Utils/cruds/CrudsUsuario";
import { Sala } from "../../../Utils/cruds/CrudsSala";
import { Close, Search } from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Content, Actions } from "../../Mudal2/Modal.style";
import { useAuth } from "../../../context/AuthContext";

interface ModalAdicionarUsuariosProps {
    open: boolean;
    onClose: () => void;
    sala?: Pick<Sala, 'fkEmpresa' | 'participants'> | null;
    onConfirm: (usuarios: Usuario[]) => void;
}

const ModalAdicionarUsuarios = ({ open, onClose, sala, onConfirm }: ModalAdicionarUsuariosProps) => {
    const [page, setPage] = useState(0);
    const [busca, setBusca] = useState("");

    const participantesOriginais = sala?.participants?.map(u => u.idUsuario) ?? [];
    const [selecionados, setSelecionados] = useState<(number | string | undefined)[]>(participantesOriginais);
    const [usuariosCache, setUsuariosCache] = useState<Usuario[]>([]);

    const { usuario: usuarioLogado } = useAuth();
    const { idEmpresa } = useParams();

    const ehConsultor = !!usuarioLogado?.permissao?.includes('CONSULTOR');
    const fkEmpresaResolved = sala?.fkEmpresa == null ? idEmpresa : sala.fkEmpresa;

    // Not backed by an existing cache elsewhere - this is the only screen
    // that fetches usuarios filtered by `comConsultores`, so it gets its own
    // queryKey instead of colliding with MainContent's `['usuarios', ...]`
    // (which always fetches with comConsultores=false).
    const usuariosQuery = useQuery<PagedResponse<Usuario> | null>({
        queryKey: ['usuariosParaSala', ehConsultor ? fkEmpresaResolved : Number(idEmpresa), page, busca, ehConsultor],
        queryFn: () => ehConsultor
            ? getUsuarios(fkEmpresaResolved as number | string, page, 4, busca, true)
            : getUsuarios(Number(idEmpresa), page, 4, busca, false),
        enabled: open,
    });

    // Memoized so the "merge into usuariosCache" effect below only reruns
    // when the underlying query data actually changes, not on every render.
    const novosUsuarios = useMemo(() => usuariosQuery.data?.content || [], [usuariosQuery.data]);
    const novaTotalPages = usuariosQuery.data?.totalPages || 1;

    useEffect(() => {
        if (open) {
            setSelecionados(participantesOriginais);
            setUsuariosCache(sala?.participants ?? []);
            setPage(0);
            setBusca("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, sala]);

    useEffect(() => {
        setUsuariosCache(prev => {
            const idsExistentes = prev.map(u => u.idUsuario);
            const novos = novosUsuarios.filter(u => !idsExistentes.includes(u.idUsuario));
            return [...prev, ...novos];
        });
    }, [novosUsuarios]);

    const toggleUsuario = (id: number | string | undefined) => {
        setSelecionados((prev) => {
            const jaSelecionado = prev.includes(id);

            if (jaSelecionado) {
                return prev.filter(s => s !== id);
            } else {
                const usuarioNaPagina = novosUsuarios.find(u => u.idUsuario === id);
                if (usuarioNaPagina && !usuariosCache.some(u => u.idUsuario === id)) {
                    setUsuariosCache(prevCache => [...prevCache, usuarioNaPagina]);
                }
                return [...prev, id];
            }
        });
    };

    const confirmar = () => {
        const objetosSelecionados = usuariosCache.filter(u => selecionados.includes(u.idUsuario));
        onConfirm(objetosSelecionados);
        setSelecionados([]);
        onClose();
    };

    const limparSelecao = (id: number | string | undefined) => {
        setSelecionados(prev => prev.filter(s => s !== id));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Content>
                <Stack gap={2}>

                    {/* CAMPO DE BUSCA */}
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Search sx={{ color: "text.primary" }} />
                        <TextField
                            autoFocus
                            fullWidth
                            value={busca}
                            onChange={(e) => setBusca(e.target.value.toLowerCase())}
                            placeholder="Buscar usuário..."
                            InputProps={{ sx: { color: "text.primary" } }}
                        />
                        <Close sx={{ color: "text.primary", cursor: "pointer" }} onClick={() => setBusca("")} />
                    </Stack>

                    {/* CHIPS DOS SELECIONADOS */}
                    {selecionados.length > 0 && (
                        <Stack direction="row" gap={1} flexWrap="wrap">
                            {selecionados.map(id => {
                                const usuario = usuariosCache.find(u => u.idUsuario === id);
                                if (!usuario) return null;
                                return (
                                    <Box key={id} sx={{ background: "background.paper", px: 1.5, py: 0.5, borderRadius: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography fontSize={12} color="text.primary">
                                            {usuario.nome}
                                        </Typography>
                                        {!participantesOriginais.includes(usuario.idUsuario) &&
                                            (<Close fontSize="small" sx={{ cursor: "pointer" }} onClick={() => limparSelecao(id)} />)
                                        }
                                    </Box>
                                );
                            })}
                        </Stack>
                    )}

                    {/* LISTA PAGINADA */}
                    {novosUsuarios.map((u) => (
                        <Stack
                            key={u.idUsuario}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ background: "background.paper", borderRadius: 1, p: 1 }}
                        >
                            <Box>
                                <Typography color="text.primary" fontWeight="bold">{u.nome}</Typography>
                                <Typography color="text.secondary" fontSize={12}>{u.cargo}</Typography>
                            </Box>

                            <Checkbox
                                checked={selecionados.includes(u.idUsuario) || u.idUsuario == usuarioLogado?.idUsuario}
                                disabled={participantesOriginais.includes(u.idUsuario) || u.idUsuario == usuarioLogado?.idUsuario}
                                onChange={() => toggleUsuario(u.idUsuario)}
                            />
                        </Stack>
                    ))}

                    <Pagination
                        page={page + 1}
                        count={novaTotalPages}
                        onChange={(_e, v) => setPage(v - 1)}
                        sx={{ "& .MuiPaginationItem-root": { color: "text.primary" } }}
                    />
                </Stack>
            </Content>

            <Actions sx={{ background: "background.paper" }}>
                <Button onClick={onClose} sx={{ color: "text.secondary" }}>Cancelar</Button>
                <Button onClick={confirmar} variant="contained" sx={{ bgcolor: "#1976d2" }}>
                    Confirmar
                </Button>
            </Actions>
        </Dialog>
    );
};


export default ModalAdicionarUsuarios;
