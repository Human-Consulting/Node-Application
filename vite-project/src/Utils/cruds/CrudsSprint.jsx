import Swal from "sweetalert2";

export const postSprint = async (newSprint, toogleModal) => {
    try {
        const formattedSprint = JSON.stringify(newSprint);

        const res = await fetch("http://localhost:8081/sprints", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedSprint,
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
                text: data.message || "Erro ao adicionar Sprint!",
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

export const getSprints = async (idProjeto) => {
    // TODO: Criar Endpoint para filtrar sprints sobre projetos.
    try {
        const res = await fetch("http://localhost:8081/sprints");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putSprint = async (modifiedSprint, idSprint, toogleModal) => {
    try {
        const formattedSprint = JSON.stringify(modifiedSprint);

        const res = await fetch(`http://localhost:8081/sprints/${idSprint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedSprint,
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

export const deleteSprint = async (idSprint, toogleModal) => {
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
            const res = await fetch(`http://localhost:8081/sprints/${idSprint}`, {
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
                    text: data.message || "Sprint removida com sucesso!",
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
                    text: data.message || "Sprint não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover Sprint " + idSprint + ": ", error);
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
