import Swal from "sweetalert2";
import { getUsuario } from "./CrudsUsuario";
import { showSwal } from "../SwalHelper";

export interface Sprint {
    idSprint?: number;
    titulo?: string;
    descricao?: string;
    dtInicio?: string;
    dtFim?: string;
    fkProjeto?: number | string;
    [key: string]: unknown;
}

export interface SprintPayload {
    titulo: string;
    descricao: string;
    dtInicio: string;
    dtFim: string;
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

export const postSprint = async (newSprint: SprintPayload): Promise<boolean | undefined> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const formattedSprint = JSON.stringify(newSprint);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedSprint,
        });

        const data = await res.json();

        showSwal(res.status, data.message || "Sprint cadastrada!");
        return res.ok;
    } catch (error) {
        console.error(error);
    }
};

export const getSprints = async (idProjeto: number | string): Promise<Sprint[]> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/buscarPorProjeto/${idProjeto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        await getUsuario(JSON.parse(localStorage.getItem('usuario') || 'null').idUsuario);
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const getSprint = async (idSprint: number | string): Promise<Sprint | []> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/${idSprint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        await getUsuario(JSON.parse(localStorage.getItem('usuario') || 'null').idUsuario);
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putSprint = async (
    modifiedSprint: Partial<SprintPayload> & EditorBody,
    idSprint: number | string
): Promise<boolean | undefined> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const formattedSprint = JSON.stringify(modifiedSprint);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/${idSprint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedSprint,
        });

        const data = await res.json();

        showSwal(res.status, data.message || "Informações atualizadas!");
        return res.ok;
    } catch (error) {
        console.error(error);
    }
};

export const deleteSprint = async (idSprint: number | string, body: EditorBody): Promise<boolean | undefined> => {
    const formattedSprint = JSON.stringify(body);

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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/sprints/${idSprint}`, {
                method: 'DELETE',
                body: formattedSprint,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            let data: { message?: string } | null = null;
            try {
                data = await res.json();
            } catch {
                // resposta sem JSON (ex: 204 No Content)
            }

            showSwal(res.status, data?.message || "Sprint removida!");
            return res.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover Sprint " + idSprint + ": ", error);
    }
};
