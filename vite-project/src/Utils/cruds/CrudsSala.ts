import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";
import { apiRequest } from "../apiClient";
import { Usuario } from "./CrudsUsuario";

export interface Sala {
    idSala?: number;
    nome?: string;
    urlImagem?: string;
    fkEmpresa?: number | string;
    fkProjeto?: number | string;
    nomeEmpresa?: string;
    participants?: Usuario[];
    [key: string]: unknown;
}

export interface SalaPayload {
    nome?: string;
    urlImagem?: string | null;
    participantes?: (number | string)[];
    fkEmpresa?: number | string;
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

export const postSala = async (newSala: SalaPayload): Promise<Sala | false | null> => {
    try {
        const { response, data } = await apiRequest<Sala & { message?: string }>('/salas', {
            method: 'POST',
            body: newSala,
        });

        showSwal(response.status, data?.message || 'Sala criada com sucesso');
        return response.ok ? data : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getSalas = async (idUsuario: number | string): Promise<Sala[]> => {
    try {
        const { data } = await apiRequest<Sala[]>(`/salas/porUsuario/${idUsuario}`, {
            method: 'GET',
        });
        return data || [];
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putSala = async (
    modifiedSala: Partial<SalaPayload> & EditorBody,
    idSala: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/salas/${idSala}`, {
            method: 'PATCH',
            body: modifiedSala,
        });

        showSwal(response.status, data?.message || 'Sala atualizada');
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteSala = async (idSala: number | string, body: EditorBody): Promise<boolean | undefined> => {
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
            const { response, data } = await apiRequest<{ message?: string }>(`/salas/${idSala}`, {
                method: 'DELETE',
                body,
            });

            showSwal(response.status, data?.message || 'Sala removida');
            return response.ok;
        }
    } catch (error) {
        console.error("Erro ao remover Sala " + idSala + ": ", error);
    }
};
