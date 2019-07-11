import { CREATE_RECEITA, READ_RECEITAS, RESET_CREATE_RECEITA, UPDATE_RECEITA, START_RECEITA_UPDATE, RESET_UPDATE_RECEITA, DELETE_RECEITA, RESET_DELETE_RECEITA } from "../actions/types"

const initialState = {
    receitas: [],
    receitaAdded: false,
    isUpdatingReceita: false,
    receitaToUpdate: {},
    receitaUpdated: false,
    receitaDeleted: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_RECEITA:
            console.log("Reducer reconheceu a nova receita adicionada")
            return {
                ...state,
                receitaAdded: true
            }

        case RESET_CREATE_RECEITA:
            console.log("Reducer vai resetar o receitaAdded");
            return {
                ...state,
                receitaAdded: false
            }

        case READ_RECEITAS:
            console.log("Reducer vai salvar lista de receitas no estado")
            return {
                ...state,
                receitas: action.payload
            }

        case START_RECEITA_UPDATE:
            console.log("Reducer vai iniciar o update da receita:");
            console.log(action.payload)
            return {
                ...state,
                isUpdatingReceita: true,
                receitaUpdated: false,
                receitaToUpdate: action.payload
            }
        case UPDATE_RECEITA:
            console.log("Reducer terminou de dar update na receita");
            return {
                ...state,
                receitaUpdated: true,
                receitaToUpdate: {}
            }
        case RESET_UPDATE_RECEITA:
            console.log("Reducer vai resetar o update da receita");
            return {
                ...state,
                isUpdatingReceita: false,
                receitaUpdated: false
            }
        case DELETE_RECEITA:
            console.log("Reducer reconhecer que a receita foi deletada");
            return {
                ...state,
                receitaDeleted: true
            }
        case RESET_DELETE_RECEITA:
            console.log("Reducer vai resetar o delete da receita");
            return {
                ...state,
                isUpdatingReceita: false,
                receitaDeleted: false
            }
        default:
            return state

    }
}