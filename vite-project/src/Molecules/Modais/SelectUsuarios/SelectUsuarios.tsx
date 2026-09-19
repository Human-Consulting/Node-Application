import { useState, useEffect } from "react";
import { Select, MenuItem, Typography, Box, Stack, Pagination, Grow, TextField, SelectChangeEvent } from "@mui/material";
import { inputStyle } from "../../Modal/Forms/Forms.styles";
import { Close, Search } from "@mui/icons-material";
import { Usuario } from "../../../Utils/cruds/CrudsUsuario";

interface SelectUsuariosProps {
  usuarios?: Usuario[];
  sizeUsuarios?: number;
  pagesUsuarios?: number;
  // Fetches on demand and reports back the paged shape used below (page
  // count) - callers (ModalProjeto's buscarUsuarios, and the atualizarUsuarios
  // threaded down from MainContent through Task/CentralTask/ModalTarefa) all
  // resolve to a `PagedResponse<Usuario>`-shaped value, but the prop is kept
  // as `void | Promise<unknown>` so it stays compatible with the looser
  // optional signature those call sites are typed with.
  atualizarUsuarios?: (page?: number, nome?: string | null) => void | Promise<unknown>;
  responsavel?: Usuario | null;
  fkResponsavel: string | number;
  onChange: (e: SelectChangeEvent) => void;
  disabled?: boolean;
  error?: boolean;
}

interface PagedUsuariosResult {
  totalPages?: number;
  [key: string]: unknown;
}

// `sizeUsuarios` is accepted for API-compatibility with callers that pass it
// (ModalProjeto, ModalTarefa) but - same as in the original JS - isn't
// actually read here.
const SelectUsuarios = ({ usuarios = [], pagesUsuarios = 0, atualizarUsuarios, responsavel, fkResponsavel, onChange, disabled, error }: SelectUsuariosProps) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(pagesUsuarios || 0);
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  console.log(fkResponsavel);

  const clearSearch = async () => {
    await atualizarUsuarios?.();
    setOnSearch(false);
    setBuscaTitulo("");
  }

  useEffect(() => {
    if (buscaTitulo.trim() !== "") {
      setOnSearch(true);
      const textoLower = buscaTitulo.toLowerCase();
      atualizarUsuarios?.(0, textoLower);
    } else {
      clearSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscaTitulo]);

  useEffect(() => {
    const fetch = async () => {
      const data = await atualizarUsuarios?.(page, null) as PagedUsuariosResult | null | undefined;
      if (data?.totalPages) setTotalPages(data.totalPages);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const responsavelNaoEstaNaLista = fkResponsavel != '#' && !usuarios.find(
    (usuario) => usuario.idUsuario == fkResponsavel
  );

  return (
    <Select
      value={fkResponsavel}
      onChange={(e) => {
        onChange(e as SelectChangeEvent);
      }}
      disabled={disabled}
      fullWidth
      displayEmpty
      sx={{
        ...inputStyle?.sx,
        color: "text.primary",
      }}
      error={!!error}
      MenuProps={{
        TransitionComponent: Grow,
        PaperProps: {
          sx: {
            border: 'solid #888 2px',
            backgroundColor: "background.paper",
            color: "text.primary",
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
            background: "background.paper",
            borderRadius: "10px",
            py: 1,
            "&:hover": { background: "#181818" },
          }}
        >
          <Box>
            <Typography color="text.primary" fontWeight="bold">
              {responsavel?.nome}
            </Typography>
            <Typography color="text.secondary" fontSize={12}>
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
                background: "background.paper",
                py: 1,
                "&:hover": { background: "#101010" },
              }}
            >
              <Box>
                <Typography color="text.primary" fontWeight="bold">
                  {usuario.nome}
                </Typography>
                <Typography color="text.secondary" fontSize={12}>
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

      <Stack sx={{ justifyContent: "center" }}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%", mt: 1 }}
        >
          <Pagination
            count={totalPages}
            page={page + 1}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onChange={(e, value) => {
              e.stopPropagation();
              setPage(value - 1);
            }}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": { color: "text.primary" },
            }}
          />
          <TextField
            value={buscaTitulo}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              setBuscaTitulo(e.target.value);
            }}
            label={<Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search /> Buscar usuário...</Stack>}
            sx={{ flex: 1 }}
            size="large"
            autoComplete="off"
            InputLabelProps={{
              sx: {
                color: "text.primary",
                '&.Mui-focused': {
                  color: 'text.primary',
                }
              }
            }}
            InputProps={{
              sx: {
                color: "text.primary",
                '& .MuiOutlinedInput-notchedOutline': {
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff'
                }
              }
            }}
          />
          <Close
            onClick={clearSearch}
            sx={{
              color: 'text.primary',
              cursor: 'pointer',
              transition: '0.3s',
              border: '1px solid transparent',
              borderRadius: '4px',
              display: `${onSearch ? 'unset' : 'none'}`,
              '&:hover': {
                border: '1px solid #f0f0f0'
              }
            }}
          />
        </Stack>
      </Stack>
    </Select>
  );
};

export default SelectUsuarios;
