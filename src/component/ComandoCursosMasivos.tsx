import React, { Component, Fragment } from 'react'
import ApiJson from '../ApiJson.json'
import { AnalizarBBMat, AnalizarBBInst, AnalizarNrc } from '../lib/analisisListaCruzada'
import { IEnrolamiento } from '../models/enrolamiento'
import { IVMatricula } from '../models/matricula.sinfo'
import { ITerm } from '../models/term.bb'
import TablaComandoAlumno from './TablaComandoAlumno'
import TablaInstructor from './TablaInstructor'

interface IProps { }

interface IState {
    active: boolean
    periodos: ITerm[]
    matriculas: IVMatricula[]
    periodo: string
    nrcs: string,
    options: string,
    enrolamiento: IEnrolamiento[]
}

export default class ComandoCursosMasivos extends Component<IProps, IState> {

    private findNrcs: IVMatricula[] = []
    private BBMatriculados: IEnrolamiento[] = []
    private BBMatVerificados: IVMatricula[] = []
    
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            active: false,
            periodos: [],
            matriculas:[],
            periodo: '',
            nrcs: '',
            options: '',
            enrolamiento:[]
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSelectPeriodo = this.handleSelectPeriodo.bind(this)
    }

    async componentDidMount() {
        this.setState({ active: true})
        await this.Data()

        this.setState({ active: false})
    }

    async Data() {
        await  fetch(`${ApiJson.Api}/BB/Term`,
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
                        periodos: data.data
                    })
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
                        matriculas: data.data
                    })
                })
    

    await fetch(`${ApiJson.Api}/BB/Enrolamiento`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'token': localStorage.getItem('token') || ''
                },
            })
            .then((db) => db.json())
            .then((data) => {
                this.setState({
                    enrolamiento: data.data
                })
            })

    }

    async handleSelectPeriodo({ target }: React.ChangeEvent<HTMLSelectElement>)  {
                                                        
        this.setState({ active: true, periodo:target.value })

        if (target.value === '') {
            this.BBMatriculados = []
            return
        }

        this.BBMatriculados = this.state.enrolamiento.filter(enr => enr.sourcedid_id === target.value)

        this.setState({ active: false })                                            
    }


    async handleClick(event: React.MouseEvent<HTMLElement>,option:string) {

        event.preventDefault()

        this.findNrcs = []
        this.BBMatVerificados = []

        if (this.state.nrcs.length === 0) return
        if(this.state.periodo === '') return

        this.setState({ active: true })
      
        switch (option) {
            case 'estudiantes':
                this.setState({ options: 'estudiantes' })
                this.findNrcs = this.Analizar()
                this.BBMatVerificados = AnalizarBBMat(this.BBMatriculados.filter(mat => mat.role === 'S'), this.Analizar())
                break
            case 'instructores':
                this.setState({ options: 'instructores' })
                this.findNrcs = this.Analizar()
                this.BBMatVerificados = AnalizarBBInst(this.BBMatriculados.filter(mat => mat.role === 'BB_FACILITATOR')
                                                                          .filter(mat => mat.habilitado === 'Y')
                                                        , this.Analizar())
                break
        }
        

        this.setState({ active:false })
    }


    Analizar() {
        let NRCS = this.state.nrcs.split(',')
        return AnalizarNrc(this.state.matriculas, NRCS)
    }

  
    render() {

        const periodoSelect = this.state.periodos.map(periodo => {
            return (
                <option value={periodo.sourcedid_id} key={periodo.sourcedid_id}>{periodo.name}</option>
            )
        })

        return (
            <Fragment>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className='row'>
                                <div className="col-sm-12 ">
                                    <label htmlFor="exampleInputFile">
                                    {
                                        (this.state.active) ?
                                        <i className="fas fa-atom fa-spin text-purple"></i>:
                                        <></>
                                    } Ingrese NRC's separados por comas 
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-12">
                                    <div className="input-group">
                                        <input  type="text"
                                            name="dato"
                                            placeholder="Ingrese el valor a buscar"
                                            className="form-control form-control-sm"
                                            value={this.state.nrcs}
                                            disabled={this.state.active}
                                            onChange={
                                                    ({target}:React.ChangeEvent<HTMLInputElement>)=>{
                                                    this.setState({
                                                        nrcs:target.value
                                                    })
                                                }}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-3 col-12">
                                    <div className="input-group">
                                        <select name="periodo"
                                            className='form-control form-control-sm'
                                            disabled={this.state.active}
                                            onChange={(e) => this.handleSelectPeriodo(e) }
                                            
                                        >
                                        <option value="">---Periodo---</option>
                                        {periodoSelect}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="input-group">
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event,'estudiantes')}
                                        >
                                            <i className="fas fa-chalkboard-teacher"></i>
                                        </button>
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event,'instructores')}
                                        >
                                            <i className="fas fa-user-graduate"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <div>   
                    </div>
                </div>
            </div> 
        </div>
                <div className='row justify-content-center'>
                    <div className="col-md-12">
                        {
                            (this.state.options === 'estudiantes') ?
                                <TablaComandoAlumno Matriculados={this.BBMatVerificados}
                                                    BBMatriculados={this.BBMatVerificados}
                                /> :
                                <></>
                        }
                        {
                            (this.state.options === 'instructores') ?
                                <TablaInstructor cursos={this.BBMatVerificados} /> :
                                <></>
                        }
                    </div>
                </div>
        </Fragment>    
        )
    }
}
