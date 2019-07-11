import React, { Component } from 'react';
import AppMenu from '../../components/AppMenu';
import { Container, Card, CardContent, Typography, TextField, Button, CardActions, CardHeader, Avatar, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Grid } from '@material-ui/core';
import TrendingDown from '@material-ui/icons/TrendingDown';

import { createDespesa, resetCreateDespesa } from '../../redux/actions/DespesaActions'
import { Redirect } from 'react-router-dom'
import randomHexColor from 'random-hex-color'
//Redux config
import { connect } from 'react-redux'

class CreateDespesaPage extends Component {

    constructor(props) {
        super(props)
        //State para redirecionar de volta ao painel
        this.state = {
            valor: 0,
            descricao: '',
            pago: false,
            goBack: false
        }
    }

    handleGoBack = () => {
        this.setState({ goBack: true })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()


        const dataSplit = this.state.data.split('-')
        let newData = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`

        const despesaData = {
            valor: this.state.valor,
            descricao: this.state.descricao,
            data: newData,
            uid: this.props.user.uid,
            pago: this.state.pago,
            cor: randomHexColor()
        }

        this.setState({
            valor: 0,
            descricao: '',
            data: '',
            pago: 'false',
        })

        this.props.createDespesa(despesaData)
    }

    render() {
        if (!this.props.logged) {
            console.log("Nenhuma conta logada. Redirecionando para root");
            return <Redirect to={{ pathname: '/' }} />
        }
        if (this.state.goBack) {
            return <Redirect to={{ pathname: '/panel' }} />
        }
        if (this.props.despesaAdded) { //.uid
            console.log("Despesa Criada. Redirecionando para o panel");
            this.props.resetCreateDespesa()
            return <Redirect to={{ pathname: "/panel" }} />
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
                                    <Button variant='outlined' color="default" onClick={this.handleGoBack}>Voltar</Button>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Nova despesa">
                                                <TrendingDown color="secondary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Criar nova despesa</Typography>}
                                    />
                                    <form onSubmit={this.handleSubmit}>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Valor"
                                            style={{ margin: 8 }}
                                            placeholder="Insira o valor da despesa"
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
                                            label="Descrição"
                                            style={{ margin: 8 }}
                                            placeholder="Insira a descrição da despesa"
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
                                            label="Data"
                                            style={{ margin: 8 }}
                                            placeholder="Insira a data da despesa"
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
                                            <Button size="large" color="primary" variant="contained" type='submit'>Criar</Button>
                                        </CardActions>
                                    </form>
                                </CardContent>
                            </Card>
                        </Container>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    despesaAdded: state.despesas.despesaAdded,
    logged: state.authentication.logged,
    user: state.authentication.loggedAccount,
})

export default connect(mapStateToProps, { createDespesa, resetCreateDespesa })(CreateDespesaPage)