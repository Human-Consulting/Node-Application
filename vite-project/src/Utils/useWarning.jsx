import { Block, HourglassEmpty } from "@mui/icons-material";

export const useWarningValidator = (item) => {
    if (!item) return null;
    const comImpedimento = item.comImpedimento;
    const dtFim = item.dtFim;
    const progresso = item.progresso;
    const hoje = new Date();
    const final = new Date(dtFim);
    const diffMs = final - hoje;
    const diffDias = diffMs / (1000 * 60 * 60 * 24);

    let cor, Icon;

    if (!comImpedimento && diffDias > 0) return null;

    if (comImpedimento || (diffDias <= 0 && progresso < 100)) {
        cor = "#ff1744";
        // cor = "#28a745";
        // Icon = Check;
        Icon = Block;
    }
    // if (diffDias <= 0 && progresso < 100) {
    //     cor = "#ff1744";
    //     Icon = HourglassEmpty;
    // }

    if (!Icon) return null;

    const Componente = (
            <Icon sx={{ border: `solid ${cor} 2px`, fontSize: '25px', borderRadius: '50%' }} />
    );

    return Componente;
};