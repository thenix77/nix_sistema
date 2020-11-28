import React, { Component, Fragment } from 'react'
import ApiJson from '../ApiJson.json'
import { removerDuplicadosEstudiantesApex,removerDuplicadosCursoApex } from '../lib/enrolamientoApex.lib'

import { IEnrolamientoApex, IEnrolamientoBB } from '../models/enrolamiento'
import { ITerm } from '../models/term.bb'
import { ISupervisores } from '../models/zonal.sinfo'


import TablaMasivaAlumno from './TablaMasivaAlumno'
import TablaMasivaCursos from './TablaMasivaCursos'
import TablaMasivaInstructor from './TablaMasivaInstructor'
import TablaMasivaSupervisores from './TablaMasivaSupervisores'

interface IProps { }

interface IState {
    active: boolean
    periodos: ITerm[]
    periodo: string
    nrcs: string,
    options: string,
    matBB: IEnrolamientoBB[]
    supervisores:ISupervisores[]
    matApex:IEnrolamientoApex[]
}

export default class ComandoCursosMasivos extends Component<IProps, IState> {
    private  sinDuplicadosMatApex:IEnrolamientoApex[] = []
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            active: false,
            periodos: [],
            periodo: '',
            nrcs: '',
            options: '',
            matBB: [],
            supervisores: [],
            matApex:[]
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
                        supervisores: data.data
                    })
                })
    }

    async BbSinfo() {
        
        await fetch(`http://localhost:4000/BB/Enrolamiento/periodo/${this.state.periodo}/nrcs/${this.state.nrcs}`,
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
                    matBB: data.data
                })
            })
       
        await fetch(`${ApiJson.Api}/sinfo/matricula/periodo/${this.state.periodo}/nrcs/${this.state.nrcs}`,
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
                    matApex: data.data
                })
            })
    }

    async handleSelectPeriodo({ target }: React.ChangeEvent<HTMLSelectElement>)  {
                                                        
        this.setState({ periodo:target.value })
    }


    async handleClick(event: React.MouseEvent<HTMLElement>,option:string) {

        event.preventDefault()


        if (this.state.nrcs.length === 0) return
        if(this.state.periodo === '') return

        this.setState({
            active: true,
            matApex: this.state.matApex.filter(s => s.pago !== 'PaganteN').filter(c => c.calificable === 'Y'),
        })

             
        switch (option) {
            case 'estudiantes':
                this.sinDuplicadosMatApex = this.state.matApex
                this.setState({
                    options: 'estudiantes',
                    matBB: this.state.matBB.filter(s => s.role === 'S')
                })
                
                break
            case 'instructores':
                this.sinDuplicadosMatApex = removerDuplicadosCursoApex(this.state.matApex)
                this.setState({
                    options: 'instructores',
                    matBB: this.state.matBB.filter(s => s.role === 'BB_FACILITATOR')
                })
                break
            case 'supervisores':
                this.setState({ options: 'supervisores' })
                break
            case 'cursos':
                this.setState({ options: 'cursos' })
                break
            case 'play':
                await this.BbSinfo()
                this.setState({ options:'' })
                
                break;
        }
        

        this.setState({ active:false })
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
                                                    name='play'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event, 'play')}
                                        >
                                            <i className="far fa-play-circle"></i>
                                        </button>
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event, 'cursos')}
                                        >
                                            <i className="fas fa-journal-whills"></i>
                                        </button>
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event,'estudiantes')}
                                        >
                                            <i className="fas fa-users-class"></i>
                                        </button>
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event,'instructores')}
                                        >
                                            <i className="fas fa-chalkboard-teacher"></i>
                                        </button>
                                        <button     className="btn btn-outline-secondary"
                                                    name='usuario'
                                                    disabled={this.state.active}
                                                    onClick={(event) => this.handleClick(event, 'supervisores')}
                                        >
                                            <i className="fas fa-sitemap"></i>
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
                                <TablaMasivaAlumno  matBB={this.state.matBB}
                                                    matApex={this.sinDuplicadosMatApex}
                                /> :
                                <></>
                        }
                        {
                            (this.state.options === 'instructores') ?
                                <TablaMasivaInstructor  matBB={this.state.matBB}
                                                        matApex={this.sinDuplicadosMatApex}
                                /> :
                                <></>
                        }
                         {/*
                            (this.state.options === 'supervisores') ?
                                <TablaMasivaSupervisores bbSinfoMatriculados={this.state.bbsinfo}
                                                         supervisores={this.state.supervisores}
                                /> :
                                <></>
                        }
                        {
                            (this.state.options === 'cursos') ?
                                <TablaMasivaCursos   bbSinfoMatriculados={this.state.bbsinfo}/> :
                                <></>
                        */}
                    </div>
                </div>
        </Fragment>    
        )
    }
}
