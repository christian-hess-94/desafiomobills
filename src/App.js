import React from 'react';
import './App.css';
//Redux Config
import { Provider } from 'react-redux'
import store from './store';

import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

//Pages
import LoginPage from './pages/LoginPage';
import PanelPage from './pages/PanelPage';
//DESPESA PAGES
import CreateDespesaPage from './pages/despesa/CreateDespesaPage';
import EditDespesaPage from './pages/despesa/EditDespesaPage';
//RECEITA PAGES
import CreateReceitaPage from './pages/receita/CreateReceitaPage';
import EditReceitaPage from './pages/receita/EditReceitaPage';
import GraphsPage from './pages/GraphsPage';
import CreateAccountPage from './pages/CreateAccountPage';


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/createaccount" component={CreateAccountPage} />
                    <Route exact path="/panel" component={PanelPage} />
                    <Route exact path="/panel/createdespesa" component={CreateDespesaPage} />
                    <Route exact path="/panel/editdespesa/:id" component={EditDespesaPage} />
                    <Route exact path="/panel/createreceita" component={CreateReceitaPage} />
                    <Route exact path="/panel/editreceita/:id" component={EditReceitaPage} />
                    <Route exact path="/panel/graphs" component={GraphsPage} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
