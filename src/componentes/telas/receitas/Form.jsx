import { useState, useContext } from "react";
import ReceitasContext from "./ReceitasContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

function Form() {

    const { receita, handleChange, acaoCadastrar, abreDialogo, setAbreDialogo } = useContext(ReceitasContext);

    const handleClose = () => {
        setAbreDialogo(false);
    };

    const tiposReceita = [
        { value: 'Prato Principal', label: 'Prato Principal' },
        { value: 'Sobremesa', label: 'Sobremesa' },
        { value: 'Café da Manhã', label: 'Café da Manhã' },
        { value: 'Entrada', label: 'Entrada' },
        // Adicione outros tipos de receitas conforme necessário
    ];

    return (
        <Dialog open={abreDialogo} onClose={handleClose}>
            <DialogTitle>Cadastro de Receita</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="nome"
                    label="Título"
                    value={receita.nome}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="tempoPreparo"
                    label="Tempo de Preparo (minutos)"
                    value={receita.tempoPreparo}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    type="number"
                />
                <TextField
                    margin="dense"
                    name="qtdPessoas"
                    label="Quantidade de Pessoas"
                    value={receita.qtdPessoas}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    type="number"
                />
                <TextField
                    margin="dense"
                    name="tipo"
                    label="Tipo de Receita"
                    value={receita.tipo}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    select
                >
                    {tiposReceita.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    name="ingredientes"
                    label="Ingredientes"
                    value={receita.ingredientes}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                />
                <TextField
                    margin="dense"
                    name="modoPreparo"
                    label="Modo de Preparo"
                    value={receita.modoPreparo}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={(e) => acaoCadastrar(e)}>Salvar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Form;
