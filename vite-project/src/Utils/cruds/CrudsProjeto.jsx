import Swal from "sweetalert2";

export const postProjeto = async (newProjeto, toogleModal) => {
    try {
        const formattedProjeto = JSON.stringify(newProjeto);

        const res = await fetch("http://localhost:8081/projetos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedProjeto,
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
                text: data.message || "Erro ao adicionar Projeto!",
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

export const getProjetos = async () => {
    try {
        const res = await fetch("http://localhost:8081/projetos");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putProjeto = async (modifiedProjeto, idProjeto, toogleModal) => {
    try {
        const formattedProjeto = JSON.stringify(modifiedProjeto);

        const res = await fetch(`http://localhost:8081/projetos/${idProjeto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedProjeto,
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

export const deleteProjeto = async (idProjeto, toogleModal) => {
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
            const res = await fetch(`http://localhost:8081/projetos/${idProjeto}`, {
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
                    text: data.message || "Projeto removida com sucesso!",
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
                    text: data.message || "Projeto não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover Projeto " + idProjeto + ": ", error);
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
