import React, { Component, Fragment } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ApiJson from '../ApiJson.json'
import { ISinfoPeriodo } from '../models/sinfo/periodo.model'


interface IProps extends RouteComponentProps{

}

interface IState {
    activar:boolean
    periodos: ISinfoPeriodo[]
}

export default class Home extends Component<IProps,IState> {

    constructor(props:IProps){
        super(props)

        this.state ={
            activar: false,
            periodos: []
        }
    }

    async componentDidMount(){

        this.setState({
            activar:true
        })

        await  fetch(`${ApiJson.Utda}/public/periodos`,
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
                        periodos: data.data
                    })
                })

        this.setState({
            activar:false
        })
    }

    render() {

        const body = this.state.periodos.map((p:ISinfoPeriodo, i:number)=>{
            return (
                    <Link to={'/dashboard/'+ p.periodo} className="btn btn-app" key={i}>
                        <span className="badge bg-purple">
                            {p.periodo}
                        </span>
                        <i className="fas fa-book"></i> {p.name} 
                    </Link>
            )
        })

        return (
            <Fragment>
                <br/>
                <div className="row justify-content-md-center" >
                    <div className="col-md-6">
                        {/* DIRECT CHAT */}
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <span>
                                        {this.state.activar 
                                            ? <i className="fas fa-spinner fa-spin"></i>
                                            : <i className="fas fa-hourglass-half"></i>}
                                    </span> Periodo
                                    </h3> 
                                <div className="card-tools">
                                    Periodos:
                                    <span   data-toggle="tooltip"
                                        title="3 New Messages"
                                        className="badge badge-warning">
                                            {this.state.periodos.length}
                                    </span>
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                        <i className="fas fa-comments" /></button>
                                    {/*<button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                                    </button>*/}
                                </div>
                            </div>
                            <div className="card-body" style={{ margin: "10px 0px " }}>
                                { body }
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
