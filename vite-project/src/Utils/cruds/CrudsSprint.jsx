import Swal from "sweetalert2";
import { mostrarAlertaStatus } from "../SwalHelper";
import { getUsuario } from "./CrudsUsuario";

const token = JSON.parse(localStorage.getItem('token'));

export const postSprint = async (newSprint) => {
    try {
        const formattedSprint = JSON.stringify(newSprint);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedSprint,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Sprint", "criada", data.message || "Dados enviados com sucesso!");

        if (res.ok) return data;
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Sprint", "criar", error.message);
    }
};

export const getSprints = async (idProjeto) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/buscarPorProjeto/${idProjeto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        await getUsuario(JSON.parse(localStorage.getItem('usuario')).idUsuario); // <-- Isso aqui realmente precisa estar aqui?
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putSprint = async (modifiedSprint, idSprint) => {
    try {
        const formattedSprint = JSON.stringify(modifiedSprint);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/${idSprint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedSprint,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Sprint", "editada", data.message || "Número de série em conflito!");

    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Sprint", "editar", error.message);
    }
};

export const deleteSprint = async (idSprint, body) => {
    const formattedSprint = JSON.stringify(body);

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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/${idSprint}`, {
                method: 'DELETE',
                body: formattedSprint,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await res.json();
            mostrarAlertaStatus(res.status, "Sprint", "removida", data.message || "Sprint não encontrada!");
        }
    } catch (error) {
        console.error("Erro ao remover Sprint " + idSprint + ": ", error);
        mostrarAlertaStatus(500, "Sprint", "remover", error.message);
    }
};
