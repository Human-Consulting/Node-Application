import { ConstructionOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";

export const postInvestimento = async (newInvestimento) => {
    try {
        const formattedInvestimento = JSON.stringify(newInvestimento);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/financeiros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedInvestimento,
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
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                text: data.message || "Erro ao adicionar Investimento!",
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
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const putInvestimento = async (modifiedInvestimento, idInvestimento) => {
    try {
        const formattedInvestimento = JSON.stringify(modifiedInvestimento);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/financeiros/${idInvestimento}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formattedInvestimento,
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
                timer: 1500,
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
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};

export const deleteInvestimento = async (idFinanceiro) => {
    console.log("deleteInvestimento", idFinanceiro);
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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/financeiros/${idFinanceiro}`, {
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
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    text: "Investimento não encontrada!",
                    customClass: {
                        popup: "swalAlerta",
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erro ao remover Investimento " + idFinanceiro + ": ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            position: "center",
            backdrop: false,
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            text: error.message || "Algo deu errado!",
            customClass: {
                popup: "swalAlerta",
            }
        });
    }
};
