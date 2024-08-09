import { useContext, useMemo } from "react";
import ReceitasContext from "./ReceitasContext";
import Alerta from "../../comuns/Alerta";
import { MaterialReactTable } from 'material-react-table';
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Tabela() {

    const { alerta, listaReceitas, remover, editarReceita, novaReceita } = useContext(ReceitasContext);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'titulo',
                header: 'Título',
            },
            {
                accessorKey: 'descricao',
                header: 'Descrição',
            },
            {
                accessorKey: 'tempoPreparo',
                header: 'Tempo de Preparo (min)',
            },
            {
                accessorKey: 'qtdPessoas',
                header: 'Para Quantas Pessoas',
            },
            {
                accessorKey: 'tipo',
                header: 'Tipo',
            },
            {
                accessorKey: 'ingredientes',
                header: 'Ingredientes',
            },
            {
                accessorKey: 'modoPreparo',
                header: 'Modo de Preparo',
            },
            {
                accessorKey: 'usuario',
                header: 'Usuário',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'uid',
                header: 'UID',
            },
        ],
        [],
    );

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4">
                Receitas
            </Typography>
            <Alerta alerta={alerta} />
            <Button variant="outlined"
                onClick={() => novaReceita()}>
                <AddIcon /> Nova Receita
            </Button>
            {listaReceitas.length === 0 &&
                <Typography variant="h4">
                    Nenhuma receita encontrada
                </Typography>}
            {listaReceitas.length > 0 && (
                <MaterialReactTable
                    enableGlobalFilter={true}
                    enableFullScreenToggle={false}
                    columns={columns}
                    data={listaReceitas}
                    enableColumnActions={false}
                    enableRowActions
                    positionActionsColumn="last"
                    renderRowActionMenuItems={({ row }) => [
                        <MenuItem key={0} onClick={() => { editarReceita(row.original) }}>
                            <EditIcon /> Editar
                        </MenuItem>,
                        <MenuItem key={1} onClick={() => { remover(row.original) }}>
                            <DeleteIcon /> Excluir
                        </MenuItem>,
                    ]}
                />
            )}
        </div>
    )
}

export default Tabela;
