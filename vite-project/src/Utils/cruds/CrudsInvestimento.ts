import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";

export interface Investimento {
    idInvestimento?: number;
    descricao?: string;
    valor?: number | string;
    dtInvestimento?: string;
    fkProjeto?: number | string;
    [key: string]: unknown;
}

export interface InvestimentoPayload {
    descricao: string;
    valor: number | string;
    dtInvestimento: string;
    fkProjeto?: number | string;
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export interface EditorBody {
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export const postInvestimento = async (newInvestimento: InvestimentoPayload): Promise<boolean | undefined> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
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

export const putInvestimento = async (
    modifiedInvestimento: Partial<InvestimentoPayload> & EditorBody,
    idInvestimento: number | string
): Promise<boolean | undefined> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
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

export const deleteInvestimento = async (idInvestimento: number | string, body: EditorBody): Promise<boolean | undefined> => {
    const formattedInvestimento = JSON.stringify(body);
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
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
