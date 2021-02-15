import React, { Component, Fragment } from 'react'
import { IBBCursos } from '../../models/bbCursos'
import { IEnrolamientoBB, IVSEnrolamiento } from '../../models/enrolamiento'
import ApiJson from '../../ApiJson.json'
import BbIndicadorEnrolado from '../alert/BbIndicadorEnrolado'
import BbIndicadorEnroladoVisible from '../alert/BbIndicadorEnroladoVisible'
import BbIndicadorCursoCreado from '../alert/BbIndicadorCursoCreado'
import BbIndicardorCursoVisible from '../alert/BbIndicardorCursoVisible'

import '../css/app.css'

interface IProps {
    alumnos: IVSEnrolamiento[]
}

interface IState {
    enrolamientoBB: IEnrolamientoBB[]
    alumnos:IVSEnrolamiento[]
    cursosBB: IBBCursos[]
    status:boolean
}


export default class TablaTutoriaEnrolamientoAlumno extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            enrolamientoBB: [],
            alumnos:[],
            cursosBB: [],
            status:false
        }
    }

    async componentDidMount() {
        this.setState({
            alumnos: Object.assign(this.state.alumnos, this.props.alumnos),
            status:false    
        })
        
        await  fetch(`${ApiJson.Api}/BB/Enrolamiento/periodo/${this.props.alumnos[0].periodo}/nrc/${this.props.alumnos[0].nrc}`,
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
                       enrolamientoBB: data.data
                    })
                })
        
        await  fetch(`${ApiJson.Api}/BB/Cursos/periodo/${this.props.alumnos[0].periodo}`,
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
                       cursosBB: data.data
                    })
                })
        
        this.setState({
            status:true
        })
    }

    render() {

        const tbody = this.state.alumnos.map((alumno: IVSEnrolamiento, i: number) => {
        return (
            <tr key={alumno.curso + '-' + i}>
                <td align='center'>{ alumno.id_alumno}</td>
                <td align='justify'>{ alumno.alumno}</td>
                <td align='justify'>{ alumno.azonal} </td>
                <td align='justify'>{ alumno.acampus} </td>
                <td align='center'
                    className={(alumno.retirado === 'Y') ? 'bg-danger' : ''}
                >{(alumno.retirado === 'Y') ?
                        <span>&#10003;</span>
                    :
                        ''}
                </td>
                <td align='center'
                    className={(alumno.deuda === 'Y') ? 'bg-danger text-white' : ''}
                >{(alumno.deuda === 'Y') ?
                        <span>&#120;</span>
                    :
                        ''}
                </td>
                <td align='center'>
                    <BbIndicadorEnrolado enrolamientoBB={this.state.enrolamientoBB
                                .filter((e:IEnrolamientoBB)=> e.batch_uid === alumno.id_alumno)
                    } />
                </td>
                <td align='center'>
                    <BbIndicadorEnroladoVisible enrolamientoBB={this.state.enrolamientoBB
                                .filter((e:IEnrolamientoBB)=> e.batch_uid === alumno.id_alumno)
                    } />
                </td>
            </tr>
            )
        })

        return (
            <Fragment>
                { this.state.status ?
                    <Fragment>
                        <table className='table table-bordered table-striped' style={{ fontSize: 'x-small' }}>
                            <thead>
                                <tr className='table-secondary'>
                                    <td align='center' width='10%'>ID</td>
                                    <td align='center'>Curso</td>
                                    <td align='center' width='20%'>Zonal</td>
                                    <td align='center' width='20%'>Campus</td>
                                    <td align='center' width='3%'><span title='Creado'>C</span></td>
                                    <td align='center' width='3%'><span title='visible'>V</span></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td align='center' width='20%'>
                                        {this.state.alumnos[0].id_curso}
                                    </td>
                                    <td>
                                        {this.state.alumnos[0].curso}
                                    </td>
                                    <td>
                                        {this.state.alumnos[0].zonal}
                                    </td>
                                    <td>
                                        {this.state.alumnos[0].campus}
                                    </td>
                                    <td align='center' width='3%'>
                                        <BbIndicadorCursoCreado cursos={this.state.cursosBB
                                            .filter((c: IBBCursos) => c.course_id === this.state.alumnos[0].id_curso)
                                        } />
                                    </td>
                                    <td align='center' width='3%'>
                                        <BbIndicardorCursoVisible enrolamientoBB={this.state.enrolamientoBB
                                            .filter((e: IEnrolamientoBB) => e.course_id === this.state.alumnos[0].id_curso)
                                        } />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='table table-bordered table-striped ' style={{ fontSize: 'x-small' }}>
                            <thead >
                                <tr className='table-secondary' >
                                    <td rowSpan={2} align='center' width='20%'>IdAlumno</td>
                                    <td rowSpan={2} align='center' >Alumno</td>
                                    <td rowSpan={2} align='center' width='20%'>Zonal</td>
                                    <td rowSpan={2} align='center' width='15%'>Campus</td>
                                    <td colSpan={2} align='center' width='3%'>Sinfo</td>
                                    <td colSpan={2} align='center' width='3%'>BB</td>
                                </tr>
                                <tr className='table-secondary'>
                                    <td><span title='Retirado'>R</span></td>
                                    <td><span title='Deuda'>D</span></td>
                                    <td><i className="fal fa-user-edit" title='Usuario Enrolado'></i></td>
                                    <td><i className="fal fa-chalkboard-teacher" title='Usuario Visible'></i></td>
                                </tr>
                            </thead>
                            <tbody>
                                {tbody}
                            </tbody>
                        </table>
                    </Fragment>
                :
                    <div className='reload' >
                        <img src={'/dist/img/reload.gif'}  alt=""/>
                    </div>
                }    
            </Fragment>    
        )
    }
}
