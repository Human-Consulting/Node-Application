import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";
import { apiRequest } from "../apiClient";

export interface Mensagem {
    idMensagem?: number;
    conteudo?: string;
    fkSala?: number | string;
    [key: string]: unknown;
}

export interface MensagemPayload {
    conteudo?: string;
    fkSala?: number | string;
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export interface EditorBody {
    idEditor?: number;
    permissaoEditor?: string;
    [key: string]: unknown;
}

export const postMensagem = async (newMensagem: MensagemPayload): Promise<Mensagem | false | null> => {
    try {
        const { response, data } = await apiRequest<Mensagem>('/mensagens', {
            method: 'POST',
            body: newMensagem,
        });

        return response.ok ? data : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getMensagems = async (idUsuario: number | string): Promise<unknown[]> => {
    try {
        const { data } = await apiRequest<unknown[]>(`/salas/porUsuario/${idUsuario}`, {
            method: 'GET',
        });
        return data || [];
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putMensagem = async (
    modifiedMensagem: Partial<MensagemPayload> & EditorBody,
    idMensagem: number | string
): Promise<boolean> => {
    try {
        const { response } = await apiRequest(`/mensagens/${idMensagem}`, {
            method: 'PATCH',
            body: modifiedMensagem,
        });

        showSwal(response.status, response.statusText);
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteMensagem = async (idMensagem: number | string, body: EditorBody): Promise<boolean | undefined> => {
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
            const { response } = await apiRequest(`/mensagens/${idMensagem}`, {
                method: 'DELETE',
                body,
            });

            showSwal(response.status, response.statusText);
            return response.ok;
        }
    } catch (error) {
        console.error("Erro ao remover Mensagem " + idMensagem + ": ", error);
    }
};
