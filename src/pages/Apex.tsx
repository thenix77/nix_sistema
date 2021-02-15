import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import ApiJson from '../ApiJson.json'
import TablaCursoEnrolamientoAlumno from '../component/Sinfo/TablaCursoEnrolamientoAlumno'
import '../component/css/app.css'

//import TableZonal from '../component/TableZonal'
import {  idAlumno as idSinfo } from '../lib/source'
import { IVInstEnrolamiento,IVSEnrolamiento } from '../models/enrolamiento'
import { ISupervisores } from '../models/zonal.sinfo'
import TablaCursosCrear from '../component/Sinfo/TablaCursosCrear'
import TablaCursoEnrolamientoCurso from '../component/Sinfo/TablaCursoEnrolamientoCurso'
import TablaInstructorEnrolamiento from '../component/Sinfo/TablaInstructorEnrolamiento'

interface IState{
    activar:boolean
    enrolamiento: IVSEnrolamiento[]
    supervisores:ISupervisores[]
    instenrolamiento: IVInstEnrolamiento[]   
    dato: string
    titulo: string
}

interface IProps{}

export default class Apex extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            activar: false,
            enrolamiento: [],
            supervisores: [],
            instenrolamiento:[],
            dato: '',
            titulo: ''
            
        }

        this.handleConsultaIdAlumno = this.handleConsultaIdAlumno.bind(this)
        this.handleAlumno = this.handleAlumno.bind(this)
        this.handleNrc = this.handleNrc.bind(this)
        this.handleInstructor = this.handleInstructor.bind(this)
        this.handleConsultaInstructor = this.handleConsultaInstructor.bind(this)
    }

    async componentDidMount() {
        await  fetch(`${ApiJson.Api}/sinfo/supervisores`,
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
                        supervisores:data.data
                    })
                })
    }
   
    async handleConsultaIdAlumno(idAlumno:string) {

        this.setState({
            activar:true
        })
        
        await  fetch(`${ApiJson.Api}/sinfo/enrolamiento/idalumno/${idSinfo(idAlumno)}`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'Application/json',
                        'token':localStorage.getItem('token') || ''
                    }
                })
                .then((db)=> db.json())
                .then((data) => {
                     this.setState({
                        enrolamiento: data.data
                    })
                })
                       
        this.setState({
            activar:false
        })
    }

    async handleConsultaNrc(nrc:string) {

        this.setState({
            activar:true
        })
        
        await  fetch(`${ApiJson.Api}/sinfo/enrolamiento/nrc/${nrc}`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'Application/json',
                        'token':localStorage.getItem('token') || ''
                    }
                })
                .then((db)=> db.json())
                .then((data) => {
                     this.setState({
                        enrolamiento: data.data
                    })
                })
                       
        this.setState({
            activar:false
        })
    }

    async handleConsultaInstructor(nrc:string) {
        this.setState({
            activar:true
        })
        
        await  fetch(`${ApiJson.Api}/sinfo/enrolamiento/instructor/${nrc}`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'Application/json',
                        'token':localStorage.getItem('token') || ''
                    }
                })
                .then((db)=> db.json())
                .then((data) => {
                     this.setState({
                        instenrolamiento: data.data
                    })
                })
                       
        this.setState({
            activar:false
        })
    }

    async handleAlumno() {
        
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            enrolamiento:[]
        })


        await this.handleConsultaIdAlumno(this.state.dato.trim())

        if (this.state.enrolamiento.length === 0) {
            this.setState({
                activar: false,
                dato:''
            }) 
            return
        }

        this.setState({
            activar: false,
            titulo: 'Alumno',
            dato:''
        })
    }

    async handleNrc() {
        
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            enrolamiento:[]
        })

        await this.handleConsultaNrc(this.state.dato.trim())

        if (this.state.enrolamiento.length === 0) {
            this.setState({
                activar: false,
                dato:''
            }) 
            return
        }

        this.setState({
            activar: false,
            titulo: 'Nrc',
            dato:''
        })

    }

    async handleInstructor() {
        if (this.state.dato === '') return
        
        this.setState({
            activar: true,
            enrolamiento:[]
        })

        await this.handleConsultaInstructor(this.state.dato.trim())

        if (this.state.instenrolamiento.length === 0) {
            this.setState({
                activar: false,
                dato:''
            }) 
            return
        }

        this.setState({
            activar: false,
            titulo: 'Instructor',
            dato:''
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
                            <h3 className="card-title">Scripts </h3> 
                            <div className="card-tools">
                                Registros:
                                <span   data-toggle="tooltip"
                                    title="3 New Messages"
                                    className="badge badge-warning">
                                    {this.state.activar? <i className="fas fa-yin-yang fa-spin"></i> : this.state.enrolamiento.length}
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
                                <span className="badge bg-primary">{localStorage.getItem('cantidadAplexAlumno')}</span>
                                <i className="fas fa-users"></i> Alumno
                            </button>
                             <button className="btn btn-app" onClick={this.handleNrc}>
                                <span className="badge bg-success">{ localStorage.getItem('cantidadAplexCursos')}</span>
                                <i className="fas fa-barcode"></i> Nrc
                            </button>
                            <button className="btn btn-app" onClick={this.handleInstructor}>
                                <i className="fas fa-chalkboard-teacher"></i> Instructor
                            </button>
                            <Link to="/tutoria" className="btn btn-app">
                                <i className="fas fa-journal-whills"></i> Tutoria
                            </Link>
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
                                    Registros:
                                    <span   data-toggle="tooltip"
                                            title="3 New Messages"
                                            className="badge badge-warning">
                                            {this.state.activar ?
                                                <i className="fas fa-yin-yang fa-spin"></i> :
                                                this.state.enrolamiento.length}
                                    </span>
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
                                </div>
                            </div>
                                <div className="card-body " style={{ margin: "10px" }} > 
                                    <div style={{ width: '100%' }}>
                                        {
                                            this.state.activar ?
                                                <div className='reload' >
                                                    <img src={'/dist/img/reload.gif'}  alt=""/>
                                                </div>
                                            :
                                                ''
                                        }
                                        {/** Enrolamiento Alumno */}
                                        {(this.state.titulo === 'Alumno' && this.state.enrolamiento.length !== 0) ?
                                            <TablaCursoEnrolamientoAlumno enrolamiento={this.state.enrolamiento}  />
                                            :
                                            ''
                                        }
                                        {(this.state.titulo === 'Nrc' && this.state.enrolamiento.length !== 0) ?
                                            <>
                                                <TablaCursosCrear enrolamiento={this.state.enrolamiento} />
                                                <TablaCursoEnrolamientoCurso enrolamiento={this.state.enrolamiento} />
                                            </>
                                            :
                                            ''
                                        }
                                        {(this.state.titulo === 'Instructor' && this.state.instenrolamiento.length !== 0) ?
                                            <>
                                                <TablaInstructorEnrolamiento enrolamiento={this.state.instenrolamiento} />
                                            </>
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
