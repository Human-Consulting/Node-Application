import { Dialog, DialogContent, DialogActions, Stack, Typography, Pagination, TextField, Button, Checkbox, Box } from "@mui/material";
import { getUsuarios } from "../../../Utils/cruds/CrudsUsuario";
import { Close, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const ModalAdicionarUsuarios = ({ open, onClose, sala, onConfirm }) => {
    const [novosUsuarios, setNovosUsuarios] = useState([]);
    const [novaTotalPages, setNovaTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [busca, setBusca] = useState("");

    const participantesOriginais = sala?.participants?.map(u => u.idUsuario) ?? [];
    const [selecionados, setSelecionados] = useState(participantesOriginais);
    const [usuariosCache, setUsuariosCache] = useState([]);

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    const { idEmpresa } = useParams();

    const buscarUsuarios = async (page = 0, nome = null) => {
        let usuariosRetornados;
        const fkEmpresa = sala?.fkEmpresa == null ? idEmpresa : sala.fkEmpresa;

        if (usuarioLogado.permissao.includes('CONSULTOR'))
            usuariosRetornados = await getUsuarios(fkEmpresa, page, 4, nome, true);
        else
            usuariosRetornados = await getUsuarios(Number(idEmpresa), page, 4, nome, false);

        setNovosUsuarios(usuariosRetornados?.content || []);
        setNovaTotalPages(usuariosRetornados?.totalPages || 1);
    };

    useEffect(() => {
        if (open) {
            setSelecionados(participantesOriginais);
            setUsuariosCache(sala?.participants ?? []);
            buscarUsuarios(0, "");
            setPage(0);
            setBusca("");
        }
    }, [open, sala]);

    useEffect(() => {
        if (open) buscarUsuarios(page, busca);
    }, [page, busca]);

    useEffect(() => {
        setUsuariosCache(prev => {
            const idsExistentes = prev.map(u => u.idUsuario);
            const novos = novosUsuarios.filter(u => !idsExistentes.includes(u.idUsuario));
            return [...prev, ...novos];
        });
    }, [novosUsuarios]);

    const toggleUsuario = (id) => {
        setSelecionados((prev) => {
            const jaSelecionado = prev.includes(id);

            if (jaSelecionado) {
                return prev.filter(s => s !== id);
            } else {
                const usuarioNaPagina = novosUsuarios.find(u => u.idUsuario === id);
                if (usuarioNaPagina && !usuariosCache.some(u => u.idUsuario === id)) {
                    setUsuariosCache(prev => [...prev, usuarioNaPagina]);
                }
                return [...prev, id];
            }
        });
    };

    const confirmar = () => {
        onConfirm(selecionados);
        setSelecionados([]);
        onClose();
    };

    const limparSelecao = (id) => {
        setSelecionados(prev => prev.filter(s => s !== id));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent sx={{ background: "#22272B" }}>
                <Stack gap={2}>

                    {/* CAMPO DE BUSCA */}
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Search sx={{ color: "#fff" }} />
                        <TextField
                            autoFocus
                            fullWidth
                            value={busca}
                            onChange={(e) => setBusca(e.target.value.toLowerCase())}
                            placeholder="Buscar usuário..."
                            InputProps={{ sx: { color: "#fff" } }}
                        />
                        <Close sx={{ color: "#fff", cursor: "pointer" }} onClick={() => setBusca("")} />
                    </Stack>

                    {/* CHIPS DOS SELECIONADOS */}
                    {selecionados.length > 0 && (
                        <Stack direction="row" gap={1} flexWrap="wrap">
                            {selecionados.map(id => {
                                const usuario = usuariosCache.find(u => u.idUsuario === id);
                                if (!usuario) return null;
                                return (
                                    <Box key={id} sx={{ background: "#1a1e22", px: 1.5, py: 0.5, borderRadius: 2, display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography fontSize={12} color="#fff">
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

                    {/* )} */}

                    {/* LISTA PAGINADA */}
                    {novosUsuarios.map((u) => (
                        <Stack
                            key={u.idUsuario}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ background: "#1a1e22", borderRadius: 1, p: 1 }}
                        >
                            <Box>
                                <Typography color="#fff" fontWeight="bold">{u.nome}</Typography>
                                <Typography color="#ccc" fontSize={12}>{u.cargo}</Typography>
                            </Box>

                            <Checkbox
                                checked={selecionados.includes(u.idUsuario)}
                                disabled={participantesOriginais.includes(u.idUsuario)}
                                onChange={() => toggleUsuario(u.idUsuario)}
                            />
                        </Stack>
                    ))}

                    <Pagination
                        page={page + 1}
                        count={novaTotalPages}
                        onChange={(e, v) => setPage(v - 1)}
                        sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ background: "#1a1e22" }}>
                <Button onClick={onClose} sx={{ color: "#aaa" }}>Cancelar</Button>
                <Button onClick={confirmar} variant="contained" sx={{ bgcolor: "#1976d2" }}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ModalAdicionarUsuarios;
