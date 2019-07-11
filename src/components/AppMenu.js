import React, { Component } from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

//Redux config
import { connect } from 'react-redux'
import { logOffAccount } from '../redux/actions/AuthenticationActions'

class AppMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            seeGraphs: false
        }
    }
    handleLogout = e => {
        console.log("deslogando");
        this.props.logOffAccount()
    }
    render() {
        if (this.state.seeGraphs) {
            return <Redirect to="/panel/graphs" />
        }
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={this.handleLogout}>Sair</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    loggedAccount: state.authentication.loggedAccount,
    logged: state.authentication.logged,
})
export default connect(mapStateToProps, { logOffAccount })(AppMenu)