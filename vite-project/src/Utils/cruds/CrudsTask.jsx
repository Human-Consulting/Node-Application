import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper"
import { getUsuario } from "./CrudsUsuario";
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

        showSwal(res.status, data.message || "Tarefa cadastrada!");
        return res.ok;
    } catch (error) {
        console.error(error);
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
        await getUsuario(JSON.parse(localStorage.getItem('usuario')).idUsuario);
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

        showSwal(res.status, data.message || "Informações atualizadas!");
        return res.ok;
    } catch (error) {
        console.error(error);
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

            showSwal(res.status, "Tarefa removida com sucesso!");
            return res.status == 204;
        }
    } catch (error) {
        console.error("Erro ao remover task " + idTask + ": ", error);
    }
};

export const putImpedimento = async (task, body, idTask) => {
    try {
        let confirm;

        confirm = await Swal.fire({
            text: task.comImpedimento ? "Você tem certeza de que o impedimento foi finalizado? Comente sobre a solução!" : "Gostaria de editar o comentário atual? Ele será enviado ao responsável do projeto.",
            icon: "warning",
            input: "textarea",
            inputValue: task.comentario || "",
            inputPlaceholder: "Digite seu comentário...",
            inputAttributes: {
                'aria-label': 'Digite seu comentário',
            },
            showCancelButton: true,
            backdrop: false,
            confirmButtonColor: "#D32F2F",
            cancelButtonColor: "#007bff",
            confirmButtonText: "Continuar",
            cancelButtonText: "Voltar",
            customClass: {
                popup: "swalAlerta",
            },
            preConfirm: (value) => {
                if (!value.trim()) {
                    Swal.showValidationMessage("O comentário não pode estar vazio");
                    return false;
                }
                return value;
            }
        });

        if (confirm.isConfirmed) {
            if (task.comentario != confirm.value) {
                task.comentario = confirm.value;
                putTask(task, idTask);
            }
            const formattedBody = JSON.stringify(body);

            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/impedimento/${idTask}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formattedBody

            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                // resposta sem JSON (ex: 204 No Content)
            }

            showSwal(res.status, data?.message || "Tarefa removida!");
            return res.status === 204;
        }
    } catch (error) {
        console.error(error);
    }
};