import { Popover, Box, Button, TextField, Stack, Typography } from "@mui/material";
import { Send, Logout, ImageNotSupported, Edit } from '@mui/icons-material';
import { useRef, useState } from "react";
import { postSala, putSala } from "../../../Utils/cruds/CrudsSala.jsx";

import ListaUsuariosSala from "../ListaUsuariosSala/ListaUsuariosSala.jsx";
import ModalAdicionarUsuarios from "../ModalAdicionarUsuarios/ModalAdicionarUsuarios.jsx";
import { inputStyle } from "../../Modal/Forms/Forms.styles.jsx";
import Swal from "sweetalert2";

const ModalChatEditar = ({ open, anchorEl, onClose, sala, atualizarSalas }) => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    const [nome, setNome] = useState(sala?.nome || "");
    const [urlImagem, setUrlImagem] = useState(sala?.urlImagem || '');
    const [participantes, setParticipantes] = useState(sala?.participants || []);
    const [aba, setAba] = useState("visao");
    const [editado, setEditado] = useState(false);

    const [erros, setErros] = useState({});
    const [openAdd, setOpenAdd] = useState(false);

    const fileInputRef = useRef(null);

    const handleEditarImagem = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const validarCampos = () => {
        const novosErros = {};
        if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
        if (participantes.length < 1) novosErros.participantes = "Necessário pelo menos 1 participante";
        setErros(novosErros);
        return Object.keys(novosErros).length > 0;
    };

    const handleFileUpload = (file) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(",")[1];
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

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };

    const criarSala = async () => {
        if (validarCampos()) return;
        await postSala({
            nome,
            urlImagem,
            participantes: participantes.map(u => u.idUsuario),
            idEditor: usuarioLogado.idUsuario
        });
        atualizarSalas();
        onClose();
    };

    const editarSala = async () => {
        if (validarCampos()) return;
        await putSala({
            nome,
            urlImagem,
            participantes: sala.participants.map(u => u.idUsuario),
            idEditor: usuarioLogado.idUsuario,
            fkProjeto: sala.fkProjeto,
            fkEmpresa: sala.fkEmpresa
        }, sala.idSala);
        atualizarSalas();
        onClose();
    };

    const removerUsuario = async (idUsuario, nome) => {
        onClose();
        const mesmoUsuario = usuarioLogado.idUsuario == idUsuario;
        const confirm = await Swal.fire({
            text: mesmoUsuario
                ? "Ao sair da sala, você perde o acesso a ela."
                : `Remover ${nome} da sala?`,
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

        const novaLista = sala.participants.filter(u => u.idUsuario !== idUsuario);

        const ids = novaLista.map(u => u.idUsuario);

        await putSala({
            nome: nome,
            urlImagem: urlImagem,
            participantes: ids,
            idEditor: usuarioLogado.idUsuario,
            fkProjeto: sala.fkProjeto,
            fkEmpresa: sala.fkEmpresa
        }, sala.idSala);

        atualizarSalas();
    };


    const adicionarUsuarios = async (ids) => {
        const novos = ids.filter(id => !participantes.some(p => p.idUsuario === id));
        setParticipantes(prev => [
            ...prev,
            ...novos.map(id => ({ idUsuario: id, nome: "Carregando...", cargo: "" }))
        ]);
        setOpenAdd(false);

        await putSala({
            nome: nome,
            urlImagem: urlImagem,
            participantes: ids,
            idEditor: usuarioLogado.idUsuario,
            fkProjeto: sala.fkProjeto,
            fkEmpresa: sala.fkEmpresa
        }, sala.idSala);
        atualizarSalas();
        onClose();
    };

    const podeEditarSala = () => sala == null || (sala?.fkEmpresa == null && sala?.fkProjeto == null);

    return (
        <>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => {
                    setUrlImagem(sala?.urlImagem ?? "");
                    setNome(sala?.nome || "");
                    onClose();
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                    sx: {
                        background: "#111",
                        borderRadius: "12px",
                        padding: "0",
                        width: 400,
                        color: "white",
                        display: "flex",
                        minHeight: 260,
                        maxHeight: 500
                    }
                }}
            >
                {/* MENU LATERAL */}
                <Stack
                    sx={{
                        width: 140,
                        borderRight: "1px solid #333",
                        p: 1,
                        justifyContent: 'space-between'
                    }}
                >
                    <Stack sx={{ gap: 1 }}>
                        <Button
                            variant={aba === "visao" ? "contained" : "text"}
                            onClick={() => setAba("visao")}
                            sx={{ justifyContent: "start", fontSize: '12px' }}
                        >
                            Visão Geral
                        </Button>

                        <Button
                            variant={aba === "membros" ? "contained" : "text"}
                            onClick={() => setAba("membros")}
                            sx={{ justifyContent: "start", fontSize: '12px' }}
                        >
                            Membros
                        </Button>
                    </Stack>

                    {editado && (
                        <Button
                            variant="outlined"
                            onClick={() => editarSala()}
                            sx={{ justifyContent: "start", fontSize: '12px' }}
                        >
                            Salvar
                        </Button>
                    )}
                </Stack>

                {/* CONTEÚDO DA ABA ATUAL */}
                <Box sx={{ flexGrow: 1, p: 2 }}>
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
                                    // Se já escolheu nova imagem, exibimos ela
                                    <Box
                                        component="img"
                                        src={`data:image/png;base64,${urlImagem}`}
                                        alt="Imagem da sala"
                                        className="blurImg"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.3s" }}
                                    />
                                ) : sala?.urlImagem ? (
                                    // Se tem imagem antiga e não escolheu nova
                                    <Box
                                        component="img"
                                        src={`data:image/png;base64,${sala.urlImagem}`}
                                        alt="Imagem da sala"
                                        className="blurImg"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.3s" }}
                                    />
                                ) : (
                                    // Ícone de sem foto
                                    <ImageNotSupported
                                        className="blurImg"
                                        sx={{ fontSize: 80, color: "#999", width: "100%", height: "100%", transition: "0.3s" }}
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
                                        color: "#fff",
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
                                    onChange={(e) => handleFileUpload(e.target.files[0])}
                                />
                            </Box>

                            <TextField
                                label="Nome"
                                value={nome}
                                onChange={(e) => {
                                    removerErro(nome);
                                    setNome(e.target.value);
                                    setEditado((sala?.nome != e.target.value) || (sala?.urlImagem != urlImagem));
                                }}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ style: inputStyle.label }}
                                InputProps={{ style: inputStyle.input }}
                                sx={inputStyle.sx}
                                error={!!erros.nome}
                                helperText={erros.nome}
                                disabled={!podeEditarSala()}
                            />

                            <Typography fontSize={14} sx={{ opacity: 0.8 }}>
                                {sala?.participants.length} participantes
                            </Typography>

                            {podeEditarSala() && sala == null && (
                                <Button
                                    variant="contained"
                                    endIcon={<Send />}
                                    onClick={criarSala}
                                    sx={{ bgcolor: "#0057ff", mt: 2 }}
                                >
                                    Criar Sala
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="error"
                                endIcon={<Logout />}
                                sx={{ fontSize: '12px' }}
                            // onClick={sairSala}
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
            </Popover>

            {/* MODAL ADICIONAR USUÁRIOS */}
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
