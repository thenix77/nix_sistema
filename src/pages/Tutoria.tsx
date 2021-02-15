import React, { Component, Fragment } from 'react'

import ApiJson from '../ApiJson.json'
import {  IVSEnrolamiento } from '../models/enrolamiento'
import { idAlumno as idSinfo } from '../lib/source'
import TablaTutoriaEnrolamientoAlumno from '../component/Sinfo/TablaTutoriaEnrolamientoAlumno'

import '../component/css/app.css'
import { RouteComponentProps } from 'react-router-dom'
import TablaTutoriaEnrolamiento from '../component/Sinfo/TablaTutoriaEnrolamiento'

interface IProps extends RouteComponentProps{

}

interface IState{
    activar: boolean
    dato: string
    titulo: string
    enrolamiento: IVSEnrolamiento[]
}


export default class Tutoria extends Component<IProps,IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            activar: false,
            dato:'',
            titulo: 'Tutoria',
            enrolamiento: [],
            
        }


        this.handleAlumno = this.handleAlumno.bind(this)
        this.handleScript = this.handleScript.bind(this)
        this.handleNrc = this.handleNrc.bind(this)
        
    }

    async hanbleConsultaSinfoEnrolamiento(idAlumno:string) {
         await  fetch(`${ApiJson.Api}/sinfo/enrolamiento/idalumno/${idAlumno}`,
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
                       enrolamiento: data.data
                    })
                })
    }

    async handleConsultaSinfoNrc(nrc:string) {
         await  fetch(`${ApiJson.Api}/sinfo/enrolamiento/nrc/${nrc}`,
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
                       enrolamiento: data.data
                    })
                })
    }


    async handleAlumno() {
        
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            enrolamiento:[]
        })

        await this.hanbleConsultaSinfoEnrolamiento(idSinfo(this.state.dato.trim()))
       
        if (this.state.enrolamiento.length === 0) {
            this.setState({
                activar: false,
                dato:''
            })
            return
        }

        this.setState({
            titulo: 'Alumnos',
            activar: false,
            dato:''
        })
    }

    async handleNrc() {
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            enrolamiento:[]
        })

        await this.handleConsultaSinfoNrc(this.state.dato.trim())
        
        if (this.state.enrolamiento.length === 0) {
            this.setState({
                activar: false,
                dato:''
            })

            return
        }

        this.setState({
            titulo: 'Nrc',
            activar: false,
            dato:''
        })
    }

    
    handleScript(event: React.MouseEvent<HTMLElement>) {
       event.preventDefault()

        this.props.history.push('/Apex')
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
                                    </span> Tutoria
                                    </h3> 
                                <div className="card-tools">
                                    Registros:
                                    <span   data-toggle="tooltip"
                                        title="3 New Messages"
                                        className="badge badge-warning">
                                        {!this.state.activar? this.state.enrolamiento.length : '0'}
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
                                <button className="btn btn-app" onClick={this.handleAlumno}>
                                    <span className="badge bg-primary">
                                        {!this.state.activar && this.state.titulo==='Alumnos' ?   this.state.enrolamiento.length : '0'}
                                    </span>
                                    <i className="fas fa-users"></i> Alumno
                                </button>
                                <button className="btn btn-app" onClick={this.handleNrc}>
                                    <span className="badge bg-purple">
                                        {!this.state.activar && this.state.titulo==='Nrc' ?   this.state.enrolamiento.length : '0'}
                                    </span>
                                    <i className="fas fa-book"></i> Nrc 
                                </button>
                                <button className="btn btn-app" onClick={this.handleScript}>
                                    <i className="fas fa-barcode"></i> Script 
                                </button>
                            </div>
                            <div className="card-footer">
                                <div className="input-group">
                                    <input  type="text"
                                            name="dato"
                                            placeholder="Ingrese el valor a buscar"
                                            className="form-control form-control-sm"
                                            value={this.state.dato}
                                            disabled={this.state.activar}
                                            onChange={
                                                    ({target}:React.ChangeEvent<HTMLInputElement>)=>{
                                                    this.setState({
                                                        dato:target.value
                                                })
                                            }}
                                    />
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                <div className="col-md-10">
                    <div className="card direct-chat direct-chat-warning">
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                    <h3 className="card-title">Resultado { this.state.titulo}</h3>
                                <div className="card-tools">
                                    Registros
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
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
                                            (this.state.enrolamiento.length > 0 && this.state.titulo === 'Alumnos') ? 
                                                <Fragment>
                                                    <TablaTutoriaEnrolamiento  alumnos={this.state.enrolamiento} /> 
                                                </Fragment>
                                            :
                                                ''
                                        }
                                        {
                                            (this.state.enrolamiento.length > 0 && this.state.titulo === 'Nrc') ? 
                                                <Fragment>
                                                    <TablaTutoriaEnrolamientoAlumno  alumnos={this.state.enrolamiento} />
                                                </Fragment>
                                            :
                                                ''
                                        }
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


