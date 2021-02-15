import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import ApiJson from '../ApiJson.json'



import {IVSinfoMatricula} from '../models/matricula.sinfo'
import { ISupervisores } from '../models/zonal.sinfo';

interface IProps extends RouteComponentProps{

}

interface IState{
    activar:boolean
    idAlumno: string
    periodo:string
    cursos: IVSinfoMatricula[]
    supervisores: ISupervisores[]
   
}

export default class Cursos extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            activar: false,
            idAlumno: '',
            periodo:'',
            cursos: [],
            supervisores:[],
        }
       
    }

    async componentDidMount() {
        const { idAlumno } = this.props.match.params as any
        
        this.setState({
            activar: true,
            idAlumno: idAlumno,
        })

        await  fetch(`${ApiJson.Api}/sinfo/vista/curso/find/${idAlumno}/IdAlumno`,
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
                        cursos:data.data
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
                        supervisores:data.data
                    })
                })
        
        this.setState({
            activar:false
        })
        
    }
    
    render() {
        return (
            <Fragment>
                <div className="row justify-content-md-center">
                <div className="col-md-10">
                    <div className="card direct-chat direct-chat-warning">
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                    <h3 className="card-title">
                                        Resultado - {this.state.idAlumno} 
                                    </h3>
                                <div className="card-tools">
                                    Registros:
                                    <span   data-toggle="tooltip"
                                            title="3 New Messages"
                                            className="badge badge-warning">
                                            {this.state.activar ?
                                                <i className="fas fa-yin-yang fa-spin"></i> :
                                                this.state.cursos.length}
                                    </span>
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
                                </div>
                            </div>
                                <div className="card-body " style={{ margin: "10px" }} > 
                                    <div style={{ width: '100%' }}>
                                       
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
