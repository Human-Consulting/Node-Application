import Linha from "./Linha/Linha";
import "./Tabela.css"

const Tabela = ({ usuarios, toogleModal, atualizarUsuarios }) => {

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
            </div>
        </div>
    )
}

export default Tabela;