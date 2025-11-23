import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import { Logout, PersonAdd, RemoveCircle, RemoveCircleOutlined, RemoveCircleOutlineOutlined } from "@mui/icons-material";

const ListaUsuariosSala = ({ usuarios = [], onRemover, onAbrirAdicionar }) => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    const usuariosOrdenados = [...usuarios].sort((a, b) => {
        if (a.idUsuario === usuarioLogado?.idUsuario) return -1;
        if (b.idUsuario === usuarioLogado?.idUsuario) return 1;
        return 0;
    });

    return (
        <Stack gap={1}>
            <Stack>
                <Button
                    variant="text"
                    startIcon={<PersonAdd />}
                    onClick={onAbrirAdicionar}
                    sx={{ color: "#FFF", justifyContent: 'start', fontSize: '14px' }}
                >
                    Adicionar
                </Button>
            </Stack>

            {usuariosOrdenados.length === 0 && (
                <Typography color="#ccc" fontSize={14}>
                    Nenhum participante ainda.
                </Typography>
            )}

            {usuariosOrdenados.map((u) => {
                const isUsuarioLogado = u.idUsuario === usuarioLogado?.idUsuario;

                return (
                    <Stack
                        key={u.idUsuario}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                            background: "#22272B",
                            borderRadius: 1,
                            paddingInline: 1,
                        }}
                    >
                        <Box>
                            <Typography color="#fff" fontSize="14px">
                                {isUsuarioLogado ? "Você" : u.nome}
                            </Typography>
                        </Box>

                        {!isUsuarioLogado ?
                            (
                                <IconButton onClick={() => onRemover(u.idUsuario, u.nome)}>
                                    <RemoveCircleOutlineOutlined />
                                </IconButton>
                            )
                            :
                            (
                                <IconButton onClick={() => onRemover(u.idUsuario)}>
                                    <Logout />
                                </IconButton>
                            )
                        }
                    </Stack>
                );
            })}
        </Stack>
    );
};

export default ListaUsuariosSala;
