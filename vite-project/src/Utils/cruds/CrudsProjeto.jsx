import Swal from "sweetalert2";
import { showSwal } from "../SwalHelper"
const token = JSON.parse(localStorage.getItem('token'));

export const postProjeto = async (newProjeto) => {
    try {
        const formattedProjeto = JSON.stringify(newProjeto);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/projetos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedProjeto,
        });

        const data = await res.json();

        showSwal(res.status, data.message || "Projeto cadastrado!");
        return res.ok;

    } catch (error) {
        console.error(error);
    }
};

export const getProjetos = async (idEmpresa, page, size, nome) => {
    try {
        const url = nome != null
            ? `/projetos/listarPorEmpresa/${idEmpresa}?page=${page}&size=${size}&nome=${nome}`
            : `/projetos/listarPorEmpresa/${idEmpresa}?page=${page}&size=${size}`;

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Erro ao buscar projetos');
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

export const getProjetoAtual = async (idProjeto) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/projetos/${idProjeto}`, {
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

export const putProjeto = async (modifiedProjeto, idProjeto) => {
    try {
        const formattedProjeto = JSON.stringify(modifiedProjeto);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/projetos/${idProjeto}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedProjeto,
        });

        const data = await res.json();

        showSwal(res.status, data.message || "Informações atualizadas!");
        return res.ok;
    } catch (error) {
        console.error(error);
    }
};

export const deleteProjeto = async (idProjeto, body) => {
    const formattedProjeto = JSON.stringify(body);

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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/projetos/${idProjeto}`, {
                method: 'DELETE',
                body: formattedProjeto,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                // resposta sem JSON (ex: 204 No Content)
            }

            showSwal(res.status, data?.message || "Projeto removido!");
            return res.status === 204;

        }
    } catch (error) {
        console.error("Erro ao remover Projeto " + idProjeto + ": ", error);
    }
};
