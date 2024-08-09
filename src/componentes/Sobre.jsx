import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Sobre() {
    return (
        <div style={{ padding: '20px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container alignContent={'center'} justifyContent={'center'}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Card sx={{ minWidth: 50 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Sobre o Aplicativo
                                </Typography>
                                <Typography variant="body2">
                                    Este aplicativo foi desenvolvido para armazenar e compartilhar receitas culinárias. 
                                    Você pode criar, visualizar e editar suas receitas favoritas. Aproveite para explorar 
                                    novas ideias e organizar seu caderno de receitas virtual!
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Sobre;
