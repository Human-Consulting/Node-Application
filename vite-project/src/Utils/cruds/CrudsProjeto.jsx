import Swal from "sweetalert2";
import { mostrarAlertaStatus } from '../SwalHelper';

const token = JSON.parse(localStorage.getItem('token'));

export const postProjeto = async (newProjeto, toogleModal) => {
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

        mostrarAlertaStatus(res.status, "Projeto", "criado", data.message);

        if (res.ok) {
            toogleModal && toogleModal();
            return data;
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Projeto", "criar", error.message);
    }
};

export const getProjetos = async (idEmpresa) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/projetos/buscarPorEmpresa/${idEmpresa}`, {
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

export const putProjeto = async (modifiedProjeto, idProjeto, toogleModal) => {
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

        mostrarAlertaStatus(res.status, "Projeto", "editado", data.message);

        if (res.ok) {
            toogleModal && toogleModal();
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Projeto", "editar", error.message);
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

            const data = await res.json();

            mostrarAlertaStatus(res.status, "Projeto", "removido", data.message);
        }
    } catch (error) {
        console.error("Erro ao remover Projeto " + idProjeto + ": ", error);
        mostrarAlertaStatus(500, "Projeto", "remover", error.message);
    }
};
