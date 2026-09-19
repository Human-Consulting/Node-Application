import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export const showSwal = (status: number, conteudo?: string): Promise<SweetAlertResult> => {
    let title = "";
    let icon: SweetAlertIcon = "info";

    switch (status) {
        case 200:
            icon = "success";
            title = "Sucesso!";
            break;
        case 201:
            icon = "success";
            title = "Criado!";
            break;
        case 204:
            icon = "success";
            title = "Sucesso!";
            break;
        case 400:
            icon = "warning";
            title = "Atenção!";
            break;
        case 403:
            icon = "error";
            title = "Acesso negado!";
            break;
        case 404:
            icon = "error";
            title = "Não encontrado!";
            break;
        case 409:
            icon = "error";
            title = "Conflito encontrado!";
            break;
        case 500:
            icon = "error";
            title = "Erro no servidor!";
            break;
        default:
            icon = "info";
            title = "Algo aconteceu...";
            break;
    }

    return Swal.fire({
        icon,
        title,
        text: conteudo,
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
