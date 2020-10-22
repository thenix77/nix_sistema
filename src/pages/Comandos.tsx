import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ComandoAlumno from '../component/ComandoAlumno'


interface IProps extends RouteComponentProps {}

interface IState {
    alumno:boolean
}


export default class Comandos extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            alumno:false
        }

        this.handleComandoAlumno = this.handleComandoAlumno.bind(this)

    }

    handleComandoAlumno(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            alumno:true
        })
        
    }

    render() {
        return (
            <>
                <div className="row justify-content-md-center">
                <div className="col-md-6">
                    {/* DIRECT CHAT */}
                    <div className="card direct-chat direct-chat-warning">
                        <div className="card-header">
                            <h3 className="card-title">Crear </h3> 
                            <div className="card-tools">
                                <span   data-toggle="tooltip"
                                    title="3 New Messages"
                                    className="badge badge-warning">
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
                            <button className="btn btn-app" onClick={this.handleComandoAlumno}>
                                <i className="fas fa-users"></i> Usuario BB
                            </button>
                             <button className="btn btn-app" onClick={()=>{}}>
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
                    </div>
                </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                        <div className="card direct-chat direct-chat-warning">
                            <div className="card direct-chat direct-chat-warning">
                                <div className="card-header">
                                        <h3 className="card-title">Crear</h3>
                                    <div className="card-tools">
                                       
                                        <span   data-toggle="tooltip"
                                                title="3 New Messages"
                                                className="badge badge-warning">
                                        </span>
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body " style={{ margin: "10px" }} > 
                                    <div style={{width:'100%'}}>
                                        {   (this.state.alumno)?
                                                <ComandoAlumno />          :
                                                <></>
                                        }
                                        
                                        
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
