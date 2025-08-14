import Swal from "sweetalert2";
import { mostrarAlertaStatus } from '../SwalHelper';

const token = JSON.parse(localStorage.getItem('token'));

export const postMensagem = async (newMensagem) => {
    try {
        const formattedMensagem = JSON.stringify(newMensagem);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/mensagens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedMensagem,
        });

        const data = await res.json();

        if (res.ok) {
            mostrarAlertaStatus(res.status, "Mensagem", "enviada");
            return data;
        } else {
            mostrarAlertaStatus(res.status, "Mensagem", "enviar", "Erro ao mandar mensagem!");
            return false;
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Mensagem", "enviar", error.message);
    }
};

export const getMensagems = async (idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/salas/porUsuario/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putMensagem = async (modifiedMensagem, idMensagem) => {
    try {
        const formattedMensagem = JSON.stringify(modifiedMensagem);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/mensagens/${idMensagem}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedMensagem,
        });

        const data = await res.json();

        if (res.ok) {
            mostrarAlertaStatus(res.status, "Mensagem", "editada");
        } else {
            mostrarAlertaStatus(res.status, "Mensagem", "editar", data.message);
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Mensagem", "editar", error.message);
    }
};

export const deleteMensagem = async (idMensagem, body) => {
    const formattedMensagem = JSON.stringify(body);
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
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (confirm.isConfirmed) {
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/mensagens/${idMensagem}`, {
                method: 'DELETE',
                body: formattedMensagem,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();

            if (res.ok) {
                mostrarAlertaStatus(res.status, "Mensagem", "removida");
            } else {
                mostrarAlertaStatus(res.status, "Mensagem", "remover", data.message || "Mensagem não encontrada!");
            }
        }
    } catch (error) {
        console.error("Erro ao remover Mensagem " + idMensagem + ": ", error);
        mostrarAlertaStatus(500, "Mensagem", "remover", error.message);
    }
};
