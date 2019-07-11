import React, { Component } from 'react'
import { Container, Card, CardContent, Typography, TextField, Button, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom'
//Redux config
import { logIntoAccount } from '../../redux/actions/AuthenticationActions'
import { connect } from 'react-redux'

let errorCodeWhenLogging = undefined

class ConnectForm extends Component {

    constructor(props) {
        super(props);
        //Estate para salvar o email e senha escrito no form
        this.state = {
            email: '',
            password: '',
            validEmailChecker: undefined,
            validPasswordChecker: undefined
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
            if (this.state.password.length === 0) {
                this.setState({ validPasswordChecker: <Typography variant="caption" color="secondary">Preencha este campo</Typography> })
            } else {
                this.setState({ validEmailChecker: undefined })
                this.setState({ validPasswordChecker: undefined })

                const accountData = {
                    email: this.state.email,
                    password: this.state.password
                }

                this.props.logIntoAccount(accountData)
            }
        } else {
            this.setState({ validEmailChecker: <Typography variant="caption" color="secondary">Preencha este campo</Typography> })
            if (this.state.password.length === 0) {
                this.setState({ validPasswordChecker: <Typography variant="caption" color="secondary">Preencha este campo</Typography> })
            }
        }
    }
    render() {
        if (this.props.errorWhenLogging) {
            switch (this.props.errorCodeWhenLogging) {
                case 'auth/invalid-email':
                    errorCodeWhenLogging = "E-mail incorreto"
                    break;
                case 'auth/wrong-password':
                    errorCodeWhenLogging = "Senha incorreta"
                    break;
                case 'auth/user-not-found':
                    errorCodeWhenLogging = "E-mail não cadastrado"
                    break;
                default:
                    errorCodeWhenLogging = "Erro ao criar conta: " + this.props.errorCodeWhenLogging
                    break;
            }
        } else {
            errorCodeWhenLogging = undefined
        }
        return (
            <Container>
                <Card >
                    <CardContent>
                        <Typography variant="h5" component="h2">Fazer login</Typography>
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
                                helperText={this.state.validPasswordChecker}
                            />
                            <CardActions>
                                <Button color="primary" variant="contained" type='submit'>Conectar</Button>
                                <Typography variant="caption" color="secondary">{errorCodeWhenLogging}</Typography>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
                <Link to='/createaccount'><Typography variant="body1" >Não tem conta? Clique aqui para criar uma</Typography></Link>
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    errorWhenLogging: state.authentication.errorWhenLogging,
    errorCodeWhenLogging: state.authentication.errorCodeWhenLogging,
})
export default connect(mapStateToProps, { logIntoAccount })(ConnectForm)
