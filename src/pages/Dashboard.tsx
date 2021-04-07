import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom'


interface IProps extends RouteComponentProps{

}

interface IState {
    activar:boolean
    periodo:string
   
}


export default class Dashboard extends Component<IProps,IState> {
    constructor(props:IProps){
        super(props)

        const { periodo } = this.props.match.params as any

        this.state = {
            activar:false,
            periodo: periodo
        }

        this.sinfo = this.sinfo.bind(this)
        this.blackboard = this.blackboard.bind(this)
        this.Reportes = this.Reportes.bind(this)
        this.tutoria = this.tutoria.bind(this)
    }

    async tutoria(event: React.MouseEvent<HTMLElement>){
        event.preventDefault()
        if (this.state.activar) return
        
        const url = '/tutoria/' + this.state.periodo

        this.props.history.push(url)
    }

    async sinfo(event: React.MouseEvent<HTMLElement>){
        event.preventDefault()
        if (this.state.activar) return
        
        const url = '/apex/' + this.state.periodo
        this.props.history.push(url)
    }

    blackboard(event: React.MouseEvent<HTMLElement>){
        event.preventDefault()

        if (this.state.activar) return
        
        const url = '/blackboard/' + this.state.periodo
        this.props.history.push(url)
    }

    Reportes(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()
        if (this.state.activar) return
        
        const url = '/Reportes/' + this.state.periodo
        this.props.history.push(url)
    }


    render() {
        return (
            <Fragment>
            <br/>
                <div className="row justify-content-md-center" >
                    <div className="col-md-10">
                        {/* DIRECT CHAT */}
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <span>
                                        {this.state.activar 
                                            ? <i className="fas fa-spinner fa-spin"></i>
                                            : <i className="fas fa-terminal"></i>}
                                    </span> Comandos - Periodo - {this.state.periodo}
                                </h3> 
                            </div>
                            <div className="card-body" style={{margin:"10px 10px "}}>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-3 ">
                                        <div className="info-box link-black" onClick={this.tutoria}>
                                            <span className="info-box-icon bg-primary elevation-1">
                                                <i className={this.state.activar ? "fas fa-cog fa-spin" : "fas fa-cog"}>
                                                </i>
                                            </span>

                                            <div className="info-box-content">
                                                <span className="info-box-text">Matriculados - Consulta</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 ">
                                        <div className="info-box link-black" >
                                            <span className="info-box-icon bg-info elevation-1">
                                                <i className={this.state.activar ? "fas fa-cog fa-spin" : "fas fa-cog"}>
                                                </i>
                                            </span>

                                            <div className="info-box-content" onClick={this.sinfo}>
                                                <span className="info-box-text">Script - Apex</span>
                                                <span className="info-box-number">
                                                    0
                                                    <small> Cursos Registrados</small>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 ">
                                        <div className="info-box link-black" onClick={this.blackboard}>
                                    <span className="info-box-icon bg-danger elevation-1">
                                        <i className={this.state.activar ? "fas fa-cog fa-spin" : "fas fa-cog"}></i></span>

                                            <div className="info-box-content">
                                                <span className="info-box-text">Matriculados - Blackboard</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-3 ">
                                        <div className="info-box link-black" onClick={this.Reportes}>
                                    <span className="info-box-icon bg-purple elevation-1">
                                        <i className={this.state.activar ? "fas fa-cog fa-spin" : "fas fa-cog"}></i></span>
                                            <div className="info-box-content">
                                                <span className="info-box-text"><i className="fad fa-analytics"></i> Reportes</span>
                                                <span className="info-box-number">
                                                    <small> graficas</small>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </Fragment>
        )
    }
}
