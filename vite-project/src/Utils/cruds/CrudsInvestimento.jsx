import Swal from "sweetalert2";
import { mostrarAlertaStatus } from '../SwalHelper';

const token = JSON.parse(localStorage.getItem('token'));

export const postInvestimento = async (newInvestimento) => {
    try {
        const formattedInvestimento = JSON.stringify(newInvestimento);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/investimentos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedInvestimento,
        });

        const data = await res.json();
        mostrarAlertaStatus(res.status, "Investimento", "criado", data.message);

        return data;
    } catch (error) {
        mostrarAlertaStatus(500, "Investimento", "criar", error.message);
    }
};

export const putInvestimento = async (modifiedInvestimento, idInvestimento) => {
    try {
        const formattedInvestimento = JSON.stringify(modifiedInvestimento);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/investimentos/${idInvestimento}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedInvestimento,
        });

        const data = await res.json();

        if (res.ok) {
            mostrarAlertaStatus(res.status, "Investimento", "editado");
        } else {
            mostrarAlertaStatus(res.status, "Investimento", "editar", data.message);
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Investimento", "editar", error.message);
    }
};

export const deleteInvestimento = async (idInvestimento, body) => {
    const formattedInvestimento = JSON.stringify(body);

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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/investimentos/${idInvestimento}`, {
                method: 'DELETE',
                body: formattedInvestimento,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await res.json();

            if (res.ok) {
                mostrarAlertaStatus(res.status, "Investimento", "removido");
            } else {
                mostrarAlertaStatus(res.status, "Investimento", "remover", data.message || "Investimento não encontrado!");
            }
        }
    } catch (error) {
        console.error("Erro ao remover Investimento " + idInvestimento + ": ", error);
        mostrarAlertaStatus(500, "Investimento", "remover", error.message);
    }
};
