import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";
import { apiRequest } from "../apiClient";

export interface Empresa {
    idEmpresa?: number;
    nome?: string;
    cnpj?: string;
    urlImagem?: string;
    [key: string]: unknown;
}

export interface EmpresaPayload {
    nome: string;
    cnpj: string;
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

export const postEmpresa = async (newEmpresa: EmpresaPayload): Promise<Empresa | null> => {
    try {
        const { response, data } = await apiRequest<Empresa & { message?: string }>('/empresas', {
            method: 'POST',
            body: newEmpresa,
        });

        showSwal(response.status, data?.message || "Empresa cadastrada!");
        return response.ok ? data : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getEmpresas = async (
    page: number,
    size: number,
    nome?: string | null
): Promise<PagedResponse<Empresa> | Empresa[] | null> => {
    try {
        const path = nome != null
            ? `/empresas?page=${page}&size=${size}&nome=${nome}`
            : `/empresas?page=${page}&size=${size}`;

        const { response, data } = await apiRequest<PagedResponse<Empresa>>(path, {
            method: 'GET',
        });

        if (!response.ok) throw new Error('Erro ao buscar empresas');
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const getEmpresaAtual = async (idEmpresa: number | string): Promise<Empresa | null | []> => {
    try {
        const { data } = await apiRequest<Empresa>(`/empresas/${idEmpresa}`, {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putEmpresa = async (
    modifiedEmpresa: Partial<EmpresaPayload> & EditorBody,
    idEmpresa: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/empresas/${idEmpresa}`, {
            method: 'PATCH',
            body: modifiedEmpresa,
        });

        showSwal(response.status, data?.message || "Informações atualizadas!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteEmpresa = async (idEmpresa: number | string, body: EditorBody): Promise<boolean | undefined> => {
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
            const { response, data } = await apiRequest<{ message?: string }>(`/empresas/${idEmpresa}`, {
                method: 'DELETE',
                body,
            });

            showSwal(response.status, data?.message || "Empresa removida!");
            return response.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover Empresa " + idEmpresa + ": ", error);
    }
};
