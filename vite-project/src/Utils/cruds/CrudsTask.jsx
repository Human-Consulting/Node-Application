import Swal from "sweetalert2";
import { getUsuario } from "./CrudsUsuario";

export const postTask = async (newTask) => {
    try {
        const formattedTask = JSON.stringify(newTask);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedTask,
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: "success",
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: "swalAlerta",
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao adicionar task!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            position: "center",
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const getTasks = async (idSprint) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/buscarPorSprint/${idSprint}`);
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
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedTask,
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: "success",
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: "swalAlerta",
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao enviar modificação!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            position: "center",
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const deleteTask = async (idTask) => {
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
                method: 'DELETE'
            });

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    position: "center",
                    backdrop: false,
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: res.status,
                    position: "center",
                    backdrop: false,
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    text: "Task não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover task " + idTask + ": ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            position: "center",
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const putImpedimento = async (idTarefa, body) => {
    try {
        const formattedBody = JSON.stringify(body);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/tarefas/impedimento/${idTarefa}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedBody

        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: "success",
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: "swalAlerta",
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao enviar modificação!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            position: "center",
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};