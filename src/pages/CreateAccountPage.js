import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import CreateAccountForm from '../components/forms/CreateAccountForm';
import { Redirect } from 'react-router-dom'
//Redux config
import { connect } from 'react-redux'
class CreateAccountPage extends Component {

    render() {
        if (this.props.logged) {
            console.log("Conta criada e conectada. Redirecionando para o panel");
            return <Redirect to="/panel" />
        }
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item />
                <Grid item>
                    <CreateAccountForm />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    loggedAccount: state.authentication.loggedAccount,
    logged: state.authentication.logged,
})

export default connect(mapStateToProps, {})(CreateAccountPage)
