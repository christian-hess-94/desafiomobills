import { CREATE_RECEITA, READ_RECEITAS, UPDATE_RECEITA, DELETE_RECEITA, RESET_CREATE_RECEITA, START_RECEITA_UPDATE, RESET_UPDATE_RECEITA, RESET_DELETE_RECEITA } from "./types";
import { firebaseFirestore } from '../../firebase/FirebaseEnv'


/**
 * Função para remover a receita criada do estado da aplicação
 */
export const resetCreateReceita = () => dispatch => {
    console.log("Reseting CreateReceita")
    dispatch({
        type: RESET_CREATE_RECEITA,
    })
}

/**
 * Função para remover a receita criada do estado da aplicação
 */
export const resetUpdateReceita = () => dispatch => {
    console.log("Reseting UpdateReceita")
    dispatch({
        type: RESET_UPDATE_RECEITA,
    })
}

/**
 * Função para remover a receita criada do estado da aplicação
 */
export const resetDeleteReceita = () => dispatch => {
    console.log("Reseting DeleteReceita")
    dispatch({
        type: RESET_DELETE_RECEITA,
    })
}

/**
 * Função para criar uma nova
 */
export const createReceita = (receitaData) => dispatch => {
    console.log("Creating Receita: " + JSON.stringify(receitaData))
    let fullReceita = {
        id: '',
        valor: receitaData.valor,
        descricao: receitaData.descricao,
        data: receitaData.data,
        recebido: receitaData.recebido,
        uid: receitaData.uid
    }
    firebaseFirestore.collection('receitas').add(receitaData)
        .then(res => {
            console.log("Retornado do firebase");
            console.log(res.id);
            fullReceita.id = res.id
        })
        .then(receita => {
            dispatch({
                type: CREATE_RECEITA,
                payload: fullReceita
            })
        })
        .catch(err => {
            console.error(err)
        })
}

/**
 * Função para ler as receitas da conta logada
 */
export const readReceitas = (loggedAccount) => dispatch => {
    console.log("Reading Receitas from " + JSON.stringify(loggedAccount.uid))
    //TODO: Código para ler as Receitas
    let receitasFromFirebase = []

    firebaseFirestore.collection('receitas').where("uid", "==", loggedAccount.uid).get()
        .then(snapshot => {
            snapshot.forEach(receita => {
                console.log("id: " + receita.id);
                let fullReceita = receita.data()
                fullReceita['id'] = receita.id
                receitasFromFirebase.push(fullReceita)
            })
            console.log(receitasFromFirebase);
            dispatch({
                type: READ_RECEITAS,
                payload: receitasFromFirebase
            })
        })
        .catch(err => {
            console.error(err);
        })
}
/**
 * Função para prepara a atualização da receita
 */
export const startUpdatingReceita = (receitaToUpdate) => dispatch => {
    console.log("Receita para update: " + receitaToUpdate);
    dispatch({
        type: START_RECEITA_UPDATE,
        payload: receitaToUpdate
    })
}
/**
 * Função para atualizar uma receita
 */
export const updateReceita = (updatedReceita) => dispatch => {
    console.log("Atualizando receita: " + JSON.stringify(updatedReceita));
    firebaseFirestore.collection("receitas").doc(updatedReceita.id).update(updatedReceita)
        .then(() => {
            console.log("Atualizou");
            dispatch({
                type: UPDATE_RECEITA,
            })
        })

    /*
    */
}

/**
 * Função para atualizar uma receita
 */
export const deleteReceita = (deletedReceita) => dispatch => {
    console.log("Deletando receita: " + JSON.stringify(deletedReceita));
    firebaseFirestore.collection("receitas").doc(deletedReceita.id).delete()
        .then(() => {
            console.log("Deletou");
            dispatch({
                type: DELETE_RECEITA,
            })
        })


    /*
    */
}