import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper";
import { apiRequest, apiRequestFormData } from "../apiClient";

export interface Usuario {
    idUsuario?: number;
    nome?: string;
    email?: string;
    cargo?: string;
    area?: string;
    permissao?: string;
    fkEmpresa?: number | string;
    [key: string]: unknown;
}

export interface UsuarioPayload {
    nome: string;
    email: string;
    cargo?: string;
    area?: string;
    permissao?: string;
    fkEmpresa?: number | string;
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

export const postUsuario = async (newUsuario: UsuarioPayload): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>('/usuarios', {
            method: 'POST',
            body: newUsuario,
        });

        showSwal(response.status, data?.message || "Usuário cadastrado!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getUsuarios = async (
    idEmpresa: number | string,
    page: number,
    size: number,
    nome?: string | null,
    comConsultores?: boolean | string
): Promise<PagedResponse<Usuario> | null> => {
    try {
        const path = nome != null
            ? `/usuarios/buscarPorEmpresa/${idEmpresa}?page=${page}&size=${size}&nome=${nome}&comConsultores=${comConsultores}`
            : `/usuarios/buscarPorEmpresa/${idEmpresa}?page=${page}&size=${size}&comConsultores=${comConsultores}`;

        const { response, data } = await apiRequest<PagedResponse<Usuario>>(path, {
            method: 'GET',
        });

        if (!response.ok) throw new Error('Erro ao buscar usuários');
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};

export const getUsuariosResponsaveis = async (
    idEmpresa: number | string,
    page: number,
    size: number,
    nome?: string | null
): Promise<PagedResponse<Usuario> | null> => {
    try {
        const path = `/usuarios/buscarResponsaveisPorEmpresa/${idEmpresa}?page=${page}&size=${size}&nome=${nome}`;

        const { response, data } = await apiRequest<PagedResponse<Usuario>>(path, {
            method: 'GET',
        });

        if (!response.ok) throw new Error('Erro ao buscar usuários');
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};

export const putUsuario = async (
    modifiedUsuario: Partial<UsuarioPayload> & EditorBody,
    idUsuario: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/usuarios/${idUsuario}`, {
            method: 'PATCH',
            body: modifiedUsuario,
        });

        showSwal(response.status, data?.message || "Informações atualizadas!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const putSenhaUsuario = async (
    modifiedUsuario: Record<string, unknown>,
    idUsuario: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/usuarios/atualizarSenha/${idUsuario}`, {
            method: 'PATCH',
            body: modifiedUsuario,
        });

        showSwal(response.status, data?.message || "Senha atualizada!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const putEsqueciASenhaUsuario = async (
    modifiedUsuario: Record<string, unknown>,
    idUsuario: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/usuarios/esqueciASenha/${idUsuario}`, {
            method: 'PATCH',
            body: modifiedUsuario,
        });

        showSwal(response.status, data?.message || "Senha atualizada!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const putCoresUsuario = async (
    modifiedUsuario: string | Record<string, unknown>,
    idUsuario: number | string
): Promise<boolean> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>(`/usuarios/atualizarCores/${idUsuario}`, {
            method: 'PATCH',
            body: modifiedUsuario,
        });

        showSwal(response.status, data?.message || "Cores atualizadas!");
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteUsuario = async (idUsuario: number | string, body: EditorBody): Promise<boolean | undefined> => {
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
            const { response, data } = await apiRequest<{ message?: string }>(`/usuarios/${idUsuario}`, {
                method: 'DELETE',
                body,
            });

            showSwal(response.status, data?.message || "Usuário removido!");
            return response.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover Usuario " + idUsuario + ": ", error);
    }
};

export const uploadFile = async (file: File, toogleModal?: (() => void) | null): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const { response, data } = await apiRequestFormData<{ message?: string }>('/usuarios/upload', formData, {
            method: 'POST',
        });

        Swal.fire({
            icon: response.ok ? "success" : "error",
            title: String(response.status),
            backdrop: false,
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            text: data?.message || (response.ok ? "Dados enviados com sucesso!" : "Erro ao cadastrar via upload!"),
            customClass: {
                popup: "swalAlerta",
            }
        });

        if (response.ok) {
            toogleModal?.();
        }
    } catch (error) {
        console.error("Erro ao enviar arquivo: ", error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error instanceof Error ? error.message : "Erro ao cadastrar via upload!",
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

export const getUsuario = async (idUsuario: number | string): Promise<Usuario | null> => {
    try {
        const { data } = await apiRequest<Usuario>(`/usuarios/${idUsuario}`, {
            method: 'GET',
        });
        localStorage.setItem("usuario", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};

export const getIdUsuario = async (email: string): Promise<unknown> => {
    try {
        const { data } = await apiRequest(`/usuarios/emailExistente/${email}`, {
            method: 'GET',
        });
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};

export const enviarCodigo = async (body: Record<string, unknown>): Promise<boolean | null> => {
    try {
        const { response, data } = await apiRequest<{ message?: string }>('/usuarios/codigoEsqueciASenha', {
            method: 'POST',
            body,
        });

        showSwal(response.status, data?.message || "Código enviado!");
        return response.ok;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return null;
    }
};
