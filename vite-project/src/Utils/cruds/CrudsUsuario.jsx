import Swal from "sweetalert2";
const token = JSON.parse(localStorage.getItem('token'));

export const postUsuario = async (newUsuario, toogleModal) => {
    try {
        const formattedUsuario = JSON.stringify(newUsuario);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedUsuario,
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
            toogleModal && toogleModal();
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao cadastrar!",
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

export const getUsuarios = async (idEmpresa) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/buscarPorEmpresa/${idEmpresa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const formattedUsuario = JSON.stringify(modifiedUsuario);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedUsuario,
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
                text: data.message || "Erro",
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

export const putSenhaUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const formattedUsuario = JSON.stringify(modifiedUsuario);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/atualizarSenha/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedUsuario,
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
                text: data.message || "Erro",
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

export const putEsqueciASenhaUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const formattedUsuario = JSON.stringify(modifiedUsuario);
        console.log("Dados enviados oi:", formattedUsuario);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/esqueciASenha/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedUsuario,
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
            return true;
        } else {
            Swal.fire({
                icon: "error",
                title: res.status,
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro",
                customClass: {
                    popup: "swalAlerta",
                }
            });
            return false;
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

export const putCoresUsuario = async (modifiedUsuario, idUsuario) => {
    try {
        const formattedUsuario = JSON.stringify(modifiedUsuario);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/atualizarCores/${idUsuario}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedUsuario,
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
                text: data.message || "Erro",
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

export const deleteUsuario = async (idUsuario, body) => {
    const formattedUsuario = JSON.stringify(body);

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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/${idUsuario}`, {
                method: 'DELETE',
                body: formattedUsuario,
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
                    text: "Usuario não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover Usuario " + idUsuario + ": ", error);
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

export const uploadFile = async (file, toogleModal) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch("${import.meta.env.VITE_ENDERECO_API}/usuarios/upload", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();

        Swal.fire({
            icon: res.ok ? "success" : "error",
            title: res.status,
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: data.message || (res.ok ? "Dados enviados com sucesso!" : "Erro ao cadastrar via upload!"),
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (res.ok) {
            toogleModal && toogleModal();
        }

    } catch (error) {
        console.error("Erro ao enviar arquivo: ", error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.message || "Erro ao cadastrar via upload!",
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const getUsuario = async (idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const usuario = await res.json();
        localStorage.setItem("usuario", JSON.stringify(usuario));
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
}

export const getIdUsuario = async (email) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/emailExistente/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Resposta do servidor:", res);
        const response = await res.json();

        return response;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
}

export const enviarCodigo = async (body) => {
    try {
        const formattedUsuario = JSON.stringify(body);
        console.log("Dados enviados:", formattedUsuario);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/usuarios/codigoEsqueciASenha`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedUsuario
        });
        if (res.ok) {
            Swal.fire({
                icon: "success",
                position: "center",
                backdrop: false,
                text: "Código enviado com sucesso!",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    popup: "swalAlerta",
                }
            });
            return true;
        } else {
            Swal.fire({
                icon: "error",
                position: "center",
                backdrop: false,
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,
                text: "Erro ao enviar código. Tente novamente.",
                customClass: {
                    popup: "swalAlerta",
                }
            });
            return false;
        }
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
}