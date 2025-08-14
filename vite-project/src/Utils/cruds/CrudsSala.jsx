import Swal from "sweetalert2";
import { mostrarAlertaStatus } from "../SwalHelper";

const token = JSON.parse(localStorage.getItem('token'));

export const postSala = async (newSala) => {
    try {
        const formattedSala = JSON.stringify(newSala);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/salas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedSala,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Sala", "criada", data.message);

        if (res.ok) return data;
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Sala", "criar", error.message);
    }
};

export const getSalas = async (idUsuario) => {
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

export const putSala = async (modifiedSala, idSala) => {
    try {
        const formattedSala = JSON.stringify(modifiedSala);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/salas/${idSala}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedSala,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Sala", "editada", data.message);
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Sala", "editar", error.message);
    }
};

export const deleteSala = async (idSala, body) => {
    const formattedSala = JSON.stringify(body);

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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/salas/${idSala}`, {
                method: 'DELETE',
                body: formattedSala,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();
            mostrarAlertaStatus(res.status, "Sala", "removida", data.message || "Sala não encontrada!");
        }
    } catch (error) {
        console.error("Erro ao remover Sala " + idSala + ": ", error);
        mostrarAlertaStatus(500, "Sala", "remover", error.message);
    }
};
