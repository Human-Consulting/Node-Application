import Swal from "sweetalert2";
import { getUsuario } from "./CrudsUsuario";
import { mostrarAlertaStatus } from "../SwalHelper";

const token = JSON.parse(localStorage.getItem('token'));

export const postTask = async (newTask) => {
    try {
        const formattedTask = JSON.stringify(newTask);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedTask,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Tarefa", "criada", data.message);
        if (res.ok) return data;
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Tarefa", "criar", error.message);
    }
};

export const getTasks = async (idSprint) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/buscarPorSprint/${idSprint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        await getUsuario(JSON.parse(localStorage.getItem('usuario')).idUsuario); // revisar se é necessário
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putTask = async (modifiedTask, idTask) => {
    try {
        const formattedTask = JSON.stringify(modifiedTask);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/${idTask}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedTask,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Tarefa", "editada", data.message || "Erro ao editar task.");
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Tarefa", "editar", error.message);
    }
};

export const deleteTask = async (idTask, body) => {
    const formattedTarefa = JSON.stringify(body);

    try {
        const confirm = await Swal.fire({
            title: "Tem certeza?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "#D32F2F",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (confirm.isConfirmed) {
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/${idTask}`, {
                method: 'DELETE',
                body: formattedTarefa,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();
            mostrarAlertaStatus(res.status, "Tarefa", "removida", data.message || "Tarefa não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao remover tarefa " + idTask + ": ", error);
        mostrarAlertaStatus(500, "Tarefa", "remover", error.message);
    }
};

export const putImpedimento = async (idTarefa, body, comImpedimento) => {
    try {
        const confirm = await Swal.fire({
            text: `${comImpedimento
                ? "Você tem certeza de que o impedimento foi finalizado?"
                : "Gostaria de editar o comentário atual? Ele será enviado ao responsável do projeto."
            }`,
            icon: "warning",
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#D32F2F",
            cancelButtonColor: "#007bff",
            confirmButtonText: "Continuar",
            cancelButtonText: "Voltar",
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (confirm.isConfirmed) {
            const formattedBody = JSON.stringify(body);

            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/impedimento/${idTarefa}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formattedBody
            });

            const data = await res.json();
            mostrarAlertaStatus(res.status, "Tarefa", comImpedimento ? "liberada" : "atualizada", data.message);
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Tarefa", comImpedimento ? "liberar" : "atualizar", error.message);
    }
};
