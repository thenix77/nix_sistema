import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import ApiJson from '../ApiJson.json'
import RptMatricula from '../component/Reporte/RptMatricula'
import { IRptTutoria } from '../models/reports/tutoria.model'

interface IProps extends RouteComponentProps{

}

interface IState{
    activar: boolean
    select: string
    periodo: string
    RptTutoria:IRptTutoria[]
}

export default class Reportes extends Component<IProps,IState> {
    
    constructor(props: IProps) {
        super(props)

        const { periodo } = this.props.match.params as any

        this.state = {
            activar: false,
            select:'',
            periodo: periodo,
            RptTutoria:[],
        }

        this.handleMatriculados = this.handleMatriculados.bind(this)

    }



    async consultaPublicMatriculados() {
         await  fetch(`${ApiJson.Utda}/report/tutorias/${this.state.periodo}`,
               {
                   method:'GET',
                   headers:{
                       'Content-Type':'Application/json',
                       'token':localStorage.getItem('token') || ''
                   }
               })
               .then((db)=> db.json())
               .then((data)=>{
                   this.setState({
                      RptTutoria: data.data
                   })
               })
    }

    async handleMatriculados() {
        
        //await this.consultaPublicMatriculados()

        this.setState({
            select:'- Tutoria'
        })

    }


    render() {
        return (
            <Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        {/* DIRECT CHAT */}
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <span>
                                        {this.state.activar 
                                            ? <i className="fas fa-spinner fa-spin"></i>
                                            : <i className="fas fa-journal-whills"></i>}
                                    </span> Consulta - Periodo: {this.state.periodo}
                                    </h3> 
                                <div className="card-tools">
                                    {/*Registros:*/}
                                    <span   data-toggle="tooltip"
                                        title="3 New Messages"
                                        className="badge badge-warning">
                                        {/*!this.state.activar? this.state.enrolamientos.length : '0'*/}
                                    </span>
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                        <i className="fas fa-comments" /></button>
                                    {/*<button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                                    </button>*/}
                                </div>
                            </div>
                            <div className="card-body" style={{margin:"10px 0px "}}>
                                <button className="btn btn-app" onClick={this.handleMatriculados}>
                                    <span className="badge bg-primary"></span>
                                    <i className="fas fa-chart-pie"></i> Tutoria
                                </button>
                                <button className="btn btn-app" >
                                    <span className="badge bg-purple"></span>
                                    <i className="fas fa-book"></i> Nrc 
                                </button>
                                <button className="btn btn-app" >
                                    <span className="badge bg-orange"></span>
                                    <i className="fas fa-book-user"></i> Enrolamiento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card direct-chat direct-chat-warning">
                                <div className="card-header">
                                    <h3 className="card-title">Resultado { this.state.select}</h3>
                                </div>
                            </div>
                            <div className="card-body " style={{ margin: "10px" }} > 
                                <div style={{ width: '90%', margin: 'auto' }}>
                                    {
                                        this.state.activar ?
                                            <div className='reload' >
                                                <img src={'/dist/img/reload.gif'}  alt=""/>
                                            </div>
                                        :
                                            ''
                                    }
                                    {
                                            (this.state.select === '- Tutoria') ? 
                                                <Fragment>
                                                    <RptMatricula  periodo={this.state.periodo} />
                                                </Fragment>
                                            :
                                                ''
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
