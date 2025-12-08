import { Box, Button, Dialog, DialogActions, Stack, TextField, Typography } from "@mui/material";
import { postEmpresa, putEmpresa, deleteEmpresa } from '../../Utils/cruds/CrudsEmpresa.jsx';
import { AttachFile, Close, Delete, Send } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning";
import { inputStyle } from "../Modal/Forms/Forms.styles";
import { Content, Actions } from "./Modal.style.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const ModalEmpresa = ({ open, onClose, empresa, toogleModal, atualizarEmpresas }) => {
    const navigate = useNavigate();

    const formatarCNPJ = (valor) => {
        valor = valor.replace(/\D/g, "");

        if (valor.length <= 14) {
            valor = valor.replace(/^(\d{2})(\d)/, "$1.$2");
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
        }

        return valor;
    };

    const [fileName, setFileName] = useState('');
    const [cnpj, setCnpj] = useState("");
    const [nome, setNome] = useState("");
    const [urlImagem, setUrlImagem] = useState("");

    useEffect(() => {
        setNome(empresa?.nome || "");
        setCnpj(empresa?.cnpj ? formatarCNPJ(empresa.cnpj) : "");
        setUrlImagem("");
    }, [empresa]);

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
        if (!cnpj.trim()) novosErros.cnpj = "Cnpj é obrigatório";
        else if (!validarCNPJ(cnpj.replace(/\D/g, ""))) novosErros.cnpj = "CNPJ inválido";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handlePostEmpresa = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newEmpresa = { nome, cnpj: cnpj.replace(/\D/g, ""), urlImagem, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const novaEmpresa = await postEmpresa(newEmpresa);
        atualizarEmpresas();
        toogleModal();
        await Swal.fire({
            icon: "success",
            position: "center",
            backdrop: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: "Adicione um diretor para adicionar projetos!",
            customClass: {
                popup: "swalAlerta",
            }
        });
        navigate(`/Home/${novaEmpresa.nome}/${novaEmpresa.idEmpresa}/Usuarios`);
    };

    const handleDeleteEmpresa = async () => {
        toogleModal();
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao }
        await deleteEmpresa(empresa.idEmpresa, bodyDelete);
        await atualizarEmpresas();
    }

    const handlePutEmpresa = async () => {
        if (!validarCampos()) return;
        setErros({});
        const modifiedEmpresa = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            cnpj: cnpj.replace(/\D/g, ""),
            nome,
            urlImagem
        }
        const response = await putEmpresa(modifiedEmpresa, empresa.idEmpresa);
        if (response) {
            toogleModal();
            await atualizarEmpresas();
        }
    }

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };

    const validarCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        if (/^(\d)\1+$/.test(cnpj)) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho++;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        return resultado === parseInt(digitos.charAt(1));
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
                <Content>
                    <Box display="flex" justifyContent={useWarningValidator(empresa) !== null ? "space-between" : "flex-end"} alignItems="center">
                        {useWarningValidator(empresa)}
                        <Close onClick={onClose} size="small" style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
                            {empresa == null ? "Criar Empresa" : "Editar Empresa"}
                        </Typography>

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

                        <TextField
                            label="CNPJ"
                            value={cnpj}
                            onChange={(e) => {
                                const apenasNumeros = e.target.value.replace(/\D/g, "");
                                if (apenasNumeros.length <= 14) {
                                    removerErro('cnpj');
                                    setCnpj(formatarCNPJ(apenasNumeros));
                                }
                            }}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ style: inputStyle.label }}
                            InputProps={{ style: inputStyle.input, maxLength: 18 }}
                            sx={inputStyle.sx}
                            error={!!erros.cnpj}
                            helperText={erros.cnpj}
                        />

                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ ...inputStyle.sx, py: 1.5 }}
                        >
                            {empresa == null ? 'Selecionar' : 'Modificar'} Imagem
                            <AttachFile />
                            <input
                                type="file"
                                hidden
                                onChange={(e) => {
                                    handleFileUpload(e.target.files[0]);
                                    setFileName(e.target.files[0].name);
                                }}
                            />
                            {fileName && (fileName)}
                        </Button>


                    </Stack>
                </Content>
                <Actions>
                    {empresa == null ? (
                        <Button variant="contained" color="primary" onClick={handlePostEmpresa} endIcon={<Send />}>
                            Adicionar
                        </Button>
                    ) : (
                        <>
                            <Button variant="contained" color="error" onClick={handleDeleteEmpresa}>
                                <Delete />
                            </Button>
                            <Button variant="contained" color="primary" onClick={handlePutEmpresa} endIcon={<Send />} sx={{ flex: 1 }}>
                                Salvar Alterações
                            </Button>
                        </>
                    )}
                </Actions>
            </Dialog>
        </>
    );
}

export default ModalEmpresa;