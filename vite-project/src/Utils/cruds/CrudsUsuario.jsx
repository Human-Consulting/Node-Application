import Swal from "sweetalert2";
import { mostrarAlertaStatus } from "../SwalHelper";

const token = JSON.parse(localStorage.getItem('token'));

export const postUsuario = async (newUsuario, toogleModal) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newUsuario),
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Usuário", "cadastrado", data.message);
        if (res.ok && toogleModal) toogleModal();
    } catch (error) {
        mostrarAlertaStatus(500, "Usuário", "cadastrar", error.message);
    }
};

export const getUsuarios = async (idEmpresa) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/buscarPorEmpresa/${idEmpresa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return await res.json();
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modifiedUsuario),
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Usuário", "editado", data.message);
    } catch (error) {
        mostrarAlertaStatus(500, "Usuário", "editar", error.message);
    }
};

export const putSenhaUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/atualizarSenha/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modifiedUsuario),
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Senha", "atualizada", data.message);
    } catch (error) {
        mostrarAlertaStatus(500, "Senha", "atualizar", error.message);
    }
};

export const putEsqueciASenhaUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/esqueciASenha/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedUsuario),
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Senha", "redefinida", data.message);
        return res.ok;
    } catch (error) {
        mostrarAlertaStatus(500, "Senha", "redefinir", error.message);
        return false;
    }
};

export const putCoresUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/atualizarCores/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modifiedUsuario),
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Preferências de cores", "atualizadas", data.message);
    } catch (error) {
        mostrarAlertaStatus(500, "Cores", "atualizar", error.message);
    }
};

export const deleteUsuario = async (idUsuario, body) => {
    try {
        const confirm = await Swal.fire({
            title: "Tem certeza?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "#ff4d4d",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            customClass: { popup: "swalAlerta" },
        });

        if (confirm.isConfirmed) {
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/${idUsuario}`, {
                method: 'DELETE',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            mostrarAlertaStatus(res.status, "Usuário", "removido", "Usuário não encontrado!");
        }
    } catch (error) {
        mostrarAlertaStatus(500, "Usuário", "remover", error.message);
    }
};

export const uploadFile = async (file, toogleModal) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/upload`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();

        Swal.fire({
            icon: res.ok ? "success" : "error",
            title: res.status,
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: data.message || (res.ok ? "Dados enviados com sucesso!" : "Erro ao cadastrar via upload!"),
            customClass: { popup: "swalAlerta" },
        });

        if (res.ok && toogleModal) toogleModal();
    } catch (error) {
        mostrarAlertaStatus(500, "Upload", "realizar", error.message);
    }
};

export const getUsuario = async (idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const usuario = await res.json();
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};

export const getIdUsuario = async (email) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/emailExistente/${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await res.json();
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};

export const enviarCodigo = async (body) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/codigoEsqueciASenha`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        Swal.fire({
            icon: res.ok ? "success" : "error",
            position: "center",
            backdrop: false,
            text: res.ok ? "Código enviado com sucesso!" : "Erro ao enviar código. Tente novamente.",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: { popup: "swalAlerta" },
        });

        return res.ok;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};
