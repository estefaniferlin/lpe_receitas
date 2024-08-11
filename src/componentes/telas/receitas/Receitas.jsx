import { useState, useEffect } from "react";
import ReceitasContext from "./ReceitasContext"; // Renomeado
import Tabela from "./Tabela"; // Certifique-se de que Tabela está adaptada para receitas
import Form from "./Form"; // Certifique-se de que Form está adaptada para receitas
import Carregando from "../../comuns/Carregando";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteReceitaFirebase, addReceitaFirebase, updateReceitaFirebase, getReceitasUIDFirebase } from "../../servicos/ReceitaService";
import { Navigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Alerta from "../../comuns/Alerta";
import AddIcon from '@mui/icons-material/Add';

function Receitas() {

    const [user, loading, error] = useAuthState(auth);
    const nav = useNavigate()

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaReceitas, setListaReceitas] = useState([]); // Alterado para listaReceitas
    const [editar, setEditar] = useState(false);
    const [receita, setReceita] = useState({ // Alterado para receita
        id: '',
        nome: '', // Alterado para nome
        tempoPreparo: '', // Alterado para tempoPreparo
        qtdPessoas: '', // Alterado para qtdPessoas
        tipo: '', // Alterado para tipo
        ingredientes: [], // Alterado para ingredientes
        modoPreparo: '', // Alterado para modoPreparo
        usuario: '',
        email: '',
        uid: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novaReceita = () => { // Alterado para novaReceita
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setReceita({ // Alterado para receita
            id: '',
            nome: '', // Alterado para nome
            tempoPreparo: '', // Alterado para tempoPreparo
            qtdPessoas: '', // Alterado para qtdPessoas
            tipo: '', // Alterado para tipo
            ingredientes: [], // Alterado para ingredientes
            modoPreparo: '', // Alterado para modoPreparo
            usuario: user?.displayName,
            email: user?.email,
            uid: user?.uid
        });
        setAbreDialogo(true);
    }

    const editarReceita = async (receita) => { // Alterado para editarReceita
        setReceita(receita); // Alterado para receita
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    // const acaoCadastrar = async e => {
    //     e.preventDefault();
    //     if (editar) {

    //         try {

    //             setAlerta({ status: "success", message: "Post atualizado com sucesso" });
    //         } catch (err) {
    //             setAlerta({ status: "error", message: "Erro ao atualizar o POST:" + err });
    //         }
    //     } else { // novo 
    //         try {
    //             setEditar(true);
    //             setAlerta({ status: "success", message: "Post criado com sucesso" });
    //         } catch (err) {
    //             setAlerta({ status: "error", message: "Erro ao criar o POST:" + err });
    //         }
    //     }
    // }
    // Quando usar frebase substituir por esse

    const alterarParaArray = (objeto) => {
        const newObjeto = objeto.split(/[,]+/)
        return newObjeto
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                const newIngredientes = alterarParaArray(receita.ingredientes)
                receita.ingredientes = newIngredientes
                console.log(receita)
                await updateReceitaFirebase(receita); // Alterado para updateReceitaFirebase
                setAlerta({ status: "success", message: "Receita atualizada com sucesso" });
                setAbreDialogo(false);
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar a Receita:" + err });
            }
        } else { // nova 
            try {
                const newIngredientes = alterarParaArray(receita.ingredientes)
                receita.ingredientes = newIngredientes
                console.log(receita)
                setReceita(await addReceitaFirebase(receita)); // Alterado para addReceitaFirebase
                setEditar(true);
                setAlerta({ status: "success", message: "Receita criada com sucesso" });
                setAbreDialogo(false);
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar a Receita:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReceita({ ...receita, [name]: value }); // Alterado para receita
    }

    // const remover = async (objeto) => {
    //     if (window.confirm("Remover este objeto?")) {
    //         try {
    //             setAlerta({ status: "success", message: "Post removido com sucesso!" });
    //         } catch (err) {
    //             setAlerta({ status: "error", message: "Erro ao  remover: " + err });
    //         }
    //     }
    // }
    
    // Quando usar firebase substitui por esse

    const remover = async (receita) => { // Alterado para remover Receita
        if (window.confirm("Remover esta receita?")) {
            try {
                deleteReceitaFirebase(receita); // Alterado para deleteReceitaFirebase
                setAlerta({ status: "success", message: "Receita removida com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao remover: " + err });
            }
        }
    }
    

    useEffect(() => {
        setCarregando(true)
        if(user?.uid != null)
        {
            const uid = user?.uid
            getReceitasUIDFirebase(uid, setListaReceitas)
        }    
        setCarregando(false)
    }, [user]);

    if (user) {
        return (
            <ReceitasContext.Provider value={{ // Alterado para ReceitasContext
                alerta, setAlerta,
                listaReceitas, setListaReceitas, // Alterado para listaReceitas
                remover,
                receita, setReceita, // Alterado para receita
                editarReceita, novaReceita, acaoCadastrar, // Alterado para novaReceita e editarReceita
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                <Alerta alerta={alerta} />
                <Button variant="outlined"
                    onClick={() => novaReceita()}>
                    <AddIcon /> Nova Receita
                </Button>
            {listaReceitas.length === 0 &&
                <Typography variant="h4">
                    Nenhuma receita encontrada
                </Typography>}
                <Grid container spacing={2}>
                {listaReceitas.length > 0 && (
                    listaReceitas.map(receita => (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={receita.id}>
                            <Card sx={{ minWidth: 50 }} key={receita.id}>
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        {receita.nome}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {receita.tipo}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {receita.usuario}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {receita.email}
                                    </Typography>
                                    <MenuItem key={0} onClick={() => { editarReceita(receita) }}>
                                        <EditIcon /> Editar
                                    </MenuItem>
                                    <MenuItem key={1} onClick={() => { remover(receita) }}>
                                        <DeleteIcon /> Excluir
                                    </MenuItem>
                                </CardContent>
                            </Card>
                        </Grid>
                        ))
                    )}
                </Grid>
                </Carregando>
                <Form />
            </ReceitasContext.Provider>
        )
    } else {
      return <Navigate to="/" />
    }

}

export default Receitas;