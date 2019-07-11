import React, { Component } from 'react'
import ConnectForm from '../components/forms/ConnectForm';
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core';
//Redux config
import { connect } from 'react-redux'
class LoginPage extends Component {
    render() {
        //console.log("Logged Account" + JSON.stringify(this.props.loggedAccount))
        if (this.props.logged) { //.uid
            console.log("Account Logged, redirecting to Panel");
            return <Redirect to={{ pathname: "/panel" }} />
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
                    <ConnectForm />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    loggedAccount: state.authentication.loggedAccount,
    logged: state.authentication.logged,
})

export default connect(mapStateToProps, {})(LoginPage)
