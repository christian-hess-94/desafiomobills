import React, { Component } from 'react';
//Material-ui
import { Container, Card, CardContent, Typography, Button, CardHeader, Avatar, Grid } from '@material-ui/core';
import AppMenu from '../components/AppMenu';

import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Check from '@material-ui/icons/Check';

import { Redirect } from 'react-router-dom'
//Redux config
import { connect } from 'react-redux'
import { readDespesas } from '../redux/actions/DespesaActions';
import { readReceitas } from '../redux/actions/ReceitaActions';
//GraphJS
import { Pie, Bar } from 'react-chartjs-2'

let despesasPendenteList = undefined
let receitasPendenteList = undefined
class GraphsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goBack: false,
            receitaFullValue: 0,
            despesaFullValue: 0,
            receitasPendentes: [],
            despesasPendentes: [],
            balancoChartData: {
                data: {
                    labels: [],
                    datasets: [{
                        labels: [],
                        data: [],
                        backgroundColor: [],
                        borderWidth: 1,
                        hoverBorderWidth: '3',
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Balanço',
                        fontSize: 25
                    },
                    legend: {
                        enabled: true,
                        position: 'bottom',
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    layout: {
                        padding: {
                            left: 250,
                            right: 250,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: {
                        enabled: true
                    }
                }
            },
            receitaChartData: {
                data: {
                    labels: [],
                    datasets: [{
                        labels: [],
                        data: [],
                        backgroundColor: [],
                        borderWidth: 1,
                        hoverBorderWidth: '3',
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Receitas',
                        fontSize: 25
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    layout: {
                        padding: {
                            left: 250,
                            right: 250,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: {
                        enabled: true
                    }
                }
            },

            despesaChartData: {
                data: {
                    labels: [],
                    datasets: [{
                        labels: [],
                        data: [],
                        backgroundColor: [],
                        borderWidth: 1,
                        hoverBorderWidth: '3',
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Despesas',
                        fontSize: 25
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    layout: {
                        padding: {
                            left: 250,
                            right: 250,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: {
                        enabled: true
                    }
                }
            }
        }
    }

    handleGoBack = () => {
        this.setState({ goBack: true })
    }
    componentWillMount = () => {
        //todas as receitas chart
        let receitasLabels = []
        let receitasData = []
        let receitasBackgroundColor = []

        //todas as despesas chart
        let despesasLabels = []
        let despesasData = []
        let despesasBackgroundColor = []

        //Balanço chart
        let despesaFullValue = 0
        let receitaFullValue = 0

        //Pendentes
        let receitasPendentes = []
        let despesasPendentes = []

        this.props.receitas.forEach((receita) => {
            receitasLabels.push(`${receita.descricao} (R$${receita.valor})`)
            receitasData.push(receita.valor)
            receitasBackgroundColor.push(receita.cor)
            receitaFullValue = receitaFullValue + parseInt(receita.valor)
            if (!receita.recebido) {
                receitasPendentes.push(receita)
            }
        })


        this.props.despesas.forEach((despesa) => {
            despesasLabels.push(`${despesa.descricao} (R$${despesa.valor})`)
            despesasData.push(despesa.valor)
            despesasBackgroundColor.push(despesa.cor)
            despesaFullValue = despesaFullValue + parseInt(despesa.valor)
            if (!despesa.pago) {
                despesasPendentes.push(despesa)
            }
        })
        let balancoDatasets = []
        let restante = (receitaFullValue - despesaFullValue);
        balancoDatasets.push({
            label: 'Valores',
            data: [receitaFullValue, despesaFullValue, restante],
            backgroundColor: ['#32cd32', '#8b0000', '#44F'],
            borderWidth: 1,
            hoverBorderWidth: '3',
        })
        console.log(balancoDatasets);

        this.setState({
            despesasPendentes,
            receitasPendentes,
            despesaFullValue,
            receitaFullValue,
            balancoChartData: {
                data: {
                    labels: [`Receitas (R$${receitaFullValue})`, `Despesas (R$${despesaFullValue})`, `Restante (R$${restante})`],
                    datasets: balancoDatasets
                }
            },
            despesaChartData: {
                data: {
                    labels: despesasLabels,
                    datasets: [{
                        labels: despesasLabels,
                        data: despesasData,
                        backgroundColor: despesasBackgroundColor,
                    }]
                }
            },
            receitaChartData: {
                data: {
                    labels: receitasLabels,
                    datasets: [{
                        labels: receitasLabels,
                        data: receitasData,
                        backgroundColor: receitasBackgroundColor,
                    }]
                }
            }
        })
    };

    render() {
        if (!this.props.logged) {
            console.log("Nenhuma conta logada. Redirecionando para root");
            return <Redirect to={{ pathname: '/' }} />
        }

        if (this.state.goBack) {
            return <Redirect to={{ pathname: '/panel' }} />
        }

        if (this.state.despesasPendentes.length === 0) {
            despesasPendenteList = (<Typography component="h5">Nenhuma despesa pendente</Typography>)
        } else {
            despesasPendenteList = this.state.despesasPendentes.map(despesaPendente => {
                return <Typography component="h5">{`(${despesaPendente.data}) ${despesaPendente.descricao}: R$${despesaPendente.valor}`}</Typography>
            })
        }

        if (this.state.receitasPendentes.length === 0) {
            receitasPendenteList = (<Typography component="h5">Nenhuma receita pendente</Typography>)
        } else {
            receitasPendenteList = this.state.receitasPendentes.map(receitaPendente => {
                return <Typography component="h5">{`(${receitaPendente.data}) ${receitaPendente.descricao}: R$${receitaPendente.valor}`}</Typography>
            })
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
                                            <Avatar aria-label="Balanço">
                                                <Check color="primary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Balanço</Typography>}
                                    />
                                    <Bar
                                        data={this.state.balancoChartData.data}
                                        options={this.state.balancoChartData.options}
                                    />
                                </CardContent>
                                <CardContent>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Receitas">
                                                <TrendingUp color="primary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Receitas - R${this.state.receitaFullValue}</Typography>}
                                    />
                                    <Pie
                                        data={this.state.receitaChartData.data}
                                        options={this.state.receitaChartData.options}
                                    />
                                    <Typography variant="h5" component="h4">Receitas pendentes:</Typography>
                                    {receitasPendenteList}
                                </CardContent>
                                <CardContent>

                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Receitas">
                                                <TrendingDown color="secondary" />
                                            </Avatar>
                                        }
                                        title={<Typography variant="h5" component="h2">Despesas - R${this.state.despesaFullValue}</Typography>}
                                    />
                                    <Pie
                                        data={this.state.despesaChartData.data}
                                        options={this.state.despesaChartData.options}
                                    />
                                    <Typography variant="h5" component="h4">Despesas pendentes:</Typography>
                                    {despesasPendenteList}
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
    loggedAccount: state.authentication.loggedAccount,
    logged: state.authentication.logged,

    despesas: state.despesas.despesas,

    receitas: state.receitas.receitas,
})
export default connect(mapStateToProps, { readDespesas, readReceitas, })(GraphsPage)