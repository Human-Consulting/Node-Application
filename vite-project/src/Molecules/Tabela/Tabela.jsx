import { Pagination, Stack } from "@mui/material";
import Linha from "./Linha/Linha";
import "./Tabela.css"

const Tabela = ({ usuarios, toogleModal, atualizarUsuarios, totalPages, page, setPage  }) => {

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Área</th>
                        <th>Cargo</th>
                        {/* <th>Permissão</th> */}
                        {/* <th>Tarefas</th> */}
                        {/* <th>Impedimento</th> */}
                        <th>Ações</th>
                    </tr>
                </thead>
            </table>

            <div className="table-body-scroll">
                <table>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <Linha
                                key={usuario.idUsuario}
                                usuario={usuario}
                                toogleModal={toogleModal}
                                atualizarUsuarios={atualizarUsuarios}
                            />
                        ))}
                    </tbody>
                </table>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={(e, value) => setPage(value - 1)}
                        color="primary"
                        sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
                    />
                </Stack>
            </div>
        </div>
    )
}

export default Tabela;