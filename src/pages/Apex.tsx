import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import ApiJson from '../ApiJson.json'
import TablaAlumnos from '../component/TablaAlumnos'
import TablaClonar from '../component/TablaClonar'
import TablaCursos from '../component/TablaCursos'
import TablaInstructor from '../component/TablaInstructor'
import TablaListaCruzada from '../component/TablaListaCruzada'
import TableZonal from '../component/TableZonal'
//import TableZonal from '../component/TableZonal'
import { AlumnoCurso, Cursos ,CursosInstructor, removeDuplicatesListaCruzada} from '../lib/source'
import { IVLstCruzada } from '../models/listacruzada.sinfo'
import { IVMatricula } from '../models/matricula.sinfo'
import { ITutoria} from '../models/tutoria.sinfo'
import { IZonal } from '../models/zonal.sinfo'

interface IState{
    activar:boolean
    matricula: IVMatricula[]
    tutoria: ITutoria[]
    zonal: IZonal[]
    listacruzada:IVLstCruzada[]
    dato: string
    cantidad: number
    select: string
    titulo:string
}

interface IProps{}

export default class Apex extends Component<IProps, IState> {

    private newMatricula: IVMatricula[]  = []
    private newInstructor: IVMatricula[] = []
    private listaCruzada: IVLstCruzada[] = []
 
    constructor(props: IProps) {
        super(props)

        this.state = {
            activar: false,
            matricula: [],
            tutoria: [],
            zonal: [],
            listacruzada:[],
            dato: '',
            cantidad: 0,
            select: '',
            titulo: ''
            
        }

        this.handleAlumno = this.handleAlumno.bind(this)
        this.handleCurso = this.handleCurso.bind(this)
    }
   
    async componentDidMount() {

        this.setState({
            activar:true
        })

        await  fetch(`${ApiJson.Api}/sinfo/matricula`,
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
                        matricula: data.data
                    })
                })
        
        await  fetch(`${ApiJson.Api}/sinfo/tutoria`,
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
                        tutoria: data.data
                    })
             })
        
        await  fetch(`${ApiJson.Api}/sinfo/zonal`,
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
                        zonal: data.data
                    })
             })
        
        await  fetch(`${ApiJson.Api}/sinfo/listacruzada`,
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
                        listacruzada: data.data
                    })
                })
        
        this.setState({
            activar:false
        })
    }

    handleAlumno(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            cantidad: 0,
            titulo: '',
            dato:''
        })

        this.newMatricula  = []

        if (this.state.activar) return 

        if (this.state.dato === '') return
        
        this.newMatricula = AlumnoCurso(this.state.matricula, this.state.dato)

        const idalumno =    this.newMatricula.length !== 0 ? 
                            this.newMatricula[0].id_alumno :
                            ''

        const alumnoNombre = this.newMatricula.length !== 0 ?   
                              ' - ' + this.state.tutoria.filter(tutor => tutor.id_alumno.includes(this.newMatricula[0].id_alumno))[0].nombre :
                                ''
        
        this.setState({
            select:'alumno',
            cantidad: this.newMatricula.length,
            titulo: ' - '+ idalumno + alumnoNombre,
        })
       
    }

    handleCurso(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            cantidad:0,
            dato: '',
            titulo:''
        })
        
        this.newMatricula = []
        this.newInstructor = []
        this.listaCruzada = []

        if (this.state.activar) return 

        if (this.state.dato === '') return

        this.newMatricula = Cursos(this.state.matricula, this.state.dato)

        if (this.newMatricula.length === 0) return

        this.newInstructor = CursosInstructor(this.newMatricula)

        var cursoid = (this.newMatricula.length > 0) ? this.newMatricula[0].cursoid + ' - ' : ''
        cursoid  += (this.newMatricula.length > 0) ? this.newMatricula[0].curso  : ''
        
        this.listaCruzada = this.state.listacruzada.filter(lc => lc.cursoid.includes(this.newMatricula[0].cursoid))

        this.listaCruzada = (this.listaCruzada.length > 0) ?
                            this.state.listacruzada.filter(lc => lc.lc_curso.includes(this.listaCruzada[0].lc_curso)) :
                            []
       
        this.listaCruzada = this.listaCruzada.length > 0? removeDuplicatesListaCruzada(this.listaCruzada):[]
       
        this.setState({
            select:'curso',
            cantidad: this.newMatricula.length,
            titulo: ' - ' +cursoid,
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
                            <h3 className="card-title">Apex </h3> 
                            <div className="card-tools">
                                Registros:
                                <span   data-toggle="tooltip"
                                    title="3 New Messages"
                                    className="badge badge-warning">
                                    {this.state.activar? <i className="fas fa-yin-yang fa-spin"></i> :this.state.matricula?.length}
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
                             <button className="btn btn-app" onClick={this.handleCurso}>
                                <span className="badge bg-success">{ localStorage.getItem('cantidadAplexCursos')}</span>
                                <i className="fas fa-barcode"></i> Cursos 
                            </button>
                            <Link to="#" className="btn btn-app">
                                <i className="fas fa-chalkboard-teacher"></i> Instructor
                            </Link>
                            <Link to="#" className="btn btn-app">
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
                                                this.state.cantidad}
                                    </span>
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
                                </div>
                            </div>
                                <div className="card-body " style={{ margin: "10px" }} > 
                                    <div style={{width:'100%'}}>
                                        {   (this.state.select === 'alumno')?
                                            <TablaCursos cursos={this.newMatricula} />  :
                                            <></>
                                        }
                                        {   /********* Instructores ************/
                                            (this.state.select === 'curso' && this.newMatricula.length >0) ?
                                                <>
                                                    {
                                                        this.listaCruzada.length > 0 ?
                                                            <TablaListaCruzada listaCruzada={this.listaCruzada} /> :
                                                            <></>
                                                    }
                                                    <TablaClonar curso={this.newMatricula[0]} />
                                                    <TablaInstructor cursos={this.newInstructor} /> 
                                                    <TableZonal zonal={this.state.zonal} curso={this.newMatricula[0]} />
                                                    <TablaAlumnos cursos={this.newMatricula} tutoria={this.state.tutoria} /> 
                                                    
                                                </>
                                                :
                                            <></>
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
