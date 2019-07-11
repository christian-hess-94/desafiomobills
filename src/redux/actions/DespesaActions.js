import { CREATE_DESPESA, READ_DESPESAS, UPDATE_DESPESA, DELETE_DESPESA, RESET_CREATE_DESPESA, START_DESPESA_UPDATE, RESET_UPDATE_DESPESA, RESET_DELETE_DESPESA } from "./types";
import { firebaseFirestore } from './../../firebase/FirebaseEnv'


/**
 * Função para remover a despesa criada do estado da aplicação
 */
export const resetCreateDespesa = () => dispatch => {
    console.log("Reseting CreateDespesa")
    dispatch({
        type: RESET_CREATE_DESPESA,
    })
}

/**
 * Função para remover a despesa criada do estado da aplicação
 */
export const resetUpdateDespesa = () => dispatch => {
    console.log("Reseting UpdateDespesa")
    dispatch({
        type: RESET_UPDATE_DESPESA,
    })
}

/**
 * Função para remover a despesa criada do estado da aplicação
 */
export const resetDeleteDespesa = () => dispatch => {
    console.log("Reseting DeleteDespesa")
    dispatch({
        type: RESET_DELETE_DESPESA,
    })
}

/**
 * Função para criar uma nova
 */
export const createDespesa = (despesaData) => dispatch => {
    console.log("Creating Despesa: " + JSON.stringify(despesaData))
    let fullDespesa = {
        id: '',
        valor: despesaData.valor,
        descricao: despesaData.descricao,
        data: despesaData.data,
        pago: despesaData.pago,
        uid: despesaData.uid
    }
    firebaseFirestore.collection('despesas').add(despesaData)
        .then(res => {
            console.log("Retornado do firebase");
            console.log(res.id);
            fullDespesa.id = res.id
        })
        .then(despesa => {
            dispatch({
                type: CREATE_DESPESA,
                payload: fullDespesa
            })
        })
        .catch(err => {
            console.error(err)
        })
}

/**
 * Função para ler as despesas da conta logada
 */
export const readDespesas = (loggedAccount) => dispatch => {
    console.log("Reading Despesas from " + JSON.stringify(loggedAccount.uid))
    //TODO: Código para ler as Despesas
    let despesasFromFirebase = []

    firebaseFirestore.collection('despesas').where("uid", "==", loggedAccount.uid).get()
        .then(snapshot => {
            snapshot.forEach(despesa => {
                console.log("id: " + despesa.id);
                let fullDespesa = despesa.data()
                fullDespesa['id'] = despesa.id
                despesasFromFirebase.push(fullDespesa)
            })
            console.log(despesasFromFirebase);
            dispatch({
                type: READ_DESPESAS,
                payload: despesasFromFirebase
            })
        })
        .catch(err => {
            console.error(err);
        })
}
/**
 * Função para prepara a atualização da despesa
 */
export const startUpdatingDespesa = (despesaToUpdate) => dispatch => {
    console.log("despesa para update: " + despesaToUpdate);
    dispatch({
        type: START_DESPESA_UPDATE,
        payload: despesaToUpdate
    })
}
/**
 * Função para atualizar uma despesa
 */
export const updateDespesa = (updatedDespesa) => dispatch => {
    console.log("Atualizando despesa: " + JSON.stringify(updatedDespesa));
    firebaseFirestore.collection("despesas").doc(updatedDespesa.id).update(updatedDespesa)
        .then(() => {
            console.log("Atualizou");
            dispatch({
                type: UPDATE_DESPESA,
            })
        })

    /*
    */
}

/**
 * Função para atualizar uma despesa
 */
export const deleteDespesa = (deletedDespesa) => dispatch => {
    console.log("Deletando despesa: " + JSON.stringify(deletedDespesa));
    firebaseFirestore.collection("despesas").doc(deletedDespesa.id).delete()
        .then(() => {
            console.log("Deletou");
            dispatch({
                type: DELETE_DESPESA,
            })
        })


    /*
    */
}