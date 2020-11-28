import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ComandoAlumno from '../component/ComandoAlumno'
import ComandoCambioInstructor from '../component/ComandoCambioInstructor'
import ComandoCursos from '../component/ComandoCursos'
import ComandoCursosMasivos from '../component/ComandoCursosMasivos'
import ComandoListaCruzada from '../component/ComandoListaCruzada'


interface IProps extends RouteComponentProps {}

interface IState {
    select: string
    titulo: string
}


export default class Comandos extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            select: '',
            titulo: ''
        }

        this.handleComandoAlumno = this.handleComandoAlumno.bind(this)
        this.handleComandoListaCruzada = this.handleComandoListaCruzada.bind(this)
        this.handleComandoCursos = this.handleComandoCursos.bind(this)
        this.handleComandoCursosMasivo = this.handleComandoCursosMasivo.bind(this)
        this.handleComandoChangeInstructor = this.handleComandoChangeInstructor.bind(this)
    }

    handleComandoAlumno(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            select: 'alumno',
            titulo: 'Alumno'
        })
        
    }

    handleComandoListaCruzada(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            select: 'listacruzada',
            titulo: 'Lista Cruzada'
        })
    }

     handleComandoCursos(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            select: 'cursos',
            titulo: 'Cursos'
        })
    }

    handleComandoCursosMasivo(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            select: 'cursosMasivo',
            titulo: 'Cursos Masivo'
        })
    }

    handleComandoChangeInstructor(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()

        this.setState({
            select: 'cambioInstructor',
            titulo: 'Cambio Instructor'
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
                            <h3 className="card-title">Comandos </h3> 
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
                             <button className="btn btn-app" onClick={this.handleComandoCursos}>
                                <i className="fas fa-barcode"></i> Cursos 
                            </button>
                            <button className="btn btn-app" onClick={this.handleComandoCursosMasivo}>
                                <i className="fas fa-barcode"></i> Cursos Masivo
                            </button>
                            <button  className="btn btn-app"  onClick={this.handleComandoChangeInstructor}>
                                <i className="fas fa-exchange-alt"></i> Instructor
                            </button>
                            <button className="btn btn-app" onClick={this.handleComandoListaCruzada}>
                                <i className="fas fa-tasks"></i> Lista Cruzada
                            </button>
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
                                    <h3 className="card-title">{ this.state.titulo}</h3>
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
                                        {   (this.state.select ==='alumno')?
                                                <ComandoAlumno />          :
                                                <></>
                                        }
                                        {   (this.state.select === 'listacruzada')?
                                                <ComandoListaCruzada />          :
                                                <></>
                                        }
                                        {   (this.state.select === 'cursos')?
                                                <ComandoCursos />          :
                                                <></>
                                        }
                                        {   (this.state.select === 'cursosMasivo')?
                                                <ComandoCursosMasivos />          :
                                                <></>
                                        }
                                        {   (this.state.select === 'cambioInstructor')?
                                                <ComandoCambioInstructor />          :
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
