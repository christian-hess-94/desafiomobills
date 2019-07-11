import { CREATE_DESPESA, READ_DESPESAS, RESET_CREATE_DESPESA, UPDATE_DESPESA, START_DESPESA_UPDATE, RESET_UPDATE_DESPESA, DELETE_DESPESA, RESET_DELETE_DESPESA } from "../actions/types"

const initialState = {
    despesas: [],
    despesaAdded: false,
    isUpdatingDespesa: false,
    despesaToUpdate: {},
    despesaUpdated: false,
    despesaDeleted: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_DESPESA:
            console.log("Reducer reconheceu a nova despesa adicionada")
            return {
                ...state,
                despesaAdded: true
            }

        case RESET_CREATE_DESPESA:
            console.log("Reducer vai resetar o despesaAdded");
            return {
                ...state,
                despesaAdded: false
            }

        case READ_DESPESAS:
            console.log("Reducer vai salvar lista de despesas no estado")
            return {
                ...state,
                despesas: action.payload
            }

        case START_DESPESA_UPDATE:
            console.log("Reducer vai iniciar o update da despesa");
            return {
                ...state,
                isUpdatingDespesa: true,
                despesaUpdated: false,
                despesaToUpdate: action.payload
            }
        case UPDATE_DESPESA:
            console.log("Reducer terminou de dar update na despesa");
            return {
                ...state,
                despesaUpdated: true,
                despesaToUpdate: {}
            }
        case RESET_UPDATE_DESPESA:
            console.log("Reducer vai resetar o update da despesa");
            return {
                ...state,
                isUpdatingDespesa: false,
                despesaUpdated: false
            }
        case DELETE_DESPESA:
            console.log("Reducer reconhecer que a despesa foi deletada");
            return {
                ...state,
                despesaDeleted: true
            }
        case RESET_DELETE_DESPESA:
            console.log("Reducer vai resetar o delete da despesa");
            return {
                ...state,
                isUpdatingDespesa: false,
                despesaDeleted: false
            }
        default:
            return state

    }
}