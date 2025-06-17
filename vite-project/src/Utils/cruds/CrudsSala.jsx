import Swal from "sweetalert2";

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

        if (res.ok) {
            return data;
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao adicionar Sala!",
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
                text: data.message,
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
                },
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
                    text: "Sala não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover Sala " + idSala + ": ", error);
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
