import Swal from "sweetalert2";

export function mostrarAlertaStatus(status, entidade = "Item", acao = "processado", mensagemErro = null) {
    const baseConfig = {
        position: "center",
        backdrop: false,
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        customClass: {
            popup: "swalAlerta",
        },
    };

    if (status >= 200 && status < 300) {
        Swal.fire({
            ...baseConfig,
            icon: "success",
            title: `${entidade} ${acao} com sucesso!`,
        });
    } else {
        Swal.fire({
            ...baseConfig,
            icon: "error",
            title: `Erro ${status}`,
            text: mensagemErro || `Erro ao ${acao} ${entidade.toLowerCase()}`,
        });
    }
}
    