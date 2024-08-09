import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function DetalhesReceita() {
    const location = useLocation();
    const receita = location.state;

    // Função para converter a string de ingredientes em um array de objetos
    const parseIngredientes = (ingredientesString) => {
        return ingredientesString
            ? ingredientesString.split(',').map(ingrediente => ({ nome: ingrediente.trim(), riscado: false }))
            : [];
    };

    // Estado dos ingredientes
    const [ingredientes, setIngredientes] = useState(parseIngredientes(receita.ingredientes));

    // Função para alternar o estado de riscado do ingrediente
    const handleCheckboxChange = (index) => {
        const novosIngredientes = ingredientes.map((ingrediente, i) =>
            i === index ? { ...ingrediente, riscado: !ingrediente.riscado } : ingrediente
        );
        setIngredientes(novosIngredientes);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{receita.titulo}</h1>
            <p><strong>Tempo de Preparo:</strong> {receita.tempoPreparo}</p>
            <p><strong>Serve:</strong> {receita.pessoas} pessoas</p>
            <p><strong>Tipo:</strong> {receita.tipoReceita}</p>
            <h3>Ingredientes</h3>
            {ingredientes.length > 0 ? (
                <div>
                    {ingredientes.map((ingrediente, index) => (
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
                        />
                    ))}
                </div>
            ) : (
                <p>Ingredientes não disponíveis</p>
            )}
            <h3>Modo de Preparo</h3>
            <p>{receita.modoPreparo}</p>
        </div>
    );
}

export default DetalhesReceita;
