import React, { Component, Fragment } from 'react'
import { ValidarNumero } from '../lib/validation'
import ApiJson from '../ApiJson.json'
import { ITerm } from '../models/term.bb'
import TableComandoChangeInstructor from './TableComandoChangeInstructor'
import { IInstructor } from '../models/instructor'
import { IEnrolamientoBB } from '../models/enrolamiento'

interface IProps {

}

interface IState {
    active: boolean,
    nrc: string,
    validateTextoNrc: boolean
    periodos: ITerm[]
    periodo: string
    instructores: IInstructor[]
    instructor: string
    enrolamientoBB: IEnrolamientoBB[]
    validateTextoInstructor: boolean
    cond:string
    
}


export default class ComandoCambioInstructor extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            active: false,
            nrc: '',
            validateTextoNrc: false,
            periodos: [],
            periodo: '',
            enrolamientoBB: [],
            instructor: '',
            instructores: [],
            validateTextoInstructor: false,
            cond:''
        }

        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
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
    }

    async data(periodo: string, nrc: string) {
       
        await fetch(`${ApiJson.Api}/BB/Enrolamiento/periodo/${periodo}/nrc/${nrc}/rol/BB_FACILITATOR`,
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
                    enrolamientoBB: data.data
                })
            })
                
        await  fetch(`${ApiJson.Api}/sinfo/instructores`,
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

    async handleClick() {
        this.setState({ cond: ''})
        if (this.state.validateTextoInstructor && this.state.validateTextoNrc && this.state.periodo !== '')
        {
            this.setState({active:true})    
            
            await this.data(this.state.periodo, this.state.nrc)
            this.setState({active:false, cond:'click'})  
        }
    }

    
    render() {

        const periodoSelect = this.state.periodos.map((periodo:ITerm,i:number) => {
            return (
                <option  value={periodo.sourcedid_id} key={periodo.sourcedid_id+'-'+i.toString()}>{periodo.name}</option>
            )
        })

        return (
            <Fragment>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-4">
                            <div className="input-group ">
                                <label htmlFor="tipo">
                                    NRC &nbsp;
                                </label>
                                <input  type="text"
                                        className={this.state.validateTextoNrc ? "form-control form-control-sm is-valid" :
                                                                                "form-control form-control-sm is-invalid"}
                                        name='nrc'
                                        disabled={this.state.active}
                                        placeholder="Ingrese NRC"
                                         onChange={({ target }:React.ChangeEvent<HTMLInputElement>) => {
                                            this.setState({ nrc: target.value, validateTextoNrc:ValidarNumero(target.value) })
                                        } }
                                        value={this.state.nrc} 
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="input-group">
                                <select name="periodo"
                                    className='form-control form-control-sm'
                                    disabled={this.state.active}
                                    onChange={({target}:React.ChangeEvent<HTMLSelectElement>) => {
                                            this.setState({ periodo:target.value })
                                        }}
                                    
                                >
                                    <option value="">---Periodo---</option>
                                    {periodoSelect}
                                </select>
                            </div>
                        </div> 
                    </div>
                    <div className="row justify-content-center  mt-3">
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <label htmlFor="tipo">
                                    Nuevo Instructor: &nbsp;
                                </label>
                                <input  type="text"
                                        className={this.state.validateTextoInstructor ? "form-control form-control-sm is-valid" :
                                                                                "form-control form-control-sm is-invalid"}
                                        id='tipo'
                                        name='tipo'
                                        placeholder="Ingrese ID Instructor"
                                        disabled={this.state.active}
                                        value={this.state.instructor}
                                        onChange={({target}:React.ChangeEvent<HTMLInputElement>) => {
                                                    this.setState({
                                                        instructor: target.value,
                                                        validateTextoInstructor: ValidarNumero(target.value)
                                                    })
                                                }}
                                   
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-2 ">
                            <button className='btn btn-outline-info btn-sm' onClick={ this.handleClick } disabled={this.state.active}>
                                {
                                    (this.state.active) ?
                                        <i className="fal fa-compact-disc fa-spin"></i> 
                                        :
                                        <i className="fas fa-vote-yea"></i>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-3">
                        <div className="col-12 col-md-12">
                        {
                            (this.state.cond === 'click') ?
                                <TableComandoChangeInstructor   enrolamiento={this.state.enrolamientoBB}
                                                                instructor={this.state.instructores
                                                                    .filter(inst => inst.id === this.state.instructor.padStart(9,'000000000'))}
                                />
                                :
                                <></>
                         }
                        </div>
                    </div>
            </Fragment>
        )
    }
}
