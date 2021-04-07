import React, { Component, Fragment } from 'react'

import ApiJson from '../ApiJson.json'

import '../component/css/app.css'
import { RouteComponentProps } from 'react-router-dom'
import TablaTutoriaEnrolamiento from '../component/Tutoria/TablaTutoriaEnrolamiento'
import { idAlumno, parseNrc } from '../lib/source'


import TablaTutoriaCurso from '../component/Tutoria/TablaTutoriaCurso'
import {IPublicCurso} from '../models/public/cursos.model'
import { IPublicInstructor } from '../models/public/instructores.model'
import TablaTutorialInstructor from '../component/Tutoria/TablaTutorialInstructor'
import { IPublicAlumno } from '../models/public/alumnos.model'
import TablaTutoriaAlumno from '../component/Tutoria/TablaTutoriaAlumno'

interface IProps extends RouteComponentProps{

}

interface IState{
    activar: boolean
    periodo:string
    dato: string
    titulo: string
    alumnos: IPublicAlumno[]
    cursos: IPublicCurso[]
    instructores: IPublicInstructor[]
}


export default class Tutoria extends Component<IProps,IState> {

    constructor(props: IProps) {
        super(props)

        const { periodo } = this.props.match.params as any

        this.state = {
            activar: false,
            dato:'',
            titulo: 'Tutoria',
            periodo: periodo,
            cursos:[],
            alumnos: [],
            instructores:[]
        }


        this.handleAlumno = this.handleAlumno.bind(this)
        this.handleScript = this.handleScript.bind(this)
        this.handleNrc = this.handleNrc.bind(this)
        this.handleEnrolamiento = this.handleEnrolamiento.bind(this)
        this.handleInstructor = this.handleInstructor.bind(this)
    }

    async hanbleConsultaPublicAlumno(idAlumno: string) {

        await  fetch(`${ApiJson.Utda}/public/alumnos/${this.state.periodo}/alumno/${idAlumno}`,
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
                       alumnos: data.data
                    })
                }) 
    }

    async hanbleConsultaPublicEnrolamiento(nrc:string) {
        await  fetch(`${ApiJson.Utda}/public/alumnos/${this.state.periodo}/nrc/${nrc}`,
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
                       alumnos: data.data
                    })
                })
    }

    async handleConsultaPublicNrc(nrc:string) {
         await  fetch(`${ApiJson.Utda}/public/cursos/${this.state.periodo}/nrc/${nrc}`,
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
                       cursos: data.data
                    })
                })
    }

    async handleConsultaPublicInstructor(nrc:string) {
        await  fetch(`${ApiJson.Utda}/public/instructores/${this.state.periodo}/nrc/${nrc}`,
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
                      instructores: data.data
                   })
               })
   }


    async handleAlumno() {
        
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            alumnos:[],
            titulo:''
        })

        await this.hanbleConsultaPublicAlumno(idAlumno(this.state.dato))
        //await this.hanbleConsultaPublicAlumno(parseIdAlumno(this.state.dato))

        if (this.state.alumnos.length === 0) {
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
            alumnos:[],
            titulo:''
        })

        await this.handleConsultaPublicNrc(parseNrc(this.state.dato))

        
        if (this.state.cursos.length === 0) {
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


    async handleEnrolamiento() {
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            alumnos:[],
            titulo:''
        })

        await this.hanbleConsultaPublicEnrolamiento(parseNrc(this.state.dato))

        
        if (this.state.alumnos.length === 0) {
            this.setState({
                activar: false,
                dato:''
            })

            return
        }

        this.setState({
            titulo: 'Enrolamientos',
            activar: false,
            dato:''
        })

    }

    async handleInstructor() {
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            instructores:[],
            titulo:''
        })

        await this.handleConsultaPublicInstructor(parseNrc(this.state.dato))

        
        if (this.state.instructores.length === 0) {
            this.setState({
                activar: false,
                dato:''
            })

            return
        }

        this.setState({
            titulo: 'Instructores',
            activar: false,
            dato:''
        })

    }

    
    handleScript(event: React.MouseEvent<HTMLElement>) {
       event.preventDefault()

       const url = '/Apex/'+this.state.periodo
       this.props.history.push(url)
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
                                <button className="btn btn-app" onClick={this.handleAlumno}>
                                    <span className="badge bg-primary">
                                        {!this.state.activar && this.state.titulo==='Alumnos' ?   this.state.alumnos.length : '0'}
                                    </span>
                                    <i className="fas fa-users"></i> Alumno
                                </button>
                                <button className="btn btn-app" onClick={this.handleNrc}>
                                    <span className="badge bg-purple">
                                        {!this.state.activar && this.state.titulo==='Nrc' ?   this.state.cursos.length : '0'}
                                    </span>
                                    <i className="fas fa-book"></i> Nrc 
                                </button>
                                <button className="btn btn-app" onClick={this.handleEnrolamiento}>
                                    <span className="badge bg-orange">
                                        {!this.state.activar && this.state.titulo==='Enrolamientos' ?   this.state.alumnos.length : '0'}
                                    </span>
                                    <i className="fas fa-book-user"></i> Enrolamiento
                                </button>
                                <button className="btn btn-app" onClick={this.handleInstructor}>
                                    <span className="badge bg-success">
                                        {!this.state.activar && this.state.titulo==='Instructores' ?   this.state.instructores.length : '0'}
                                    </span>
                                    <i className="far fa-book-reader"></i> Instructores
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
                                            (this.state.alumnos.length > 0 && this.state.titulo === 'Alumnos') ? 
                                                <Fragment>
                                                    <TablaTutoriaAlumno enrolamientos={this.state.alumnos} /> 
                                                </Fragment>
                                            :
                                                ''
                                        }
                                        {
                                            (this.state.cursos.length > 0 && this.state.titulo === 'Nrc') ? 
                                                <Fragment>
                                                    <TablaTutoriaCurso  cursos={this.state.cursos} />
                                                </Fragment>
                                            :
                                                ''
                                        }
                                        {
                                            (this.state.alumnos.length > 0 && this.state.titulo==='Enrolamientos') ? 
                                                <Fragment>
                                                    <TablaTutoriaEnrolamiento  enrolamientos={this.state.alumnos} />
                                                </Fragment>
                                            :
                                                ''
                                        }
                                        {
                                            (this.state.instructores.length > 0 && this.state.titulo==='Instructores') ? 
                                                <Fragment>
                                                    <TablaTutorialInstructor  instructores={this.state.instructores} />
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


