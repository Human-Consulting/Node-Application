import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";
import { apiRequest } from "../apiClient";

export interface Projeto {
    idProjeto?: number;
    titulo?: string;
    descricao?: string;
    orcamento?: number | string;
    fkResponsavel?: number | string;
    responsavel?: { idUsuario?: number | string; [key: string]: unknown } | null;
    urlImagem?: string;
    [key: string]: unknown;
}

export interface ProjetoPayload {
    fkEmpresa?: number | string;
    titulo: string;
    descricao: string;
    orcamento?: number | string;
    fkResponsavel?: number | string;
    urlImagem?: string;
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export interface PagedResponse<T> {
    content?: T[];
    totalPages?: number;
    totalElements?: number;
    pageSize?: number;
    [key: string]: unknown;
}

export interface EditorBody {
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export const postProjeto = async (newProjeto: ProjetoPayload): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>('/projetos', {
            method: 'POST',
            body: newProjeto,
        });

        showSwal(response.status, data?.message || "Projeto cadastrado!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getProjetos = async (
    idEmpresa: number | string,
    page: number,
    size: number,
    nome?: string | null
): Promise<PagedResponse<Projeto> | Projeto[]> => {
    try {
        const path = nome != null
            ? `/projetos/listarPorEmpresa/${idEmpresa}?page=${page}&size=${size}&nome=${nome}`
            : `/projetos/listarPorEmpresa/${idEmpresa}?page=${page}&size=${size}`;

        const { response, data } = await apiRequest<PagedResponse<Projeto>>(path, {
            method: 'GET',
        });

        if (!response.ok) throw new Error('Erro ao buscar projetos');
        return data as PagedResponse<Projeto>;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const getDashboard = async (idProjeto: number | string): Promise<unknown> => {
    try {
        const { data } = await apiRequest(`/projetos/dashboard/${idProjeto}`, {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const getBurndown = async (idProjeto: number | string): Promise<unknown> => {
    try {
        const { data } = await apiRequest(`/projetos/burndown/${idProjeto}`, {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putProjeto = async (
    modifiedProjeto: Partial<ProjetoPayload> & EditorBody,
    idProjeto: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/projetos/${idProjeto}`, {
            method: 'PATCH',
            body: modifiedProjeto,
        });

        showSwal(response.status, data?.message || "Informações atualizadas!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteProjeto = async (idProjeto: number | string, body: EditorBody): Promise<boolean | undefined> => {
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
            const { response, data } = await apiRequest<{ message?: string }>(`/projetos/${idProjeto}`, {
                method: 'DELETE',
                body,
            });

            showSwal(response.status, data?.message || "Projeto removido!");
            return response.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover Projeto " + idProjeto + ": ", error);
    }
};
