import React, { Component, Fragment } from 'react'
import ApiJson from '../../ApiJson.json'
import { IBBCursos } from '../../models/bbCursos'
import { IEnrolamientoBB, IVSEnrolamiento } from '../../models/enrolamiento'
import BbIndicadorCursoCreado from '../alert/BbIndicadorCursoCreado'
import BbIndicadorEnrolado from '../alert/BbIndicadorEnrolado'
import BbIndicadorEnroladoVisible from '../alert/BbIndicadorEnroladoVisible'
import BbIndicardorCursoVisible from '../alert/BbIndicardorCursoVisible'

interface IProps {
    alumnos: IVSEnrolamiento[]
}

interface IState {
    enrolamientoBB: IEnrolamientoBB[]
    cursosBB: IBBCursos[]
    status: boolean
    alumnos: IVSEnrolamiento[]
}
export default class TablaTutoriaEnrolamiento extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            enrolamientoBB: [],
            cursosBB: [],
            status: false,
            alumnos:[],
        }
    }

     async componentDidMount() {

         this.setState({
             alumnos: Object.assign(this.state.alumnos, this.props.alumnos),
             status:false
         })
         
         await  fetch(`${ApiJson.Api}/BB/Enrolamiento/periodo/${this.props.alumnos[0].periodo}/idalumno/${this.props.alumnos[0].id_alumno}`,
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
         
         await  fetch(`${ApiJson.Api}/BB/Cursos/periodo/${this.props.alumnos[0].periodo}/${this.props.alumnos[0].id_curso}`,
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
                <td align='center'>{ alumno.id_curso}</td>
                <td align='justify'>{ alumno.curso}</td>
                <td align='justify'>{ alumno.zonal} </td>
                <td align='justify'>{ alumno.campus} </td>
                <td align='center'>{(alumno.calificable === 'Y') ?
                    <span className='text-success'>&#10003;</span>
                    :
                    <span className='text-danger'>&#120;</span>}
                </td>
                <td align='center'>{(alumno.matriculable === 'Y') ?
                    <span className='text-success'>&#10003;</span>
                    :
                    <span className='text-danger'>&#120;</span>}
                </td>
                <td align='center'>
                    <BbIndicadorCursoCreado cursos={this.state.cursosBB}
                    />
                </td>
                <td>
                    <BbIndicardorCursoVisible   enrolamientoBB={
                                                    this.state.enrolamientoBB
                                                        .filter((e: IEnrolamientoBB) => e.batch_uid === alumno.id_alumno)
                                                        .filter((e: IEnrolamientoBB) => e.periodo === alumno.periodo)
                                                        .filter((e: IEnrolamientoBB) => e.course_id === alumno.id_curso)
                    }
                                                 />
                </td>
                <td align='center'>
                    <BbIndicadorEnrolado   enrolamientoBB={
                                                    this.state.enrolamientoBB
                                                        .filter((e: IEnrolamientoBB) => e.batch_uid === alumno.id_alumno)
                                                        .filter((e: IEnrolamientoBB) => e.periodo === alumno.periodo)
                                                        .filter((e: IEnrolamientoBB) => e.course_id === alumno.id_curso)
                    }
                                                 />
                </td>
                <td>
                    <BbIndicadorEnroladoVisible     enrolamientoBB={
                                                    this.state.enrolamientoBB
                                                        .filter((e: IEnrolamientoBB) => e.batch_uid === alumno.id_alumno)
                                                        .filter((e: IEnrolamientoBB) => e.periodo === alumno.periodo)
                                                        .filter((e: IEnrolamientoBB) => e.course_id === alumno.id_curso)
                    }
                                                 />
                </td>
            </tr>
            )
        })
        
        return (
            <Fragment>
                { this.state.status ?
                    <Fragment>
                        <table className='table table-bordered table-striped' style={{fontSize:'x-small'}}>
                            <thead>   
                                <tr className='table-secondary'>
                                    <td align='center' width='10%'>ID</td>
                                    <td align='center'>Alumno</td>
                                    <td align='center' width='20%'> Zonal</td>  
                                    <td align='center' width='20%'>Campus</td>            
                                    <td align='center' width='3%'><span title='Deuda'>D</span></td>
                                    <td align='center' width='3%'><span title='Retirado'>R</span></td>
                                    <td align='center' width='3%'><span title='Acceso a BlackBoard'>A</span></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td align='center' width='20%'>
                                        {this.props.alumnos[0].id_alumno}
                                    </td>
                                    <td>
                                        {this.props.alumnos[0].alumno}
                                    </td>
                                    <td>
                                        {this.props.alumnos[0].azonal}         
                                    </td>
                                    <td>
                                        {this.props.alumnos[0].acampus}         
                                    </td>            
                                    <td align='center' width='3%'
                                        className={this.props.alumnos[0].deuda === 'Y' ? 'bg-danger' : ''}
                                    >
                                        {this.props.alumnos[0].deuda}
                                    </td>
                                    <td align='center' width='3%'
                                        className={this.props.alumnos[0].retirado === 'Y' ? 'bg-danger' : ''}
                                        >
                                    {this.props.alumnos[0].retirado}
                                    </td>
                                    <td align='center' width='3%'>{this.props.alumnos[0].accesobb}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <table className='table table-bordered table-striped ' style={{fontSize:'x-small'}}>
                            <thead >
                                <tr className='table-secondary' >
                                    <td rowSpan={2} align='center' width='20%'>IdCurso</td>
                                    <td rowSpan={2} align='center' >Curso</td>
                                    <td rowSpan={2} align='center' width='20%'>Zonal</td>
                                    <td rowSpan={2} align='center' width='15%'>Campus</td>
                                    <td colSpan={2} align='center' width='3%'>Sinfo</td>
                                    <td colSpan={4} align='center' width='3%'>BB</td>
                                </tr>
                                <tr className='table-secondary'>
                                    <td><span title='Calificable'>C</span></td>
                                    <td><span title='Matriculable'>M</span></td>
                                    <td><i className="fas fa-book" title='Curso Creado'></i></td>
                                    <td><span title='curso visible'><i className="far fa-eye"></i></span></td>
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
