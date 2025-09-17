import Swal from "sweetalert2";

export const showSwal = (status, conteudo) => {
    let title = "";
    let text = "";
    let icon = "info";

    switch (status) {
        case 200:
            icon = "success";
            title = "Sucesso!";
            break;
        case 201:
            icon = "success";
            title = "Criado!";
            break;
        case 400:
            icon = "warning";
            title = "Atenção!";
            text = "Verifique os dados informados.";
            break;
        case 401:
        case 403:
            icon = "error";
            title = "Acesso negado!";
            text = "Você não tem permissão para isso.";
            break;
        case 404:
            icon = "error";
            title = "Não encontrado!";
            break;
        case 500:
            icon = "error";
            title = "Erro no servidor!";
            text = "Tente novamente mais tarde.";
            break;
        default:
            icon = "info";
            title = "Algo aconteceu...";
            text = "Tente novamente.";
            break;
    }

    if (status === 200 && conteudo === "atualizarUsuario") {
        text = "Usuário atualizado com sucesso!";
    }
    if (status === 201 && conteudo === "criarProjeto") {
        text = "Projeto criado com sucesso!";
    }
    if (status === 200 && conteudo === "excluirSprint") {
        text = "Sprint excluída com sucesso!";
    }

    return Swal.fire({
        icon,
        title,
        text: conteudo || text,
        position: "center",
        backdrop: false,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
            popup: "swalAlerta",
        }
    });
};
