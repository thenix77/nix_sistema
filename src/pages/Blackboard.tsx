import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import ApiJson from '../ApiJson.json'
import Intentos from '../component/bb/Intentos'
import { IScript } from '../models/script'


interface IProps extends RouteComponentProps{

}

interface IComponente extends IScript{
    pk1:number
    course_id  :string
    categoria_nombre  :string
    componente  :string
    intentos: string
}

interface IState {
    activar:boolean
    periodo:string
    dato: string
    tabla:string
    componentes:IComponente[]
    categorias: string[]
    select:string
}
export default class Blackboard extends Component <IProps,IState> {
    constructor(props:IProps){
        super(props)

        const { periodo } = this.props.match.params as any

        this.state = {
            activar:false,
            periodo: periodo,
            dato: '',
            tabla:'',
            categorias: [],
            componentes:[],
            select :''
        }

        this.intentos = this.intentos.bind(this)
        this.hanbleIntentosScript = this.hanbleIntentosScript.bind(this)
    }

    async handleConsultaCategoriaName() {
         await  fetch(`${ApiJson.Utda}/api/intentos/categoria/${this.state.periodo}`,
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
                       categorias: data.data
                    })
                })
    }

    async ConsultaComponente() {
        await  fetch(`${ApiJson.Utda}/api/intentos/${this.state.periodo}/${this.state.dato}/3`,
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
                    componentes: data.data
                })
            })
    }


    async intentos() {

        this.setState({
            activar: true,
            select:'intentos'
        })

        await this.handleConsultaCategoriaName()


        this.setState({
            activar:false
        })
    }

    private handlecmbIntentosChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const element = event.target as HTMLSelectElement;
        this.setState({ dato: element.value });
    }

    async hanbleIntentosScript() {
        
        if ( this.state.dato === '' || this.state.dato === '0') return

        this.setState({
            activar: true,
        })

        await this.ConsultaComponente()

        this.setState({
            activar: false,
            tabla: 'componente',
            dato:''
        })

      
    }

    render() {

        const cmbCategoria = this.state.categorias.map((c:any, i: number) => {
            return (
                <Fragment key={'cmb-'+i}>
                    <option  value={c.categoria_nombre}>{c.categoria_nombre}</option>
                </Fragment>
            )
        })

        return (
            <Fragment>
                <br/>
                <div className="row justify-content-md-center" >
                    <div className="col-md-10">
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <span>
                                        {this.state.activar 
                                            ? <i className="fas fa-spinner fa-spin"></i>
                                            : <i className="fas fa-terminal"></i>}
                                    </span> Blackboard - Periodo - {this.state.periodo}
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
                                <button className="btn btn-app" onClick={this.intentos}>
                                    <span className="badge bg-primary">
                                        C
                                    </span>
                                    <i className="fas fa-users"></i> Intentos
                                </button>
                            </div>
                            <div className="card-footer" >
                                <div className="row justify-content-md-center">
                                    {
                                        this.state.select === 'intentos' ?
                                            <Fragment>
                                               <div className="col-4 ">
                                                    <div className="input-group  mx-auto">
                                                        <select name="periodo" id="" className="form-control form-control-sm" onChange={this.handlecmbIntentosChange}>
                                                            <option value="0" >___CATEGORIA__</option>
                                                            { cmbCategoria}
                                                        </select>
                                                    </div>       
                                                </div>
                                                <div className="col-2 ">
                                                    <div className="input-group  mx-auto">
                                                        <button className='btn btn-primary btn-sm' onClick={this.hanbleIntentosScript}>
                                                            <i className ="fas fa-step-forward"></i>
                                                        </button>
                                                    </div>       
                                                </div> 
                                            </Fragment>
                                            
                                        :
                                            ''    
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                        <div className="card-header">
                            <h3 className="card-title">Resultado { this.state.select}</h3>
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
                                    (this.state.componentes.length > 0 && this.state.tabla === 'componente') ? 
                                        <Fragment>
                                            <Intentos componentes={this.state.componentes} registros={ 2000}/>
                                        </Fragment>
                                    :
                                        ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
        )
    }
}
