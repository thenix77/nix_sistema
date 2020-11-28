import React, { Component, Fragment } from 'react'
import ApiJson from '../../ApiJson.json'
import { IEnrolamientoBB } from '../../models/enrolamiento'
import { ITerm } from '../../models/term.bb'
import RetiroBb from './tables/RetiroBb'
import RetiroCursos from './tables/RetiroCursos'

interface IProps { }
interface IState {
    active: boolean
    periodos: ITerm[]
    periodo: string
    enrolamientos: IEnrolamientoBB[]
    select:string
}
export default class Retiros extends Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props)

        this.state = {
            active: false,
            periodos: [],
            periodo: '',
            enrolamientos: [],
            select:''
        }

        this.handlePeriodoSelect = this.handlePeriodoSelect.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        this.setState({ active:true})
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
        
        this.setState({ active:false})
    }

    async handlePeriodoSelect({target}:React.ChangeEvent<HTMLSelectElement>) {
        
        const periodo = target.value
        this.setState({select:''})

        if(periodo === '') return

        this.setState({ active: true })
        await this.data(periodo)


        this.setState({ active:false})
    }

    async data(periodo: string) {
        await  fetch(`${ApiJson.Api}/BB/Retiros/${periodo}`,
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
                    enrolamientos: data.data
                })
            })
    }

    handleClick(event:React.MouseEvent<HTMLElement>,select:string) {
        this.setState({ select: select})
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
                        <div className="input-group">
                            <select name="periodo"
                                className='form-control form-control-sm'
                                disabled={this.state.active}
                                onChange={(e)=> this.handlePeriodoSelect(e)}
                                
                            >
                                <option value="">---Periodo---</option>
                                {periodoSelect}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <div className="input-group">
                            <button     className="btn btn-outline-secondary btn-sm"
                                        name='play'
                                        disabled={this.state.active}
                                        onClick={(event) => this.handleClick(event, 'alumnos')}
                            >
                                {
                                    (this.state.active) ?
                                        <i className="fad fa-spinner fa-spin"></i> 
                                    :
                                        <i className="far fa-users-class"></i>
                                }
                            </button>
                            <button     className="btn btn-outline-secondary btn-sm"
                                        name='play'
                                        disabled={this.state.active}
                                        onClick={(event) => this.handleClick(event, 'bajaBB')}
                            >
                                {
                                    (this.state.active) ?
                                        <i className="fad fa-spinner fa-spin"></i> 
                                    :
                                        <i className="fal fa-phone-laptop"></i>
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center  mt-3">
                    <div className="col-12 col-md-12">
                        {
                            (this.state.select === 'alumnos') ?
                                <RetiroCursos enrolamientos={this.state.enrolamientos} />
                                :
                                <></>
                        }
                        {
                            (this.state.select === 'bajaBB') ?
                                <RetiroBb enrolamientos={this.state.enrolamientos} />
                                :
                                <></>
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}
