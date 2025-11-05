import { Block, HourglassEmpty } from "@mui/icons-material";
import { getDiffDias } from "./getInfos";

export const useWarningValidator = (item) => {
    if (!item) return null;
    const comImpedimento = item.comImpedimento;
    const dtFim = item.dtFim;
    const progresso = item.progresso;
    const diffDias = getDiffDias(dtFim);

    let cor, Icon;

    if (!comImpedimento && diffDias > 0) return null;

    if (comImpedimento || (diffDias < 0 && progresso < 100)) {
        cor = "#ff1744";
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