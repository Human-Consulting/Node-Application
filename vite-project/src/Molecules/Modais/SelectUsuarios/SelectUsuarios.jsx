import { useState, useEffect } from "react";
import { Select, MenuItem, Typography, Box, Stack, Pagination, Grow } from "@mui/material";
import { inputStyle } from "../../Modal/Forms/Forms.styles.jsx";

const SelectUsuarios = ({ usuarios = [], sizeUsuarios = 10, pagesUsuarios = 0, atualizarUsuarios, responsavel, fkResponsavel, onChange, disabled, error }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(pagesUsuarios || 0);
  const [pageSize, setPageSize] = useState(sizeUsuarios || 10);

  useEffect(() => {
    const fetch = async () => {
      const data = await atualizarUsuarios(page);
      if (data?.totalPages) setTotalPages(data.totalPages);
    };
    fetch();
  }, [page]);

  const responsavelNaoEstaNaLista = fkResponsavel != '#' && !usuarios.find(
    (usuario) => usuario.idUsuario == fkResponsavel
  );

  return (
    <Select
      value={fkResponsavel}
      onChange={(e) => {
        onChange(e);
      }}
      disabled={disabled}
      fullWidth
      displayEmpty
      sx={{
        ...inputStyle?.sx,
        color: "#FFF",
      }}
      error={!!error}
      MenuProps={{
        TransitionComponent: Grow,
        PaperProps: {
          sx: {
            border: 'solid #888 2px',
            backgroundColor: "#000",
            background: "#22272B",
            color: "#fff",
            borderRadius: 2,
            maxHeight: 450,
            display: "flex",
            flexDirection: "column",
            overflow: "visible",
          },
        },
      }}
    >
      <MenuItem value="#">
        <Typography>Selecione o responsável</Typography>
      </MenuItem>

      {responsavelNaoEstaNaLista && (
        <MenuItem
          key={fkResponsavel}
          value={fkResponsavel}
          sx={{
            display: "flex",
            alignItems: "center",
            background: "#22272B",
            borderRadius: "10px",
            py: 1,
            "&:hover": { background: "#181818" },
          }}
        >
          <Box>
            <Typography color="#fff" fontWeight="bold">
              {responsavel?.nome}
            </Typography>
            <Typography color="#ccc" fontSize={12}>
              {responsavel?.cargo}
            </Typography>
          </Box>
        </MenuItem>
      )}

      {usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          usuario.idUsuario == fkResponsavel && responsavelNaoEstaNaLista ? null :
            <MenuItem
              key={usuario.idUsuario}
              value={usuario.idUsuario}
              sx={{
                display: "flex",
                alignItems: "center",
                background: "#22272B",
                py: 1,
                "&:hover": { background: "#101010" },
              }}
            >
              <Box>
                <Typography color="#fff" fontWeight="bold">
                  {usuario.nome}
                </Typography>
                <Typography color="#ccc" fontSize={12}>
                  {usuario.cargo}
                </Typography>
              </Box>
            </MenuItem>
        ))
      ) : (
        <MenuItem disabled>
          <Typography color="#90caf9" sx={{ textAlign: "center", width: "100%" }}>
            Nenhum usuário encontrado!
          </Typography>
        </MenuItem>
      )}

      {totalPages > 1 && (
        <MenuItem sx={{ justifyContent: "center" }} onClick={(e) => e.stopPropagation()}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ width: "100%", mt: 1 }}
          >
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(e, value) => {
                e.stopPropagation();
                setPage(value - 1);
              }}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": { color: "#fff" },
              }}
            />
          </Stack>
        </MenuItem>
      )}
    </Select>
  );
};

export default SelectUsuarios;
