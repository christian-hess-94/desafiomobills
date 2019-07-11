import React, { Component } from 'react';
import { Grid, Container, Card, CardContent, Typography, TextField, Button, CardActions, CardHeader, Avatar, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import TrendingDown from '@material-ui/icons/TrendingDown';
import { Redirect } from 'react-router-dom'
//Redux config
import { connect } from 'react-redux'
import { updateDespesa, resetUpdateDespesa, deleteDespesa, resetDeleteDespesa } from '../../redux/actions/DespesaActions';
import AppMenu from '../../components/AppMenu';

class EditDespesaPage extends Component {

    constructor(props) {
        super(props);
        //State para salvar as informações da despesa para passar para o redux
        this.state = {
            before_valor: props.despesaToUpdate.valor,
            before_descricao: props.despesaToUpdate.descricao,
            before_data: props.despesaToUpdate.data,
            before_pago: props.despesaToUpdate.pago,
            valor: 0,
            descricao: '',
            data: '',
            pago: props.despesaToUpdate.pago,
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
        this.props.deleteDespesa(this.props.despesaToUpdate)
    }

    handleUpdateSubmit = e => {
        e.preventDefault()


        console.log("Coletando dados atualizados da despesa");
        let despesaUpdated = {}
        if (this.state.valor === 0) {
            despesaUpdated.valor = this.state.before_valor
        } else {
            despesaUpdated.valor = this.state.valor
        }

        if (this.state.descricao === '') {
            despesaUpdated.descricao = this.state.before_descricao
        } else {
            despesaUpdated.descricao = this.state.descricao
        }

        if (this.state.data === '') {
            despesaUpdated.data = this.state.before_data
        } else {
            const dataSplit = this.state.data.split('-')
            let newData = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
            despesaUpdated.data = newData
        }
        despesaUpdated.pago = this.state.pago
        despesaUpdated.id = this.props.despesaToUpdate.id
        despesaUpdated.uid = this.props.despesaToUpdate.uid
        console.log(JSON.stringify(despesaUpdated))

        this.setState({
            valor: 0,
            descricao: '',
            data: '',
            pago: false,
        })
        this.props.updateDespesa(despesaUpdated)
    }
    render() {

        if (!this.props.logged) {
            console.log("Nenhuma conta logada. Redirecionando para root");
            return <Redirect to={{ pathname: '/' }} />
        }
        if (this.state.goBack) {
            this.props.resetUpdateDespesa()
            this.props.resetDeleteDespesa()
            return <Redirect to={{ pathname: '/panel' }} />
        }
        if (this.props.despesaUpdated) { //.uid
            console.log("Despesa Atualizada. Redirecionando para o panel");
            this.props.resetUpdateDespesa()
            return <Redirect to={{ pathname: "/panel" }} />
        }

        if (this.props.despesaDeleted) { //.uid
            console.log("Despesa deletada. Redirecionando para o panel");
            this.props.resetDeleteDespesa()
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
                                            <Avatar aria-label="Nova despesa">
                                                <TrendingDown color="secondary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Editar despesa</Typography>}
                                    />
                                    <form onSubmit={this.handleUpdateSubmit}>
                                        <TextField
                                            id="outlined-full-width"
                                            label={"Descrição: " + this.state.before_descricao}
                                            style={{ margin: 8 }}
                                            placeholder="Insira a nova descrição da despesa"
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
                                            label={"Valor: R$" + this.state.before_valor}
                                            style={{ margin: 8 }}
                                            placeholder="Insira o novo valor da despesa"
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
                                            label={"Data: " + this.state.before_data}
                                            style={{ margin: 8 }}
                                            placeholder="Insira a nova data da despesa"
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
                                            <InputLabel ref={4} htmlFor="outlined-pago-simple">
                                                Pago?
                                    </InputLabel>
                                            <Select
                                                variant="outlined"
                                                name="pago"
                                                value={this.state.pago}
                                                onChange={this.onChange}
                                                input={<OutlinedInput fullWidth={true} labelWidth={4} name="pago" id="outlined-pago-simple" />}
                                            >
                                                <MenuItem value={false}>Não pago</MenuItem>
                                                <MenuItem value={true}>Pago</MenuItem>
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
    despesas: state.despesas.despesas,
    despesaToUpdate: state.despesas.despesaToUpdate,
    despesaUpdated: state.despesas.despesaUpdated,
    isUpdatingDespesa: state.despesas.isUpdatingDespesa,
    despesaDeleted: state.despesas.despesaDeleted,
})
export default connect(mapStateToProps, { updateDespesa, resetUpdateDespesa, deleteDespesa, resetDeleteDespesa })(EditDespesaPage)



/*
handleUpdateDespesa = () => {

} */