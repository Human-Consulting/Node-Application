import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper"

const token = JSON.parse(localStorage.getItem('token'));

export const postEmpresa = async (newEmpresa) => {
    try {
        const formattedEmpresa = JSON.stringify(newEmpresa);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/empresas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedEmpresa,
        });

        const data = await res.json();

        showSwal(res.status, data.message || "Empresa cadastrada!");
        if (res.ok) return data;
    } catch (error) {
        console.error(error);
    }
};

export const getEmpresas = async (page, size, nome) => {
    try {
        const url = nome != null
            ? `/empresas?page=${page}&size=${size}&nome=${nome}`
            : `/empresas?page=${page}&size=${size}`;

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Erro ao buscar empresas');
        let data = null;
        try {
            data = await res.json();
        } catch {
            // resposta sem JSON (ex: 204 No Content)
        }
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const getEmpresaAtual = async (idEmpresa) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/empresas/${idEmpresa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        return [];
    }
};

export const putEmpresa = async (modifiedEmpresa, idEmpresa) => {
    try {
        const formattedEmpresa = JSON.stringify(modifiedEmpresa);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/empresas/${idEmpresa}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedEmpresa,
        });

        const data = await res.json();

        showSwal(res.status, data.message || "Informações atualizadas!");
        return res.ok;
    } catch (error) {
        console.error(error);
    }
};

export const deleteEmpresa = async (idEmpresa, body) => {

    const formattedEmpresa = JSON.stringify(body);
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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/empresas/${idEmpresa}`, {
                method: 'DELETE',
                body: formattedEmpresa,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                // resposta sem JSON (ex: 204 No Content)
            }

            showSwal(res.status, data?.message || "Empresa removida!");
            return res.status === 204;
        }
    } catch (error) {
        console.error("Erro ao remover Empresa " + idEmpresa + ": ", error);
    }
};
