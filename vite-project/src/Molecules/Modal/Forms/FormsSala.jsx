import Swal from "sweetalert2";
import { useState } from "react";
import { postSala, putSala, deleteSala } from '../../../Utils/cruds/CrudsSala.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import { Send, AttachFile, Logout } from '@mui/icons-material';


const FormsSala = ({ sala, toogleModal, usuarios, atualizarSalas }) => {

    const [nome, setNome] = useState(sala?.nome || "");
    const [urlImagem, setUrlImagem] = useState('');
    const [novosParticipantes, setNovosParticipantes] = useState(sala?.participants || []);

    const [erros, setErros] = useState({});

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleFileUpload = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setUrlImagem(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const validarCampos = () => {
        const novosErros = {};

        if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
        if (novosParticipantes.length < 1) novosErros.novosParticipantes = "Necessários participantes"
        setErros(novosErros);
        return Object.keys(novosErros).length > 0;
    };

    const handlePostSala = async () => {
        if (!validarCampos()) return;
        setErros({});
        const participantesIds = new Set(novosParticipantes.map(u => u.idUsuario));

        const newSala = {
            nome,
            urlImagem,
            participantes: [...participantesIds],
            idEditor: usuarioLogado.idUsuario,
        };

        await postSala(newSala);
        atualizarSalas();
        toogleModal();
    };

    const handleSairSala = async () => {
        toogleModal();
        const confirm = await Swal.fire({
            text: "Ao sair da sala, você perde o acesso a ela.",
            icon: "warning",
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "#ff4d4d",
            confirmButtonText: "Sair da sala",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (confirm.isConfirmed) {
            const novaLista = novosParticipantes.filter(p => p.idUsuario !== usuarioLogado.idUsuario);

            const modifiedSala = {
                nome,
                urlImagem,
                participantes: novaLista.map(p => p.idUsuario),
                idEditor: usuarioLogado.idUsuario
            };

            await putSala(modifiedSala, sala.idSala);
            atualizarSalas();
        }
    };


    const handlePutSala = async () => {
        if (!validarCampos()) return;
        setErros({});
        const modifiedSala = {
            nome,
            urlImagem,
            participantes: novosParticipantes.map(u => u.idUsuario),
            idEditor: usuarioLogado.idUsuario,
            fkProjeto: sala?.fkProjeto,
            fkEmpresa: sala?.fkEmpresa
        }
        toogleModal();
        await putSala(modifiedSala, sala.idSala);
        atualizarSalas();
    }

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };

    const usuariosUnificadosOrdenados = Array.from(
        new Map([...usuarios, ...novosParticipantes].map(user => [user.idUsuario, user])).values()
    ).sort((a, b) => {
        const aCheck = novosParticipantes.some(p => p.idUsuario === a.idUsuario);
        const bCheck = novosParticipantes.some(p => p.idUsuario === b.idUsuario);
        return (aCheck === bCheck) ? 0 : aCheck ? -1 : 1;
    });

    const podeEditarSala = () => {
        if (sala == null || (sala?.fkEmpresa != null && sala?.fkProjeto != null)) return true;
    }

    return (
        <Stack direction="column" mb={2} >
            <Typography variant="h5" textAlign="center" mb={2}>
                {sala == null ? "Adicionar Sala" : `Visualizar Sala`}
            </Typography>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }} >
                <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center' }} >

                    {podeEditarSala() && (
                        <>
                            <TextField
                                label="Nome"
                                value={nome}
                                onChange={(e) => {
                                    removerErro(nome)
                                    setNome(e.target.value)
                                }}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ style: inputStyle.label }}
                                InputProps={{ style: inputStyle.input }}
                                sx={inputStyle.sx}
                                error={!!erros.nome}
                                helperText={erros.nome}
                            />

                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                sx={{ ...inputStyle.sx, py: 1.5 }}
                            >
                                {sala == null ? 'Selecionar' : 'Modificar'} Imagem
                                <AttachFile />
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleFileUpload(e.target.files[0])}
                                />
                            </Button>
                        </>
                    )}
                </Box>

                <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Typography variant="subtitle1" sx={{ borderBottom: 'solid #888 1px', width: '100%', textAlign: 'center', paddingBlock: '0.5rem' }}>Participantes</Typography>

                    <Stack sx={{
                        gap: 3, overflowY: 'auto', maxHeight: '200px',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#aaa',
                        },
                    }}>
                        {usuariosUnificadosOrdenados.map((user) => {
                            const jaParticipa = novosParticipantes.some(p => p.idUsuario === user.idUsuario);
                            return (
                                <Box key={user.idUsuario} sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 4,
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    marginInline: '12px',
                                    background: '#22272B'
                                }} error={!!erros.novosParticipantes}>
                                    <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '150px', whiteSpace: 'nowrap' }}>{user.nome}</Typography>
                                    <input
                                        type="checkbox"
                                        checked={jaParticipa || user.idUsuario == usuarioLogado.idUsuario}
                                        disabled={user.idUsuario == usuarioLogado.idUsuario}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setNovosParticipantes(prev => [...prev, user]);
                                            } else {
                                                setNovosParticipantes(prev => prev.filter(p => p.idUsuario !== user.idUsuario));
                                            }
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                {sala == null ? (
                    <Button variant="contained" color="primary" onClick={handlePostSala} endIcon={<Send />} sx={{ flex: 1 }}>
                        Adicionar
                    </Button>
                ) : (
                    <>
                        <Button variant="contained" color="error" onClick={handleSairSala}>
                            <Logout />
                        </Button>
                        <Button variant="contained" color="primary" onClick={handlePutSala} endIcon={<Send />} sx={{ flex: 1 }}>
                            Salvar Alterações
                        </Button>
                    </>
                )}
            </Stack>
        </Stack>
    )
}

export default FormsSala