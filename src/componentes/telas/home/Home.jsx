import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Home() {


    const [listaReceitas, setListaReceitas] = useState([
        {
            id: '1xxx',
            titulo: 'Bolo de Chocolate',
            descricao: 'Uma receita deliciosa de bolo de chocolate...',
            tempoPreparo: '40 minutos', // Adicionado exemplo de tempo de preparo
            pessoas: 8, // Adicionado exemplo de número de pessoas
            tipoReceita: 'Sobremesa', // Adicionado exemplo de tipo de receita
            ingredientes: 'Farinha, açúcar, chocolate, ovos', // Adicionado exemplo de ingredientes
            modoPreparo: 'Misture todos os ingredientes e asse por 30 minutos.', // Adicionado exemplo de modo de preparo
        },
        {
            id: '2xxx',
            titulo: 'Lasagna Italiana',
            descricao: 'Lasagna tradicional italiana...',
            tempoPreparo: '1 hora e 30 minutos',
            pessoas: 6,
            tipoReceita: 'Prato Principal',
            ingredientes: 'Massa de lasagna, carne moída, queijo, molho de tomate',
            modoPreparo: 'Monte a lasagna em camadas e asse por 1 hora.',
        }
    ]);

    //const [listaReceitas, setListaReceitas] = useState([]);

    useEffect(() => {
        //getReceitasFirebase(setListaReceitas);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Minhas Receitas Favoritas
            </Typography>
            {listaReceitas.length === 0 && <Typography variant="h5" component="div">
                Nenhuma receita encontrada
            </Typography>}

            <Grid container spacing={2}>
                {listaReceitas.length > 0 && (
                    listaReceitas.map(receita => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={receita.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {receita.tipoReceita}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {receita.titulo}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {receita.descricao}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <Link to={`/detalhes-receita`} state={receita}>
                                            Ver Receita
                                        </Link>
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {receita.usuario}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {receita.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    )
}

export default Home;
