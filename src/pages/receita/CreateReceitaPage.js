import React, { Component } from 'react';
import AppMenu from '../../components/AppMenu';
import { Grid, Container, Card, CardContent, Typography, TextField, Button, CardActions, CardHeader, Avatar, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import TrendingUp from '@material-ui/icons/TrendingUp';

import { createReceita, resetCreateReceita } from '../../redux/actions/ReceitaActions'
import { Redirect } from 'react-router-dom'
import randomHexColor from 'random-hex-color'
//Redux config
import { connect } from 'react-redux'

class CreateReceitaPage extends Component {

    constructor(props) {
        super(props)
        //State para redirecionar de volta ao painel
        this.state = {
            valor: 0,
            descricao: '',
            recebido: false,
            goBack: false,
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

        const receitaData = {
            valor: this.state.valor,
            descricao: this.state.descricao,
            data: newData,
            uid: this.props.user.uid,
            recebido: this.state.recebido,
            cor: randomHexColor()
        }

        this.setState({
            valor: 0,
            descricao: '',
            data: '',
            recebido: 'false',
        })

        this.props.createReceita(receitaData)
    }

    render() {
        if (!this.props.logged) {
            console.log("Nenhuma conta logada. Redirecionando para root");
            return <Redirect to={{ pathname: '/' }} />
        }
        if (this.state.goBack) {
            return <Redirect to={{ pathname: '/panel' }} />
        }
        if (this.props.receitaAdded) { //.uid
            console.log("Receita Criada. Redirecionando para o panel");
            this.props.resetCreateReceita()
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
                                            <Avatar aria-label="Nova receita">
                                                <TrendingUp color="primary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Criar nova receita</Typography>}
                                    />
                                    <form onSubmit={this.handleSubmit}>
                                        <TextField
                                            id="outlined-full-width"
                                            label="Valor"
                                            style={{ margin: 8 }}
                                            placeholder="Insira o valor da receita"
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
                                            placeholder="Insira a descrição da receita"
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
                                            placeholder="Insira a data da receita"
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
                                            <InputLabel htmlFor="outlined-recebido-simple">
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
    receitaAdded: state.receitas.receitaAdded,
    logged: state.authentication.logged,
    user: state.authentication.loggedAccount,
})

export default connect(mapStateToProps, { createReceita, resetCreateReceita })(CreateReceitaPage)