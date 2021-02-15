import React, { Component, Fragment } from 'react'

import { AlumnoCorreo } from '../../lib/source'
import { IEnrolamientoBB, IVSEnrolamiento } from '../../models/enrolamiento'
import ApiJson from '../../ApiJson.json'
import BbIndicadorEnrolado from '../alert/BbIndicadorEnrolado'
import BbIndicadorEnroladoVisible from '../alert/BbIndicadorEnroladoVisible'
import '../../component/css/app.css'

interface IState{
    status: boolean
    enrolamientoBB: IEnrolamientoBB[]
}

interface IProps{
    enrolamiento: IVSEnrolamiento[]
}
export default class TablaCursoEnrolamientoCurso extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            status: false,
            enrolamientoBB:[]
        }
    }

    async componentDidMount() {
        this.setState({
            status:false
        })

        await  fetch(`${ApiJson.Api}/BB/Enrolamiento/periodo/${this.props.enrolamiento[0].periodo}/nrc/${this.props.enrolamiento[0].nrc}`,
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
        
        this.setState({
            status:true
        })
    }

    render() {

        const body = this.props.enrolamiento.map((matr: IVSEnrolamiento, index: number) => {
            return (
                <tr key={matr.id_curso +'-'+index}>
                    <td width='5%' align='center'
                        className={matr.calificable === 'N' ? 'bg-danger' : ''}    
                    >
                        {matr.calificable}
                    </td>
                    <td width='15%' align='center'>{matr.id_alumno} </td>
                    <td width='20%' align='justify'>{ matr.alumno} </td>
                    <td>
                        {
                            matr.deuda === 'N' &&
                            this.state.enrolamientoBB.filter((e: IEnrolamientoBB) => e.batch_uid === matr.id_alumno).length === 0 ?
                                <>
                                ENROLAMIENTO_PUT - crear $token $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} S
                                </>
                            :
                                ''    
                        }
                        {
                            matr.deuda === 'N' &&
                                this.state.enrolamientoBB
                                    .filter((e: IEnrolamientoBB) =>
                                        e.batch_uid === matr.id_alumno && e.usuariovisible === 'N').length > 0 ?
                                <>
                                ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} Yes
                                </>
                            :
                                ''    
                        }
                        {
                            matr.deuda === 'Y' &&
                                this.state.enrolamientoBB
                                    .filter((e: IEnrolamientoBB) =>
                                        e.batch_uid === matr.id_alumno && e.usuariovisible === 'Y').length > 0 ?
                                <>
                                ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} No
                                </>
                            :
                                ''    
                        }
                        {
                            matr.retirado === 'Y' &&
                                this.state.enrolamientoBB
                                    .filter((e: IEnrolamientoBB) =>
                                        e.batch_uid === matr.id_alumno && e.usuariovisible === 'Y').length > 0 ?
                                <>
                                ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} No
                                </>
                            :
                                ''    
                        }
                    </td>
                    <td width='3%' align='center'>
                        {
                            matr.retirado === 'Y' ?
                                <span className='text-danger'>&#10007;</span>
                            :
                                ''    
                        }
                    </td>
                    <td width='3%' align='center'>
                        {
                            matr.deuda === 'Y' ?
                                <span className='text-danger'>&#10007;</span>
                            :
                                ''
                        }
                    </td>
                    <td width='3%' align='center'>
                        {
                            matr.matriculable === 'Y' ?
                                <span className='text-success'>&#10003;</span>
                            :
                                <span className='text-danger'>&#10007;</span>    
                        }
                    </td>
                    <td width='3' align='center'>
                            <BbIndicadorEnrolado enrolamientoBB={this.state.enrolamientoBB
                                .filter((e: IEnrolamientoBB) => e.batch_uid === matr.id_alumno)} />
                    </td>
                    <td width='3%' align='center'>
                        <BbIndicadorEnroladoVisible enrolamientoBB={this.state.enrolamientoBB
                                .filter((e: IEnrolamientoBB) => e.batch_uid === matr.id_alumno)} />
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
                                <tr>
                                    <td colSpan={9} align='center' className='bg-secondary'>
                                        Enrolamiento de Estudiantes
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} align='center'>Calif.</td>
                                    <td rowSpan={2} align='center'>Alumno ID</td>
                                    <td rowSpan={2} align='center'>Alumno</td>
                                    <td rowSpan={2} align='center'>#Script</td>
                                    <td colSpan={3} align='center'>sinfo</td>
                                    <td colSpan={2} align='center'>BB</td>
                                </tr>
                                <tr>
                                    <td align='center' title='Retiro'>R</td>
                                    <td align='center' title='Deuda'>D</td>
                                    <td align='center' title='Matriculable'>M</td>
                                    <td align='center' title='Enrolado'>
                                        <i className="fas fa-user-check"></i>
                                    </td>
                                    <td align='center' title='Visible'>
                                        <i className="far fa-chalkboard-teacher"></i>
                                    </td>
                                </tr>

                            </thead>
                            <tbody>
                                {body}
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