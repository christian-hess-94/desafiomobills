import { LOG_INTO_ACCOUNT, CREATE_NEW_ACCOUNT, LOG_OFF_ACCOUNT, ERROR_WHEN_LOGGING, ERROR_WHEN_CREATING_ACCOUNT } from "../actions/types"

const initialState = {
    loggedAccount: {},
    logged: false,
    errorWhenLogging: false,
    errorCodeWhenLogging: '',
    errorWhenCreatingAccount: false,
    errorCodeWhenCreatingAccount: '',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_NEW_ACCOUNT:
            console.log("Reducer vai salvar informações da nova conta criada no estado")
            return {
                ...state,
                loggedAccount: action.payload.user,
                logged: true
            }
        case LOG_INTO_ACCOUNT:
            console.log("Reducer vai salvar informações da conta logada no estado")
            return {
                ...state,
                loggedAccount: action.payload.user,
                logged: true
            }
        case LOG_OFF_ACCOUNT:
            console.log("Reducer vai remover as informações da conta logada")
            return {
                state: undefined,
                loggedAccount: {},
                logged: false
            }
        case ERROR_WHEN_LOGGING:
            console.log("Reducer vai remover as informações da conta logada")
            return {
                errorWhenLogging: true,
                errorCodeWhenLogging: action.payload
            }
        case ERROR_WHEN_CREATING_ACCOUNT:
            console.log("Reducer vai remover as informações da conta logada")
            return {
                errorWhenCreatingAccount: true,
                errorCodeWhenCreatingAccount: action.payload
            }
        default:
            return state
    }
}