import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getReceitasFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'receitas'))
            onSnapshot(q, (querySnapshot) => {
                setListaObjetos(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome, // Alterado para 'nome'
                    tempoPreparo: doc.data().tempoPreparo, // Alterado para 'tempoPreparo'
                    qtdPessoas: doc.data().qtdPessoas, // Alterado para 'qtdPessoas'
                    tipo: doc.data().tipo, // Alterado para 'tipo'
                    ingredientes: doc.data().ingredientes, // Alterado para 'ingredientes'
                    modoPreparo: doc.data().modoPreparo, // Alterado para 'modoPreparo'
                    usuario: doc.data().usuario,
                    email: doc.data().email,
                    uid: doc.data().uid
                })))
            })
        } catch (err) {
            throw err;
    }
}


export const getReceitasUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "receitas");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome, // Alterado para 'nome'
                tempoPreparo: doc.data().tempoPreparo, // Alterado para 'tempoPreparo'
                qtdPessoas: doc.data().qtdPessoas, // Alterado para 'qtdPessoas'
                tipo: doc.data().tipo, // Alterado para 'tipo'
                ingredientes: doc.data().ingredientes, // Alterado para 'ingredientes'
                modoPreparo: doc.data().modoPreparo, // Alterado para 'modoPreparo'
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
     }
}

export const deleteReceitaFirebase = async objeto => {
    try {
        const receitaDocRef = doc(db, 'receitas', objeto.id)
        await deleteDoc(receitaDocRef);
    } catch (err) {
        throw err;
    }
}

export const addReceitaFirebase = async objeto => {
    try {
         let ret = await addDoc(collection(db, 'receitas'),
            {
                nome: objeto.nome,
                tempoPreparo: objeto.tempoPreparo,
                qtdPessoas: objeto.qtdPessoas, 
                tipo: objeto.tipo, 
                ingredientes: objeto.ingredientes, 
                modoPreparo: objeto.modoPreparo, 
                usuario: objeto.usuario,
                email: objeto.email,
                uid: objeto.uid
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateReceitaFirebase = async objeto => {
    try {
        const receitaDocRef = doc(db, 'receitas', objeto.id)
        await updateDoc(receitaDocRef, {
            nome: objeto.nome,
            tempoPreparo: objeto.tempoPreparo,
            qtdPessoas: objeto.qtdPessoas, 
            tipo: objeto.tipo, 
            ingredientes: objeto.ingredientes,
            modoPreparo: objeto.modoPreparo,
            usuario: objeto.usuario,
            email: objeto.email,
            uid: objeto.uid
        })
    } catch (err) {
    throw err;
    }
}