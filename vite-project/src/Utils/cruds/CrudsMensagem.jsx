import Swal from "sweetalert2";

const token = JSON.parse(localStorage.getItem('token'));

export const postMensagem = async (newMensagem) => {
    try {
        const formattedMensagem = JSON.stringify(newMensagem);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/mensagens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedMensagem,
        });

        const data = await res.json();

        showSwal(res.status, res.statusText);
        return res.ok ? data : false;
    } catch (error) {
        console.error(error);
    }
};

export const getMensagems = async (idUsuario) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/salas/porUsuario/${idUsuario}`, {
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

export const putMensagem = async (modifiedMensagem, idMensagem) => {
    try {
        const formattedMensagem = JSON.stringify(modifiedMensagem);

        const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/mensagens/${idMensagem}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formattedMensagem,
        });

        showSwal(res.status, res.statusText);
        return res.ok;
    } catch (error) {
        console.error(error);
    }
};

export const deleteMensagem = async (idMensagem, body) => {

    const formattedMensagem = JSON.stringify(body);
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
            const res = await fetch(`${import.meta.env.VITE_ENDERECO_API}/mensagens/${idMensagem}`, {
                method: 'DELETE',
                body: formattedMensagem,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            showSwal(res.status, res.statusText);
        return res.ok;
        }
    } catch (error) {
        console.error("Erro ao remover Mensagem " + idMensagem + ": ", error);
    }
};
