import Swal from "sweetalert2";
import { mostrarAlertaStatus } from '../SwalHelper';

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

        if (res.ok) {
            mostrarAlertaStatus(res.status, "Empresa", "criada");
            return data;
        } else {
            mostrarAlertaStatus(res.status, "Empresa", "criar", data.message);
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Empresa", "criar", error.message);
    }
};

export const getEmpresas = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/empresas`, {
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

        if (res.ok) {
            mostrarAlertaStatus(res.status, "Empresa", "editada");
        } else {
            mostrarAlertaStatus(res.status, "Empresa", "editar", data.message);
        }
    } catch (error) {
        console.error(error);
        mostrarAlertaStatus(500, "Empresa", "editar", error.message);
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

            if (res.ok) {
                mostrarAlertaStatus(res.status, "Empresa", "removida");
            } else {
                const data = await res.json();
                mostrarAlertaStatus(res.status, "Empresa", "remover", data.message || "Empresa não encontrada!");
            }
        }
    } catch (error) {
        console.error("Erro ao remover Empresa " + idEmpresa + ": ", error);
        mostrarAlertaStatus(500, "Empresa", "remover", error.message);
    }
};
