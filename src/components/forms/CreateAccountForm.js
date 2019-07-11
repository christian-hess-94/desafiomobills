import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
//Material-ui
import { Container, Card, CardContent, Typography, TextField, Button, CardActions } from '@material-ui/core';
//Redux config
import { connect } from 'react-redux'
import { createNewAccount } from '../../redux/actions/AuthenticationActions'

let errorCodeWhenCreatingAccount = undefined
let validPasswordChecker = <Typography variant="caption" color="secondary">Mínimo de 8 caracteres</Typography>
class CreateAccountForm extends Component {

    constructor(props) {
        super(props);
        //Estate para salvar o email e senha escrito no form
        this.state = {
            email: '',
            password: '',
            goBack: false,
            validEmailChecker: undefined
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        if (this.state.email.length > 0) {

            this.setState({ validEmailChecker: undefined })
            const accountData = {
                email: this.state.email,
                password: this.state.password
            }
            console.log(accountData);

            this.props.createNewAccount(accountData)
        } else {
            this.setState({ validEmailChecker: <Typography variant="caption" color="secondary">Preencha este campo</Typography> })
        }
    }

    handleGoBack = e => {
        this.setState({ goBack: true })
    }
    render() {
        if (this.state.goBack) {
            return <Redirect to="/" />
        }
        if (this.props.errorWhenCreatingAccount) {
            switch (this.props.errorCodeWhenCreatingAccount) {
                case 'auth/invalid-email':
                    errorCodeWhenCreatingAccount = "E-mail incorreto"
                    break;
                case 'auth/weak-password':
                    errorCodeWhenCreatingAccount = "Senha muito curta"
                    break;
                case 'auth/email-already-in-use':
                    errorCodeWhenCreatingAccount = "E-mail já cadastrado"
                    break;
                default:
                    errorCodeWhenCreatingAccount = "Erro ao criar conta " + this.props.errorCodeWhenCreatingAccount
                    break;
            }
        } else {
            errorCodeWhenCreatingAccount = undefined
        }
        if (this.state.password.length >= 8) {
            validPasswordChecker = <Typography variant="caption" color="primary">Mínimo de 8 caracteres</Typography>
        } else {
            validPasswordChecker = <Typography variant="caption" color="secondary">Mínimo de 8 caracteres</Typography>
        }
        return (
            <Container >
                <Card >
                    <CardContent>
                        <Button variant='outlined' color='default' onClick={this.handleGoBack}>Voltar</Button>
                        <Typography variant="h5" component="h2">Criar conta</Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                id="outlined-full-width"
                                label="E-mail"
                                style={{ margin: 8 }}
                                placeholder="Insira seu e-mail"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                name="email"
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={this.state.validEmailChecker}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Senha"
                                style={{ margin: 8 }}
                                placeholder="Insira sua senha"
                                fullWidth
                                type="password"
                                margin="normal"
                                variant="outlined"
                                name="password"
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={validPasswordChecker}
                            />
                            <CardActions>
                                <Button color="primary" variant="contained" type='submit'>Criar e conectar</Button>
                                <Typography variant="caption" color="secondary">{errorCodeWhenCreatingAccount}</Typography>
                            </CardActions>
                        </form>

                    </CardContent>
                </Card>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    errorWhenCreatingAccount: state.authentication.errorWhenCreatingAccount,
    errorCodeWhenCreatingAccount: state.authentication.errorCodeWhenCreatingAccount,
})

export default connect(mapStateToProps, { createNewAccount })(CreateAccountForm)
