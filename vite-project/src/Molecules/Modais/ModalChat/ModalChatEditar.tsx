import { Box, Button, TextField, Stack, Typography, Dialog } from "@mui/material";
import { Logout, ImageNotSupported, Edit } from '@mui/icons-material';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { putSala, Sala, SalaPayload } from "../../../Utils/cruds/CrudsSala";
import { Usuario } from "../../../Utils/cruds/CrudsUsuario";

import ListaUsuariosSala from "../ListaUsuariosSala/ListaUsuariosSala";
import ModalAdicionarUsuarios from "../ModalAdicionarUsuarios/ModalAdicionarUsuarios";
import { inputStyle } from "../../Modal/Forms/Forms.styles";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";

interface ModalChatEditarProps {
    open: boolean;
    anchorEl?: HTMLElement | null;
    onClose: () => void;
    sala: Sala | null;
    atualizarSalas: () => void | Promise<unknown>;
}

interface ModalChatEditarErros {
    nome?: string;
    participantes?: string;
}

const ModalChatEditar = ({ open, onClose, sala, atualizarSalas }: ModalChatEditarProps) => {
    const { usuario: usuarioLogado } = useAuth();
    const queryClient = useQueryClient();
    const [nome, setNome] = useState(sala?.nome || "");
    const [urlImagem, setUrlImagem] = useState(sala?.urlImagem || '');
    const [participantes, setParticipantes] = useState<Usuario[]>(sala?.participants || []);
    const [aba, setAba] = useState<'visao' | 'membros'>("visao");
    const [editado, setEditado] = useState(false);

    const [erros, setErros] = useState<ModalChatEditarErros>({});
    const [openAdd, setOpenAdd] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const putSalaMutation = useMutation({
        mutationFn: ({ payload, idSala }: { payload: Partial<SalaPayload>; idSala: number | string }) =>
            putSala(payload, idSala),
    });

    const invalidarSalas = () => usuarioLogado
        ? queryClient.invalidateQueries({ queryKey: ['salas', usuarioLogado.idUsuario] })
        : Promise.resolve();

    const handleEditarImagem = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validarCampos = () => {
        const novosErros: ModalChatEditarErros = {};
        if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
        if (participantes.length < 1) novosErros.participantes = "Necessário pelo menos 1 participante";
        setErros(novosErros);
        return Object.keys(novosErros).length > 0;
    };

    const handleFileUpload = (file?: File) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = (reader.result as string).split(",")[1];
            setUrlImagem(base64String);

            setEditado(
                (sala?.urlImagem ?? null) !== base64String ||
                (sala?.nome ?? "") !== nome
            );

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        };

        reader.readAsDataURL(file);
    };

    const removerErro = (campo: keyof ModalChatEditarErros) => {
        setErros((prevErros) => {
            const resto = { ...prevErros };
            delete resto[campo];
            return resto;
        });
    };

    const editarSala = async () => {
        if (validarCampos() || !usuarioLogado || sala?.idSala == null) return;
        const response = await putSalaMutation.mutateAsync({
            payload: {
                nome,
                urlImagem,
                participantes: (sala?.participants ?? []).map(u => u.idUsuario) as (number | string)[],
                idEditor: usuarioLogado.idUsuario,
                fkProjeto: sala?.fkProjeto,
                fkEmpresa: sala?.fkEmpresa
            },
            idSala: sala.idSala
        });
        if (response) await invalidarSalas();
        await atualizarSalas();
        onClose();
    };

    const removerUsuario = async (idUsuario: number | string | undefined, nomeUsuario?: string) => {
        onClose();
        if (!usuarioLogado || sala?.idSala == null) return;
        const mesmoUsuario = usuarioLogado.idUsuario == idUsuario;
        const confirm = await Swal.fire({
            text: mesmoUsuario
                ? "Ao sair da sala, você perde o acesso a ela."
                : `Remover ${nomeUsuario} da sala?`,
            icon: "warning",
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "#ff4d4d",
            confirmButtonText: mesmoUsuario
                ? "Sair da sala"
                : "Remover",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (!confirm.isConfirmed) return;

        const novaLista = (sala?.participants ?? []).filter(u => u.idUsuario !== idUsuario);

        const ids = novaLista.map(u => u.idUsuario) as (number | string)[];

        const response = await putSalaMutation.mutateAsync({
            payload: {
                nome,
                urlImagem,
                participantes: ids,
                idEditor: usuarioLogado.idUsuario,
                fkProjeto: sala?.fkProjeto,
                fkEmpresa: sala?.fkEmpresa
            },
            idSala: sala.idSala
        });
        if (response) await invalidarSalas();
        await atualizarSalas();
    };


    const adicionarUsuarios = async (usuarios: Usuario[]) => {
        if (!usuarioLogado || sala?.idSala == null) return;
        const ids = usuarios.map(u => u.idUsuario) as (number | string)[];
        const novos = ids.filter(id => !participantes.some(p => p.idUsuario === id));
        setParticipantes(prev => [
            ...prev,
            ...novos.map(id => ({ idUsuario: id, nome: "Carregando...", cargo: "" }))
        ]);
        setOpenAdd(false);

        const response = await putSalaMutation.mutateAsync({
            payload: {
                nome,
                urlImagem,
                participantes: ids,
                idEditor: usuarioLogado.idUsuario,
                fkProjeto: sala?.fkProjeto,
                fkEmpresa: sala?.fkEmpresa
            },
            idSala: sala.idSala
        });
        if (response) await invalidarSalas();
        await atualizarSalas();
        onClose();
    };

    const podeEditarSala = () => sala == null || (sala?.fkEmpresa == null && sala?.fkProjeto == null);

    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    setUrlImagem(sala?.urlImagem ?? "");
                    setNome(sala?.nome || "");
                    onClose();
                }}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        background: "background.paper",
                        borderRadius: "12px",
                        overflow: "hidden",
                        color: "text.primary",
                        minHeight: 260,
                        maxHeight: 500,
                        display: "flex",
                        flexDirection: "row"
                    }
                }}
            >
                {/* MENU LATERAL */}
                <Stack
                    sx={{
                        width: 140,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        background: "background.paper",
                        p: 1,
                        justifyContent: "space-between"
                    }}
                >
                    <Stack sx={{ gap: 1 }}>
                        <Button
                            variant={aba === "visao" ? "contained" : "text"}
                            onClick={() => setAba("visao")}
                            sx={{ justifyContent: "start", fontSize: "12px", color: "text.primary" }}
                        >
                            Visão Geral
                        </Button>

                        <Button
                            variant={aba === "membros" ? "contained" : "text"}
                            onClick={() => setAba("membros")}
                            sx={{ justifyContent: "start", fontSize: "12px", color: "text.primary" }}
                        >
                            Membros
                        </Button>
                    </Stack>

                    {editado && (
                        <Button
                            variant="outlined"
                            onClick={() => editarSala()}
                            sx={{ justifyContent: "start", fontSize: "12px", color: "text.primary", borderColor: "#1976d2" }}
                        >
                            Salvar
                        </Button>
                    )}
                </Stack>

                <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
                    {aba === "visao" ? (
                        <Stack gap={2} alignItems="center">
                            <Box
                                onClick={() => podeEditarSala() && handleEditarImagem()}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    position: "relative",
                                    cursor: podeEditarSala() ? "pointer" : "default",
                                    ...(podeEditarSala() && {
                                        "&:hover .blurImg": { filter: "blur(1px) brightness(0.8)" },
                                        "&:hover .editIcon": { opacity: 1 }
                                    })
                                }}
                            >
                                {urlImagem ? (
                                    <Box
                                        component="img"
                                        src={`data:image/png;base64,${urlImagem}`}
                                        alt="Imagem da sala"
                                        className="blurImg"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.3s" }}
                                    />
                                ) : sala?.urlImagem ? (
                                    <Box
                                        component="img"
                                        src={`data:image/png;base64,${sala.urlImagem}`}
                                        alt="Imagem da sala"
                                        className="blurImg"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.3s" }}
                                    />
                                ) : (
                                    <ImageNotSupported
                                        className="blurImg"
                                        sx={{ fontSize: 80, color: "text.secondary", width: "100%", height: "100%", transition: "0.3s" }}
                                    />
                                )}

                                <Edit
                                    className="editIcon"
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        fontSize: 32,
                                        color: "text.primary",
                                        opacity: 0,
                                        transition: "0.3s"
                                    }}
                                    onClick={handleEditarImagem}
                                />

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e.target.files?.[0])}
                                />
                            </Box>

                            <TextField
                                label="Nome"
                                value={nome}
                                onChange={(e) => {
                                    removerErro("nome");
                                    setNome(e.target.value);
                                    setEditado((sala?.nome != e.target.value) || (sala?.urlImagem != urlImagem));
                                }}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ sx: inputStyle.label }}
                                InputProps={{ sx: inputStyle.input }}
                                sx={inputStyle.sx}
                                error={!!erros.nome}
                                helperText={erros.nome}
                                disabled={!podeEditarSala()}
                            />

                            <Typography fontSize={14} sx={{ opacity: 0.8 }}>
                                {sala?.participants?.length ?? 0} participantes
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                endIcon={<Logout />}
                                sx={{ fontSize: '12px' }}
                            >
                                Sair da sala
                            </Button>
                        </Stack>
                    ) : (
                        <Stack gap={2}>
                            <ListaUsuariosSala
                                usuarios={sala?.participants}
                                onRemover={removerUsuario}
                                onAbrirAdicionar={() => setOpenAdd(true)}
                            />
                            {erros.participantes && (
                                <Typography color="error" fontSize={12}>{erros.participantes}</Typography>
                            )}
                        </Stack>
                    )}
                </Box>
            </Dialog>

            <ModalAdicionarUsuarios
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onConfirm={adicionarUsuarios}
                sala={sala}
            />
        </>
    );
};

export default ModalChatEditar;
