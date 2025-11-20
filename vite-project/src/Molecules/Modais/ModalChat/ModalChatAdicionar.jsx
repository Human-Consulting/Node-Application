import { Dialog, DialogContent, DialogActions, Stack, Typography, TextField, Button, Avatar, Box } from "@mui/material";
import ModalAdicionarUsuarios from "../ModalAdicionarUsuarios/ModalAdicionarUsuarios";
import { putSala, postSala } from "../../../Utils/cruds/CrudsSala";
import { inputStyle } from "../../Modal/Forms/Forms.styles";
import { Add, Close, PersonAdd } from "@mui/icons-material";
import { useState } from "react";
import { useWarningValidator } from "../../../Utils/useWarning";

const ModalChatAdicionar = ({ open, onClose, fkEmpresa, fkProjeto, atualizarSalas }) => {

    const [nome, setNome] = useState("");
    const [urlImagem, setUrlImagem] = useState(null);
    const [participantes, setParticipantes] = useState([]);
    const [modalUsuariosAberto, setModalUsuariosAberto] = useState(false);
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const validar = () => {
        if (!nome.trim()) {
            return false;
        }
        if (participantes.length === 0) {
            return false;
        }
        return true;
    };

    const criarSala = async () => {
        if (!validar()) return;
        console.log(participantes);
        const ids = participantes
            .filter(u => u.idUsuario !== usuarioLogado.idUsuario)
            .map(u => u.idUsuario);

        await postSala({
            nome,
            urlImagem,
            participantes: ids,
            idEditor: usuarioLogado.idUsuario,
            fkEmpresa,
            fkProjeto
        });

        atualizarSalas();
        limpar();
        onClose();
    };

    const limpar = () => {
        setNome("");
        setUrlImagem(null);
        setParticipantes([]);
        setModalUsuariosAberto(true);
    };

    const aoSelecionarUsuarios = (usuarios) => {
        // const selecionadosObjs = usuarios.filter(u => usuarios.includes(u.idUsuario));
        setParticipantes(usuarios);
        setModalUsuariosAberto(false);
    };

    const handleImagem = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => setUrlImagem(reader.result.split(",")[1]);
        reader.readAsDataURL(file);
    };

    const handleOnClose = () => {
        setModalUsuariosAberto(false);
        setParticipantes([]);
        setNome("");
        setUrlImagem(null);
        onClose();
    }

    return (
        <>
            {/* MODAL DE SELEÇÃO DE USUÁRIOS */}
            <ModalAdicionarUsuarios
                open={open && modalUsuariosAberto}
                onClose={() => {
                    setModalUsuariosAberto(false);
                }}
                // sala={{ participants: participantes.map(id => ({ idUsuario: id })) }}
                sala={{ participants: participantes }}
                onConfirm={aoSelecionarUsuarios}
            />

            {/* ETAPA DE CONFIGURAÇÃO DA SALA */}
            <Dialog open={open && !modalUsuariosAberto}
                onClose={handleOnClose}
                fullWidth maxWidth="xs">
                <DialogContent sx={{ background: "#22272B" }}>
                    <Box display="flex" justifyContent={useWarningValidator(null) !== null ? "space-between" : "flex-end"} alignItems="center">
                        {useWarningValidator(null)}
                        <Close onClick={handleOnClose} size="small" style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>

                        <Typography color="#fff" fontWeight="bold" fontSize={18}>
                            Criar nova sala
                        </Typography>


                        {/* IMAGEM */}
                        <Stack alignItems="center" gap={1}>
                            <Avatar
                                src={urlImagem ? `data:image/png;base64,${urlImagem}` : null}
                                sx={{ width: 90, height: 90 }}
                            />
                            <Button variant="outlined" component="label">
                                Selecionar imagem
                                <input type="file" hidden accept="image/*" onChange={handleImagem} />
                            </Button>
                        </Stack>

                        {/* NOME */}
                        <TextField
                            fullWidth
                            label="Nome da sala"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            // InputProps={{ sx: { color: "#fff" } }}
                            InputLabelProps={{ style: inputStyle.label }}
                            InputProps={{ style: inputStyle.input }}
                            sx={{ borderRadius: '10px', background: '#1A1E22' }}
                        />

                        {/* PARTICIPANTES */}
                        <Stack>
                            <Typography color="#bbb" fontSize={14}>Participantes selecionados:</Typography>
                            <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
                                <Box
                                    sx={{
                                        background: "#1a1e22",
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        startIcon={<PersonAdd />}
                                        onClick={() => setModalUsuariosAberto(true)}
                                        sx={{ color: "#FFF", justifyContent: 'start', fontSize: '14px' }}
                                    >
                                        Adicionar
                                    </Button>
                                </Box>
                                {participantes.map((usuario) => (
                                    <Box
                                        key={usuario.idUsuario}
                                        sx={{
                                            background: "#1a1e22",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <Typography fontSize={12} color="#fff">
                                            {usuario.nome}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ background: "#1a1e22" }}>
                    <Button variant="contained" sx={{ bgcolor: "#1976d2" }} onClick={criarSala}>
                        Criar sala
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModalChatAdicionar;
