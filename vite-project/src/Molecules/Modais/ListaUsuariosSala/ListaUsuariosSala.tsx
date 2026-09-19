import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import { Logout, PersonAdd, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import { Usuario } from "../../../Utils/cruds/CrudsUsuario";

interface ListaUsuariosSalaProps {
    usuarios?: Usuario[];
    onRemover: (idUsuario: number | string | undefined, nomeUsuario?: string) => void;
    onAbrirAdicionar: () => void;
}

const ListaUsuariosSala = ({ usuarios = [], onRemover, onAbrirAdicionar }: ListaUsuariosSalaProps) => {
    const { usuario: usuarioLogado } = useAuth();

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
                    sx={{ color: "text.primary", justifyContent: 'start', fontSize: '14px' }}
                >
                    Adicionar
                </Button>
            </Stack>

            {usuariosOrdenados.length === 0 && (
                <Typography color="text.secondary" fontSize={14}>
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
                            background: "background.paper",
                            borderRadius: 1,
                            paddingInline: 1,
                        }}
                    >
                        <Box>
                            <Typography color="text.primary" fontSize="14px">
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
