import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { PersonAdd } from "@mui/icons-material";

const FormsAdicionarSala = ({ participantes, setParticipantes, setModalUsuariosAberto }) => {
    const [nome, setNome] = useState("");
    const [urlImagem, setUrlImagem] = useState(null);
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const validar = () => {
        if (!nome.trim()) return false;
        if (participantes.length === 0) return false;
        return true;
    };

    const criarSala = async () => {
        if (!validar()) return;

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
    };

    return (
        <Stack gap={3}>
            <Typography
                width="100%"
                textAlign="center"
                fontWeight="bold"
                fontSize={18}
            >
                Criar nova sala
            </Typography>

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

            <TextField
                fullWidth
                label="Nome da sala"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                InputLabelProps={{
                    sx: (theme) => ({
                        color: theme.palette.text.secondary,
                    })
                }}
                InputProps={{
                    sx: (theme) => ({
                        color: theme.palette.text.primary,
                    })
                }}
                sx={{
                    borderRadius: '10px',
                    backgroundColor: (theme) => theme.palette.background.paper
                }}
            />

            <Stack>
                <Typography color="text.secondary" fontSize={14}>
                    Participantes selecionados:
                </Typography>

                <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: theme.palette.background.paper,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        })}
                    >
                        <Button
                            variant="text"
                            startIcon={<PersonAdd />}
                            onClick={() => setModalUsuariosAberto(true)}
                            sx={{
                                justifyContent: 'start',
                                fontSize: '14px'
                            }}
                        >
                            Adicionar
                        </Button>
                    </Box>

                    {participantes.map((usuario) => (
                        <Box
                            key={usuario.idUsuario}
                            sx={(theme) => ({
                                backgroundColor: theme.palette.background.paper,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            })}
                        >
                            <Typography fontSize={12}>
                                {usuario.nome}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default FormsAdicionarSala;
