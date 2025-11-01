const token = JSON.parse(localStorage.getItem('token'));

export const getKpis = async (entidade, idEmpresa) => {
  try {

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
      return null; // caso 204 ou sem corpo
    }
  } catch (error) {
    console.error("Erro ao buscar KPIs:", error);
    return [];
  }
};

export const getMenuRapido = async (entidade, idEmpresa, page, size, nome, impedidos, concluidos) => {
  try {
    const params = new URLSearchParams();

    if (page != null) params.append("page", page);
    if (size != null) params.append("size", size);
    if (nome) params.append("nome", nome);
    if (impedidos != null) params.append("impedidos", impedidos);
    if (concluidos != null) params.append("concluidos", concluidos);

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
      return null; // caso 204 ou sem corpo
    }
  } catch (error) {
    console.error("Erro ao buscar Menu Rápido:", error);
    return [];
  }
};
