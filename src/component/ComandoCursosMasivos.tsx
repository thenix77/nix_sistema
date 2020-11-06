import React, { Component, Fragment } from 'react'
import ApiJson from '../ApiJson.json'
import { AnalizarNrc, SupervisoresCursos } from '../lib/analisisListaCruzada'
import { removeDuplicatesCurso } from '../lib/source'
import { IEnrolamiento } from '../models/enrolamiento'
import { IVMatricula } from '../models/matricula.sinfo'
import { ITerm } from '../models/term.bb'
import { ICursoSupervisor, ISupervisores } from '../models/zonal.sinfo'
import TablaMasivaAlumno from './TablaMasivaAlumno'
import TablaMasivaCursos from './TablaMasivaCursos'
import TablaMasivaInstructor from './TablaMasivaInstructor'
import TablaMasivaSupervisores from './TablaMasivaSupervisores'

interface IProps { }

interface IState {
    active: boolean
    periodos: ITerm[]
    Apexmatriculas: IVMatricula[]
    periodo: string
    nrcs: string,
    options: string,
    enrolamiento: IEnrolamiento[]
    supervisores: ISupervisores[]
}

export default class ComandoCursosMasivos extends Component<IProps, IState> {

    private findNrcs: IVMatricula[] = []
    private BBMatriculados: IEnrolamiento[] = []
    private supervisores:ICursoSupervisor[] = []
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            active: false,
            periodos: [],
            Apexmatriculas:[],
            periodo: '',
            nrcs: '',
            options: '',
            enrolamiento: [],
            supervisores: []
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
                        Apexmatriculas: data.data
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

     await fetch(`${ApiJson.Api}/sinfo/zonal/supervisores`,
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
                    supervisores: data.data
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
        this.supervisores = []
        this.BBMatriculados = []

        if (this.state.nrcs.length === 0) return
        if(this.state.periodo === '') return

        this.setState({ active: true })
      
        switch (option) {
            case 'estudiantes':
                this.setState({ options: 'estudiantes' })
                this.findNrcs = this.Analizar()
                this.BBMatriculados = this.state.enrolamiento.filter(mat => mat.role === 'S').filter(mat => mat.habilitado === 'Y')
                break
            case 'instructores':
                this.setState({ options: 'instructores' })
                this.findNrcs = removeDuplicatesCurso(this.Analizar())
                this.BBMatriculados = this.state.enrolamiento.filter(mat => mat.role === 'BB_FACILITATOR').filter(mat => mat.habilitado === 'Y')
                break
            case 'supervisores':
                this.setState({ options: 'supervisores' })
                this.findNrcs = removeDuplicatesCurso(this.Analizar())
                this.supervisores = SupervisoresCursos(this.findNrcs, this.state.supervisores)
                this.BBMatriculados = this.state.enrolamiento.filter(mat => mat.role === 'Sup').filter(mat => mat.habilitado === 'Y')
                break
            case 'cursos':
                this.setState({ options: 'cursos' })
                this.findNrcs = removeDuplicatesCurso(this.Analizar())
                this.BBMatriculados = this.state.enrolamiento.filter(mat => mat.habilitado === 'Y')
                break
        }
        

        this.setState({ active:false })
    }


    Analizar() {
        let NRCS = this.state.nrcs.split(',')
        return AnalizarNrc(this.state.Apexmatriculas, NRCS)
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
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event, 'supervisores')}
                                        >
                                            <i className="fas fa-sitemap"></i>
                                        </button>
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event, 'cursos')}
                                        >
                                            <i className="fas fa-journal-whills"></i>
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
                                <TablaMasivaAlumno apexMatriculados={this.findNrcs}
                                                   bbMatriculados={this.BBMatriculados}
                                /> :
                                <></>
                        }
                        {
                            (this.state.options === 'instructores') ?
                                <TablaMasivaInstructor  apexMatriculados={this.findNrcs}
                                                        bbMatriculados={this.BBMatriculados}
                                /> :
                                <></>
                        }
                         {
                            (this.state.options === 'supervisores') ?
                                <TablaMasivaSupervisores  supervisores={this.supervisores}
                                                          bbMatriculados={this.BBMatriculados}
                                /> :
                                <></>
                        }
                        {
                            (this.state.options === 'cursos') ?
                                <TablaMasivaCursos  apexMatriculados={this.findNrcs}
                                                    bbMatriculados={this.BBMatriculados}
                                /> :
                                <></>
                        }
                    </div>
                </div>
        </Fragment>    
        )
    }
}
