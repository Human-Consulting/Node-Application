import { Box, Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { postEmpresa, putEmpresa, deleteEmpresa, Empresa, EmpresaPayload, EditorBody } from '../../Utils/cruds/CrudsEmpresa';
import { AttachFile, Close, Delete, Send } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning";
import { inputStyle } from "../Modal/Forms/Forms.styles";
import { Content, Actions } from "./Modal.style";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

interface ModalEmpresaProps {
    open: boolean;
    onClose: () => void;
    empresa?: Empresa | null;
    toogleModal: () => void;
    atualizarEmpresas: (page?: number, nome?: string | null) => void | Promise<unknown>;
}

interface EmpresaErros {
    nome?: string;
    cnpj?: string;
}

const ModalEmpresa = ({ open, onClose, empresa, toogleModal, atualizarEmpresas }: ModalEmpresaProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const formatarCNPJ = (valorOriginal: string) => {
        let valor = valorOriginal.replace(/\D/g, "");

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

    const [erros, setErros] = useState<EmpresaErros>({});

    const { usuario: usuarioLogado } = useAuth();

    const handleFileUpload = (file?: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            setUrlImagem(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const validarCampos = () => {
        const novosErros: EmpresaErros = {};

        if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
        if (!cnpj.trim()) novosErros.cnpj = "Cnpj é obrigatório";
        else if (!validarCNPJ(cnpj.replace(/\D/g, ""))) novosErros.cnpj = "CNPJ inválido";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const invalidarEmpresas = () => queryClient.invalidateQueries({ queryKey: ['empresas'] });

    const postEmpresaMutation = useMutation({
        mutationFn: (payload: EmpresaPayload) => postEmpresa(payload),
    });

    const putEmpresaMutation = useMutation({
        mutationFn: ({ payload, idEmpresa }: { payload: Partial<EmpresaPayload> & EditorBody; idEmpresa: number | string }) =>
            putEmpresa(payload, idEmpresa),
    });

    const deleteEmpresaMutation = useMutation({
        mutationFn: ({ idEmpresa, body }: { idEmpresa: number | string; body: EditorBody }) =>
            deleteEmpresa(idEmpresa, body),
    });

    const handlePostEmpresa = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newEmpresa: EmpresaPayload = { nome, cnpj: cnpj.replace(/\D/g, ""), urlImagem, idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const novaEmpresa = await postEmpresaMutation.mutateAsync(newEmpresa);
        await invalidarEmpresas();
        atualizarEmpresas();
        toogleModal();
        if (!novaEmpresa) return;
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
        if (empresa?.idEmpresa == null) return;
        const bodyDelete: EditorBody = { idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        await deleteEmpresaMutation.mutateAsync({ idEmpresa: empresa.idEmpresa, body: bodyDelete });
        await invalidarEmpresas();
        await atualizarEmpresas();
    }

    const handlePutEmpresa = async () => {
        if (!validarCampos()) return;
        setErros({});
        if (empresa?.idEmpresa == null) return;
        const modifiedEmpresa: Partial<EmpresaPayload> & EditorBody = {
            idEditor: usuarioLogado?.idUsuario,
            permissaoEditor: usuarioLogado?.permissao,
            cnpj: cnpj.replace(/\D/g, ""),
            nome,
            urlImagem
        }
        const response = await putEmpresaMutation.mutateAsync({ payload: modifiedEmpresa, idEmpresa: empresa.idEmpresa });
        if (response) {
            await invalidarEmpresas();
            toogleModal();
            await atualizarEmpresas();
        }
    }

    const removerErro = (campo: keyof EmpresaErros) => {
        setErros((prevErros) => {
            const { [campo]: _removed, ...resto } = prevErros;
            return resto;
        });
    };

    const validarCNPJ = (cnpjOriginal: string) => {
        const cnpj = cnpjOriginal.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        if (/^(\d)\1+$/.test(cnpj)) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
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
                        <Close onClick={onClose} style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
                            {empresa == null ? "Criar Empresa" : "Editar Empresa"}
                        </Typography>

                        <TextField
                            label="Nome"
                            value={nome}
                            onChange={(e) => {
                                removerErro('nome')
                                setNome(e.target.value)
                            }}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
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
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input, inputProps: { maxLength: 18 } }}
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const file = e.target.files?.[0];
                                    handleFileUpload(file);
                                    if (file) setFileName(file.name);
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
