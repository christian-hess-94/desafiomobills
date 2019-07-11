import { CREATE_NEW_ACCOUNT, LOG_INTO_ACCOUNT, LOG_OFF_ACCOUNT, ERROR_WHEN_LOGGING, ERROR_WHEN_CREATING_ACCOUNT } from "./types";
import { firebaseAuth } from './../../firebase/FirebaseEnv'

export const createNewAccount = (accountData) => dispatch => {
    console.log("Creating New Account")
    //TODO: Código para criar nova conta
    firebaseAuth.createUserWithEmailAndPassword(accountData.email, accountData.password)
        .then((account) => {
            console.log("The account was created: " + JSON.stringify(account));
            dispatch({
                type: CREATE_NEW_ACCOUNT,
                payload: account
            })
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: ERROR_WHEN_CREATING_ACCOUNT,
                payload: err.code
            })
        })
}

export const logIntoAccount = (accountData) => dispatch => {
    console.log("Logging into account")
    firebaseAuth.signInWithEmailAndPassword(accountData.email, accountData.password)
        .then(account => {
            console.log(account);
            dispatch({
                type: LOG_INTO_ACCOUNT,
                payload: account
            })
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: ERROR_WHEN_LOGGING,
                payload: err.code
            })
        })
}


export const logOffAccount = () => dispatch => {
    console.log("Logging into account")
    //TODO: Código para logar na conta
    dispatch({
        type: LOG_OFF_ACCOUNT,
    })
}