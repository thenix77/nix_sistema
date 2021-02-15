import React, { Component, Fragment } from 'react'
import ApiJson from '../../ApiJson.json'
import { IEnrolamientoBB } from '../../models/enrolamiento'

interface IState{
    enrolamiento: IEnrolamientoBB[]
    status:boolean
}

interface IProps{
    idCurso: string
    periodo: string
    idAlumno:string
}

export default class BBIndicadorSupervisor extends Component <IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            enrolamiento: [],
            status:false
        }
    }
    
    async componentDidMount() {

        this.setState({
            status:false
        })

        await  fetch(`${ApiJson.Api}/BB/Enrolamiento/periodo/${this.props.periodo}/curso/${this.props.idCurso}/alumno/${this.props.idAlumno}`,
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
                        enrolamiento:data.data
                    })
                    console.log(this.state.enrolamiento);
                }) 
        
        this.setState({
            status:true
        })
    }

    render() {
        return (
            <Fragment>
                 {
                (this.state.status)?
                <span>
                    {this.state.enrolamiento.length > 0 ?
                        <i className="far fa-user-chart text-success"></i>
                        :
                        <i className="fad fa-chalkboard-teacher text-danger"></i>}
                </span>
                :
                <i className="fas fa-yin-yang fa-spin "></i>
                }        
            </Fragment>
        )
    }
}
