export type EntidadeKpi = "projetos" | "empresas" | string;

export interface Kpi {
    [key: string]: unknown;
}

export interface MenuRapidoItem {
    [key: string]: unknown;
}

export const getKpis = async (entidade: EntidadeKpi, idEmpresa: number | string): Promise<Kpi[]> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');

        const url = entidade == "projetos" ?
            `${import.meta.env.VITE_ENDERECO_API}/projetos/kpis/${idEmpresa}`
            :
            `${import.meta.env.VITE_ENDERECO_API}/empresas/kpis`

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Erro ao buscar KPIs");

        try {
            return await res.json();
        } catch {
            return []; // caso 204 ou sem corpo
        }
    } catch (error) {
        console.error("Erro ao buscar KPIs:", error);
        return [];
    }
};

export const getMenuRapido = async (
    entidade: EntidadeKpi,
    idEmpresa: number | string,
    page?: number | null,
    size?: number | null,
    nome?: string | null,
    impedidos?: boolean | null,
    concluidos?: boolean | null
): Promise<MenuRapidoItem[]> => {
    try {
        const token = JSON.parse(localStorage.getItem('token') || 'null');
        const params = new URLSearchParams();

        if (page != null) params.append("page", String(page));
        if (size != null) params.append("size", String(size));
        if (nome) params.append("nome", nome);
        if (impedidos != null) params.append("impedidos", String(impedidos));
        if (concluidos != null) params.append("concluidos", String(concluidos));

        const url = entidade == "projetos" ?
            `${import.meta.env.VITE_ENDERECO_API}/projetos/menuRapido/${idEmpresa}?${params.toString()}`
            :
            `${import.meta.env.VITE_ENDERECO_API}/empresas/menuRapido?${params.toString()}`

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error("Erro ao buscar projetos do menu rápido");

        try {
            return await res.json();
        } catch {
            return []; // caso 204 ou sem corpo
        }
    } catch (error) {
        console.error("Erro ao buscar Menu Rápido:", error);
        return [];
    }
};
