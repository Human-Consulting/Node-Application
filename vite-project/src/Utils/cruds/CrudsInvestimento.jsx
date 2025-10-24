import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper"
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

        showSwal(res.status, data.message);
        return res.ok;
    } catch (error) {
        console.error(error);
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

        showSwal(res.status, data.message);
        return res.ok;
    } catch (error) {
        console.error(error);
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

            showSwal(res.status, "Investimento removido com sucesso!");
            return res.status == 204;
        }
    } catch (error) {
        console.error("Erro ao remover Investimento " + idInvestimento + ": ", error);
    }
};
