import { useState, useEffect } from "react";
import ReceitasContext from "./ReceitasContext"; // Renomeado
import Tabela from "./Tabela"; // Certifique-se de que Tabela está adaptada para receitas
import Form from "./Form"; // Certifique-se de que Form está adaptada para receitas
import Carregando from "../../comuns/Carregando";
//import { auth } from "../../../firebaseConfig";
//import { useAuthState } from "react-firebase-hooks/auth";
//import { getReceitasUIDFirebase, addReceitaFirebase, updateReceitaFirebase, getReceitasFirebase, deleteReceitaFirebase } from "../../../servicos/ReceitasService"; // Alterado para ReceitaService
//import { Navigate } from "react-router-dom";

function Receitas() {

    //const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaReceitas, setListaReceitas] = useState([]); // Alterado para listaReceitas
    const [editar, setEditar] = useState(false);
    const [receita, setReceita] = useState({ // Alterado para receita
        id: '',
        nome: '', // Alterado para nome
        tempoPreparo: '', // Alterado para tempoPreparo
        quantidadePessoas: '', // Alterado para quantidadePessoas
        tipo: '', // Alterado para tipo
        ingredientes: '', // Alterado para ingredientes
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
            quantidadePessoas: '', // Alterado para quantidadePessoas
            tipo: '', // Alterado para tipo
            ingredientes: '', // Alterado para ingredientes
            modoPreparo: '', // Alterado para modoPreparo
            //usuario: user?.displayName,
            //email: user?.email,
            //uid: user?.uid
        });
        setAbreDialogo(true);
    }

    const editarReceita = async (receita) => { // Alterado para editarReceita
        setReceita(receita); // Alterado para receita
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {

                setAlerta({ status: "success", message: "Post atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o POST:" + err });
            }
        } else { // novo 
            try {
                setEditar(true);
                setAlerta({ status: "success", message: "Post criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o POST:" + err });
            }
        }
    }
    /* Quando usar frebase substituir por esse

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                await updateReceitaFirebase(receita); // Alterado para updateReceitaFirebase
                setAlerta({ status: "success", message: "Receita atualizada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar a Receita:" + err });
            }
        } else { // nova 
            try {
                setReceita(await addReceitaFirebase(receita)); // Alterado para addReceitaFirebase
                setEditar(true);
                setAlerta({ status: "success", message: "Receita criada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar a Receita:" + err });
            }
        }
    }
        */

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReceita({ ...receita, [name]: value }); // Alterado para receita
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                setAlerta({ status: "success", message: "Post removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }
    
    /* Quando usar firebase substitui por esse
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
        */

    useEffect(() => {
        /*
        if (user?.uid != null) {
            const uid = user?.uid;
            getReceitasFirebase(setListaReceitas); // Alterado para getReceitasFirebase
        }
            */
        setCarregando(false);
    }, []); // [user?.uid]

    //if (user) {
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
                    <Tabela />
                </Carregando>
                <Form />
            </ReceitasContext.Provider>
        )
    //} else {
      //  return <Navigate to="/" />
    //}

}

export default Receitas;
