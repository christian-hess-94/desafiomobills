import React, { Component } from 'react';
//Material-ui
import { Container, Card, CardContent, Typography, Button, CardActions, CardHeader, Avatar, Grid } from '@material-ui/core';

import Edit from '@material-ui/icons/Edit';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { Redirect } from 'react-router-dom'
//Redux config
import { connect } from 'react-redux'
import AppMenu from '../components/AppMenu';
import { readDespesas, startUpdatingDespesa, updateDespesa } from '../redux/actions/DespesaActions';
import { readReceitas, startUpdatingReceita, updateReceita } from '../redux/actions/ReceitaActions';

let despesasList = undefined
let receitasList = undefined
class PanelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
        }

        this.handleClick = this.handleClick.bind(this)
    }
    componentWillMount = () => {
        //Buscando despesas
        console.log(this.props.loggedAccount);

        if (this.props.logged) {
            console.log("Lendo despesas");
            this.props.readDespesas(this.props.loggedAccount)
            console.log("Lendo receitas");
            this.props.readReceitas(this.props.loggedAccount)
        }
    };

    handleClick = (path) => {
        this.setState({
            path
        })
    }

    handleUpdateDespesa = (despesa) => {
        console.log(despesa);
        this.props.startUpdatingDespesa(despesa)
    }

    handleUpdateReceita = (receita) => {
        console.log(receita);
        this.props.startUpdatingReceita(receita)
    }

    render() {
        if (!this.props.logged) {
            console.log("Nenhuma conta logada. Redirecionando para root");
            return <Redirect to={{ pathname: '/' }} />
        }
        console.log(this.props.despesas);
        if (this.state.path !== '') {
            var pathname = this.state.path
            return <Redirect to={{ pathname }} />
        }
        if (this.props.isUpdatingDespesa) {
            return <Redirect to={{ pathname: "/panel/editdespesa/" + this.props.despesaToUpdate.id }} />
        }
        if (this.props.isUpdatingReceita) {
            console.log(this.props.isUpdatingReceita)
            return <Redirect to={{ pathname: "/panel/editreceita/" + this.props.receitaToUpdate.id }} />
        }

        if (this.props.despesas.length === 0) {
            despesasList = (<p>Nenhuma despesa cadastrada</p>)
        } else {
            despesasList = this.props.despesas.map((despesa) => (
                <Grid item key={despesa.descricao + "/" + despesa.valor + "/" + (Math.random())}>
                    <Card className="mb-3" >
                        <CardHeader
                            avatar={
                                <Avatar aria-label="despesa">
                                    <TrendingDown />
                                </Avatar>
                            }
                            title={despesa.descricao}
                            subheader={despesa.data}
                        />

                        <CardContent>
                            <Typography variant="body1" color="textPrimary" component="p">Valor: R${despesa.valor}</Typography>
                            <Typography variant="body1" color="textPrimary" component="p">Pago:{despesa.pago ? <Check color="primary" /> : <Close color="secondary" />}</Typography>

                        </CardContent>

                        <CardActions>
                            <Button color="secondary" variant="outlined" onClick={() => this.handleUpdateDespesa(despesa)}><Edit /> Editar </Button>
                        </CardActions>
                    </Card >
                </Grid>
            ))
        }

        if (this.props.receitas.length === 0) {
            receitasList = (<p>Nenhuma receita cadastrada</p>)
        } else {
            receitasList = this.props.receitas.map((receita) => (
                <Grid item key={receita.descricao + "/" + receita.valor + "/" + (Math.random())}>
                    <Card className="mb-3" >
                        <CardHeader
                            avatar={
                                <Avatar aria-label="receita">
                                    <TrendingUp />
                                </Avatar>
                            }
                            title={receita.descricao}
                            subheader={receita.data}
                        />
                        <CardContent>
                            <Typography variant="body1" color="textPrimary" component="p">Valor: R${receita.valor}</Typography>
                            <Typography variant="body1" color="textPrimary" component="p">Recebido:{receita.recebido ? <Check color="primary" /> : <Close color="secondary" />}</Typography>

                        </CardContent>

                        <CardActions>
                            <Button color="secondary" variant="outlined" onClick={() => this.handleUpdateReceita(receita)}><Edit /> Editar </Button>
                        </CardActions>
                    </Card >
                </Grid>
            ))
        }

        return (
            <div>

                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="stretch"
                    spacing={4}>

                    <Grid item>
                        <AppMenu />
                    </Grid>

                    <Grid item>
                        <Container>

                            <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="stretch"
                                spacing={4}>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justify="space-evenly"
                                    alignItems="stretch">
                                    <Button color="primary" variant="contained" onClick={() => { this.handleClick('/panel/graphs') }}>Ver estatísticas de {this.props.loggedAccount.email}</Button>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="stretch"
                                    spacing={8}>
                                    <Grid item md={6}>
                                        <Card>
                                            <CardContent>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="Receitas">
                                                            <TrendingUp />
                                                        </Avatar>
                                                    }
                                                    title={<Typography variant="h5" component="h2">Receitas</Typography>}
                                                    subheader={<Button size="small" color="primary" variant="contained" onClick={() => { this.handleClick('/panel/createreceita') }}> Adicionar</Button>}
                                                />
                                                <hr />
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="stretch"
                                                    spacing={1}>
                                                    {receitasList}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Card>
                                            <CardContent>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="Despesas">
                                                            <TrendingDown />
                                                        </Avatar>
                                                    }
                                                    title={<Typography variant="h5" component="h2">Despesas</Typography>}
                                                    subheader={<Button size="small" color="secondary" variant="contained" onClick={() => { this.handleClick('/panel/createdespesa') }}> Adicionar</Button>}
                                                />
                                                <hr />
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="stretch"
                                                    spacing={1}>
                                                    {despesasList}
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justify="space-evenly"
                                    alignItems="stretch">
                                    <Button color="primary" variant="contained" onClick={() => { this.handleClick('/panel/graphs') }}>Ver estatísticas de {this.props.loggedAccount.email}</Button>
                                </Grid>
                            </Grid>
                        </Container >
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedAccount: state.authentication.loggedAccount,
    logged: state.authentication.logged,

    despesas: state.despesas.despesas,
    despesaToUpdate: state.despesas.despesaToUpdate,
    isUpdatingDespesa: state.despesas.isUpdatingDespesa,

    receitas: state.receitas.receitas,
    receitaToUpdate: state.receitas.receitaToUpdate,
    isUpdatingReceita: state.receitas.isUpdatingReceita
})
export default connect(mapStateToProps, { readDespesas, updateDespesa, startUpdatingDespesa, readReceitas, updateReceita, startUpdatingReceita })(PanelPage)