import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useAuth } from "../../../context/AuthContext";
import { postSala } from "../../../Utils/cruds/CrudsSala";
import type { Usuario } from "../../../Utils/cruds/CrudsUsuario";
import { inputStyle } from "./Forms.styles";

interface FormsAdicionarSalaProps {
    participantes: Usuario[];
    setParticipantes: Dispatch<SetStateAction<Usuario[]>>;
    setModalUsuariosAberto: Dispatch<SetStateAction<boolean>>;
    fkEmpresa?: number | string;
    fkProjeto?: number | string;
    onClose: () => void;
    atualizarSalas: () => void | Promise<void>;
}

const FormsAdicionarSala = ({ participantes, setParticipantes, setModalUsuariosAberto, fkEmpresa, fkProjeto, onClose, atualizarSalas }: FormsAdicionarSalaProps) => {
    const [nome, setNome] = useState("");
    const [urlImagem, setUrlImagem] = useState<string | null>(null);
    const { usuario: usuarioLogado } = useAuth();

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
        const ids = participantes
            .filter(u => u.idUsuario !== usuarioLogado?.idUsuario)
            .map(u => u.idUsuario);

        await postSala({
            nome,
            urlImagem,
            participantes: ids,
            idEditor: usuarioLogado?.idUsuario,
            fkEmpresa,
            fkProjeto
        });

        await atualizarSalas();
        limpar();
        onClose();
    };

    const limpar = () => {
        setNome("");
        setUrlImagem(null);
        setParticipantes([]);
        setModalUsuariosAberto(true);
    };

    const aoSelecionarUsuarios = (usuarios: Usuario[]) => {
        // const selecionadosObjs = usuarios.filter(u => usuarios.includes(u.idUsuario));
        setParticipantes(usuarios);
        setModalUsuariosAberto(false);
    };

    const handleImagem = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setUrlImagem(reader.result.split(",")[1]);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleOnClose = () => {
        setModalUsuariosAberto(false);
        setParticipantes([]);
        setNome("");
        setUrlImagem(null);
        onClose();
    };

    // Retained for parity with the original draft; not wired to a control yet.
    void aoSelecionarUsuarios;
    void handleOnClose;
    void criarSala;

    return (
        <Stack gap="3">

            <Typography width="100%" textAlign="center" color="text.primary" fontWeight="bold" fontSize={18}>
                Criar nova sala
            </Typography>

            <Stack alignItems="center" gap={1}>
                <Avatar
                    src={urlImagem ? `data:image/png;base64,${urlImagem}` : undefined}
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
                // InputProps={{ sx: { color: "#fff" } }}
                InputLabelProps={{ sx: inputStyle.label }}
                InputProps={{ sx: inputStyle.input }}
                sx={{ borderRadius: '10px', background: 'background.paper' }}
            />

            <Stack>
                <Typography color="text.secondary" fontSize={14}>Participantes selecionados:</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap" mt={1}>
                    <Box
                        sx={{
                            background: "background.paper",
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
                            sx={{ color: "text.primary", justifyContent: 'start', fontSize: '14px' }}
                        >
                            Adicionar
                        </Button>
                    </Box>
                    {participantes.map((usuario) => (
                        <Box
                            key={usuario.idUsuario}
                            sx={{
                                background: "background.paper",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <Typography fontSize={12} color="text.primary">
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
