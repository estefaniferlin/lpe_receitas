import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

function DetalhesReceita() {
    const location = useLocation();
    console.log(location)
    const receita = location.state;
    // Função para converter a string de ingredientes em um array de objetos
    const parseIngredientes = (ingredientesString) => {
        return ingredientesString
            ?  ingredientesString.split(",").map(ingrediente => {return {"nome": ingrediente.trim(), "riscado": false }})
            : [];
    };

    console.log(receita)
    // Estado dos ingredientes
    const [ingredientes, setIngredientes] = useState(parseIngredientes(receita["ingredientes"].join(",")));

    // Função para alternar o estado de riscado do ingrediente
    const handleCheckboxChange = (index) => {
        const novosIngredientes = ingredientes.map((ingrediente, i) =>
            i === index ? { ...ingrediente, riscado: !ingrediente.riscado } : ingrediente
        );
        setIngredientes(novosIngredientes);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{receita.nome}</h1>
            <p><strong>Tempo de Preparo:</strong> {receita.tempoPreparo}</p>
            <p><strong>Serve:</strong> {receita.qtdPessoas} pessoa(s)</p>
            <p><strong>Tipo:</strong> {receita.tipo}</p>
            <h3>Ingredientes</h3>
            {console.log(ingredientes)}
            
            {ingredientes.length > 0 ? (
                <div>
                    { ingredientes.map((ingrediente, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={ingrediente.riscado}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            }
                            label={ingrediente.nome}
                            style={{ display: 'block' }}
                        >
                            <Typography textAlign="center">{ingrediente.nome}</Typography>
                        </FormControlLabel>
                    ))}
                </div>
            ) : (
                <p>Ingredientes não disponíveis</p>
            )}
            <h3>Modo de Preparo</h3>
            <p>{receita.modoPreparo}</p>
            {receita.imagem && <img src={URL.createObjectURL(receita.imagem)} alt={receita.titulo} style={{ maxWidth: '100%', height: 'auto' }} />}
        </div>
    );
}

export default DetalhesReceita;
