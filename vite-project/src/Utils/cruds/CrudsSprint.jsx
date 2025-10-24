import Swal from "sweetalert2";
import { getUsuario, getUsuarios } from "./CrudsUsuario";
import { showSwal } from "../SwalHelper"
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

        showSwal(res.status, data.message || "Sprint cadastrada!");
        return res.ok;
    } catch (error) {
        console.error(error);
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
        await getUsuario(JSON.parse(localStorage.getItem('usuario')).idUsuario);
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

        showSwal(res.status, data.message || "Informações atualizadas!");
        return res.ok;
    } catch (error) {
        console.error(error);
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
                },
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                // resposta sem JSON (ex: 204 No Content)
            }

            showSwal(res.status, data?.message || "Sprint removida!");
            return res.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover Sprint " + idSprint + ": ", error);
    }
};
