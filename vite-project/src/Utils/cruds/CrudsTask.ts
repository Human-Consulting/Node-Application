import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";
import { getUsuario } from "./CrudsUsuario";
import { apiRequest } from "../apiClient";

export interface Checkpoint {
    idCheckpoint?: string | number;
    descricao?: string;
    finalizado?: boolean;
    [key: string]: unknown;
}

export interface Task {
    idTarefa?: number;
    titulo?: string;
    descricao?: string;
    dtInicio?: string;
    dtFim?: string;
    comentario?: string;
    comImpedimento?: boolean;
    checkpoints?: Checkpoint[];
    responsavel?: { idUsuario?: number | string; [key: string]: unknown } | null;
    fkResponsavel?: number | string | null;
    progresso?: number;
    [key: string]: unknown;
}

export interface TaskPayload {
    fkSprint?: number | string;
    titulo: string;
    descricao: string;
    dtInicio: string;
    dtFim: string;
    comentario?: string;
    comImpedimento?: boolean;
    fkResponsavel?: number | string | null;
    checkpoints?: Checkpoint[];
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export interface EditorBody {
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export const postTask = async (newTask: TaskPayload): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>('/tarefas', {
            method: 'POST',
            body: newTask,
        });

        showSwal(response.status, data?.message || "Tarefa cadastrada!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getTasks = async (idSprint: number | string): Promise<Task[]> => {
    try {
        const { data } = await apiRequest<Task[]>(`/tarefas/buscarPorSprint/${idSprint}`, {
            method: 'GET',
        });
        const usuarioLogado = JSON.parse(localStorage.getItem('usuario') || '{}');
        if (usuarioLogado?.idUsuario) {
            await getUsuario(usuarioLogado.idUsuario);
        }
        return data as Task[];
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putTask = async (
    modifiedTask: Partial<TaskPayload> & EditorBody,
    idTask: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/tarefas/${idTask}`, {
            method: 'PATCH',
            body: modifiedTask,
        });

        showSwal(response.status, data?.message || "Informações atualizadas!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteTask = async (idTask: number | string, body: EditorBody): Promise<boolean | undefined> => {
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
            const { response } = await apiRequest(`/tarefas/${idTask}`, {
                method: 'DELETE',
                body,
            });

            showSwal(response.status, "Tarefa removida com sucesso!");
            return response.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover task " + idTask + ": ", error);
    }
};

export const putImpedimento = async (
    task: Task,
    body: EditorBody,
    idTask: number | string
): Promise<boolean | undefined> => {
    try {
        const confirm = await Swal.fire({
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
                validationMessage: "swalValidation"
            },
            preConfirm: (value: string) => {
                if (!value.trim()) {
                    Swal.showValidationMessage("O comentário não pode estar vazio");
                    return false;
                }
                return value;
            }
        });

        if (confirm.isConfirmed) {
            if (task.comentario !== confirm.value) {
                task.comentario = confirm.value;
                putTask(task as TaskPayload, idTask);
            }

            const { response, data } = await apiRequest<{ message?: string }>(`/tarefas/impedimento/${idTask}`, {
                method: 'PATCH',
                body,
            });

            showSwal(response.status, data?.message || "Impedimento atualizado!");
            return response.ok;
        }
    } catch (error) {
        console.error(error);
    }
};
