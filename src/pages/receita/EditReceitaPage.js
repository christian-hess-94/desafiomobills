import React, { Component } from 'react';
import { Grid, Container, Card, CardContent, Typography, TextField, Button, CardActions, CardHeader, Avatar, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import TrendingUp from '@material-ui/icons/TrendingUp';
import { Redirect } from 'react-router-dom'
//Redux config
import { connect } from 'react-redux'
import { updateReceita, resetUpdateReceita, deleteReceita, resetDeleteReceita } from '../../redux/actions/ReceitaActions';
import AppMenu from '../../components/AppMenu';

class EditReceitaPage extends Component {

    constructor(props) {
        super(props);
        //State para salvar as informações da receita para passar para o redux
        this.state = {
            before_valor: props.receitaToUpdate.valor,
            before_descricao: props.receitaToUpdate.descricao,
            before_data: props.receitaToUpdate.data,
            before_recebido: props.receitaToUpdate.recebido,
            valor: 0,
            descricao: '',
            data: '',
            recebido: props.receitaToUpdate.recebido,
            showModal: false,
            goBack: false
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleGoBack = () => {
        this.setState({ goBack: true })
    }

    handleShowModal = showModal => {
        this.setState({ showModal })
    }

    handleDeleteSubmit = e => {
        e.preventDefault()
        this.props.deleteReceita(this.props.receitaToUpdate)
    }

    handleUpdateSubmit = e => {
        e.preventDefault()


        console.log("Coletando dados atualizados da receita");
        let receitaUpdated = {}
        if (this.state.valor === 0) {
            receitaUpdated.valor = this.state.before_valor
        } else {
            receitaUpdated.valor = this.state.valor
        }

        if (this.state.descricao === '') {
            receitaUpdated.descricao = this.state.before_descricao
        } else {
            receitaUpdated.descricao = this.state.descricao
        }

        if (this.state.data === '') {
            receitaUpdated.data = this.state.before_data
        } else {
            const dataSplit = this.state.data.split('-')
            let newData = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
            receitaUpdated.data = newData
        }
        receitaUpdated.recebido = this.state.recebido
        receitaUpdated.id = this.props.receitaToUpdate.id
        receitaUpdated.uid = this.props.receitaToUpdate.uid
        console.log(JSON.stringify(receitaUpdated))

        this.setState({
            valor: 0,
            descricao: '',
            data: '',
            recebido: false,
        })
        this.props.updateReceita(receitaUpdated)
    }
    render() {

        if (!this.props.logged) {
            console.log("Nenhuma conta logada. Redirecionando para root");
            return <Redirect to={{ pathname: '/' }} />
        }
        if (this.state.goBack) {
            this.props.resetUpdateReceita()
            this.props.resetDeleteReceita()
            return <Redirect to={{ pathname: '/panel' }} />
        }
        if (this.props.receitaUpdated) { //.uid
            console.log("Receita Atualizada. Redirecionando para o panel");
            this.props.resetUpdateReceita()
            return <Redirect to={{ pathname: "/panel" }} />
        }

        if (this.props.receitaDeleted) { //.uid
            console.log("Receita deletada. Redirecionando para o panel");
            this.props.resetDeleteReceita()
            return <Redirect to="/panel" />
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
                            <Card>
                                <CardContent>

                                    <Button variant='outlined' color='default' onClick={this.handleGoBack}>Voltar</Button>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Nova receita">
                                                <TrendingUp color="primary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Editar receita</Typography>}
                                    />
                                    <form onSubmit={this.handleUpdateSubmit}>
                                        <TextField
                                            id="outlined-full-width"
                                            label={"Valor: R$" + this.state.before_valor}
                                            style={{ margin: 8 }}
                                            placeholder="Insira o novo valor da receita"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            name="valor"
                                            type="number"
                                            onChange={this.onChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-full-width"
                                            label={"Descrição: " + this.state.before_descricao}
                                            style={{ margin: 8 }}
                                            placeholder="Insira a nova descrição da receita"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            type="text"
                                            name="descricao"
                                            onChange={this.onChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="outlined-full-width"
                                            label={"Data: " + this.state.before_data}
                                            style={{ margin: 8 }}
                                            placeholder="Insira a nova data da receita"
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"
                                            type="date"
                                            name="data"
                                            onChange={this.onChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <FormControl variant="outlined">
                                            <InputLabel tmlFor="outlined-recebido-simple">
                                                Recebido?
                                    </InputLabel>
                                            <Select
                                                variant="outlined"
                                                name="recebido"
                                                value={this.state.recebido}
                                                onChange={this.onChange}
                                                input={<OutlinedInput fullWidth={true} labelWidth={4} name="recebido" id="outlined-recebido-simple" />}
                                            >
                                                <MenuItem value={false}>Não recebido</MenuItem>
                                                <MenuItem value={true}>Recebido</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <CardActions>
                                            <Button size="large" color="primary" variant="contained" type='submit'>Atualizar</Button>
                                            <Button size="medium" color="secondary" variant="outlined" onClick={this.handleDeleteSubmit}>Excluir</Button>
                                        </CardActions>
                                    </form>
                                </CardContent>
                            </Card>
                        </Container>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    loggedAccount: state.authentication.loggedAccount,
    logged: state.authentication.logged,
    receitas: state.receitas.receitas,
    receitaToUpdate: state.receitas.receitaToUpdate,
    receitaUpdated: state.receitas.receitaUpdated,
    isUpdatingReceita: state.receitas.isUpdatingReceita,
    receitaDeleted: state.receitas.receitaDeleted,
})
export default connect(mapStateToProps, { updateReceita, resetUpdateReceita, deleteReceita, resetDeleteReceita })(EditReceitaPage)



/*
handleUpdateReceita = () => {

} */