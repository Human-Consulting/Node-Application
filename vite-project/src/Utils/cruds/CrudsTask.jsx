import Swal from "sweetalert2";

export const postTask = async (newTask, toogleModal) => {
    try {
        const formattedTask = JSON.stringify(newTask);

        const res = await fetch("http://localhost:8081/tasks", {
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
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Dados enviados com sucesso!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
            toogleModal && toogleModal();
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
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
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const getTasks = async () => {
    try {
        const res = await fetch("http://localhost:8081/tasks");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putTask = async (modifiedTask, idTask, toogleModal) => {
    try {
        const formattedTask = JSON.stringify(modifiedTask);

        const res = await fetch(`http://localhost:8081/tasks/${idTask}`, {
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
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Dados atualizados com sucesso!",
                customClass: {
                    popup: "swalAlerta",
                }
            });
            toogleModal && toogleModal();
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Número de série em conflito!",
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
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const deleteTask = async (idTask, toogleModal) => {
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
            const res = await fetch(`http://localhost:8081/tasks/${idTask}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: res.status,
                    position: "center",
                    backdrop: false,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    text: data.message || "Task removida com sucesso!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
                toogleModal && toogleModal();
            } else {
                Swal.fire({
                    icon: "error",
                    title: res.status,
                    position: "center",
                    backdrop: false,
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    text: data.message || "Task não encontrada!",
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
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};
