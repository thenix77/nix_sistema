import React, { Component, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import '../style/content.css'
import ApiJson from '../ApiJson.json'


interface IProps extends RouteComponentProps{

}

interface IState {
    visible: boolean
    sinfoCantidadCurso: number
    sinfoCantidadAlumno:number
    bbCantidadCurso: number
    bbCantidadAlumno:number
    
}

export default class Content extends Component<IProps,IState> {

    constructor(props:IProps) {
        super(props)

        this.state = {
            visible: false,
            sinfoCantidadCurso: 0,
            sinfoCantidadAlumno:0,
            bbCantidadCurso: 0,
            bbCantidadAlumno:0
        }

        this.sinfo = this.sinfo.bind(this)
        this.blackboard = this.blackboard.bind(this)
    }

    
    async sinfo(event: React.MouseEvent<HTMLElement>){
        event.preventDefault()
        
        if (this.state.visible) return
        
        localStorage.setItem('cantidadAplexCursos', this.state.sinfoCantidadCurso.toString())
        localStorage.setItem('cantidadAplexAlumno' , this.state.sinfoCantidadAlumno.toString())
        this.props.history.push('/apex')
    }

    blackboard(event: React.MouseEvent<HTMLElement>){
        event.preventDefault()
        console.log(event)
    }

    async componentDidMount(): Promise<void>{
        
        this.setState ({
            visible:true
        })
         
        await   fetch(`${ApiJson.Api}/sinfo/matricula/cantidadCursos`,
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
                        sinfoCantidadCurso: data.length
                    })
                })
                
        await   fetch(`${ApiJson.Api}/sinfo/matricula/cantidadAlumnos`,
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
                        sinfoCantidadAlumno: data.length
                    })
                })
        
        await   fetch(`${ApiJson.Api}/BB/Cursos/cantidadCursos`,
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
                        bbCantidadCurso: data.length
                    })
                })
        
        await   fetch(`${ApiJson.Api}/BB/Cursos/cantidadAlumnos`,
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
                        bbCantidadAlumno: data.length
                    })
                })
        
        this.setState ({
            visible:false
        })
    }

    render() {
        return (
           
                    <div className="row">
                         <div className="col-12 col-sm-6 col-md-3 ">
                            <div className="info-box link-black" onClick={this.sinfo}>
                        <span className="info-box-icon bg-info elevation-1">
                            <i className={this.state.visible ? "fas fa-cog fa-spin" : "fas fa-cog"}>
                            </i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Matriculados - Apex</span>
                                    <span className="info-box-number">
                                    {this.state.visible ? 0: this.state.sinfoCantidadCurso}
                                    <small> Cursos Registrados</small>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3 ">
                            <div className="info-box link-black" onClick={this.blackboard}>
                        <span className="info-box-icon bg-danger elevation-1">
                            <i className={this.state.visible ? "fas fa-cog fa-spin" : "fas fa-cog"}></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Matriculados - Blackboard</span>
                                    <span className="info-box-number">
                                    {this.state.visible ? 0: this.state.bbCantidadCurso}
                                    <small> Cursos Registrados</small>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}
