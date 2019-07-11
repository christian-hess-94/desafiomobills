//Arquivo para combinar todos os reducers em um só
import { combineReducers } from "redux";

//Importação dos reducers
import DespesaReducer from "./DespesaReducer";
import ReceitaReducer from "./ReceitaReducer";
import AuthenticationReducer from "./AuthenticationReducer";

export default combineReducers({
    despesas: DespesaReducer,
    receitas: ReceitaReducer,
    authentication: AuthenticationReducer
})