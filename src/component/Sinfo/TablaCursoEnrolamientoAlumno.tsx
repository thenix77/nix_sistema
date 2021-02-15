import React, { Component, Fragment } from 'react'
import { AlumnoCorreo } from '../../lib/source'
import { IEnrolamientoBB, IVSEnrolamiento } from '../../models/enrolamiento'
import ApiJson from '../../ApiJson.json'
import BbIndicadorEnrolado from '../alert/BbIndicadorEnrolado'
import BbIndicadorEnroladoVisible from '../alert/BbIndicadorEnroladoVisible'
import '../../component/css/app.css'

interface IProps{
    enrolamiento: IVSEnrolamiento[]

}

interface IState{
    enrolamientoBB: IEnrolamientoBB[]
    status:boolean
}


export default class TablaCursoEnrolamientoAlumno extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            status: false,
            enrolamientoBB:[]
        }
    }

    async componentDidMount() {

         this.setState({
             status: false,
         })
         
         await  fetch(`${ApiJson.Api}/BB/Enrolamiento/periodo/${this.props.enrolamiento[0].periodo}/idalumno/${this.props.enrolamiento[0].id_alumno}`,
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
                    <td width='15%' align='center'>{matr.id_curso} </td>
                    <td width='20%' align='justify'>{ matr.curso} </td>
                    <td>
                        {
                            this.state.enrolamientoBB
                                .filter((e: IEnrolamientoBB) => e.course_id === matr.id_curso).length === 0 &&
                                
                                matr.deuda === 'N'?
                                    <span>
                                        ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} S    
                                    </span>
                                :
                                    <></>
                           
                        }
                        {
                            this.state.enrolamientoBB
                                .filter((e: IEnrolamientoBB) => e.course_id === matr.id_curso && e.usuariovisible === 'Y').length > 0 &&
                                
                                matr.deuda === 'Y' ?
                                    <span>
                                        ENROLAMIENTO_PATCH-Visibilidad $toke $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} No   
                                    </span>
                                :
                                    <></>
                           
                        }
                        {
                            this.state.enrolamientoBB
                                .filter((e: IEnrolamientoBB) => e.course_id === matr.id_curso && e.usuariovisible === 'N').length > 0 &&
                                
                                matr.deuda === 'N' ?
                                    <span>
                                        ENROLAMIENTO_PATCH-Visibilidad $toke $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} Yes   
                                    </span>
                                :
                                    <></>
                           
                        }
                        
                    </td>
                    <td width='5%' align='center'>
                        <BbIndicadorEnrolado enrolamientoBB={this.state.enrolamientoBB
                                            .filter((e:IEnrolamientoBB)=> e.course_id === matr.id_curso)
                        } />  
                    </td>
                    <td width='5%' align='center'>
                        <BbIndicadorEnroladoVisible enrolamientoBB={this.state.enrolamientoBB
                                            .filter((e:IEnrolamientoBB)=> e.course_id === matr.id_curso)
                        } /> 
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
                                    <td colSpan={6} align='center'
                                        className={ this.props.enrolamiento[0].deuda === 'Y' ? 'bg-danger' : 'bg-secondary'}
                                    >
                                        Enrolamiento de Estudiantes
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2} align='center'>Calif.</td>
                                    <td rowSpan={2} align='center'>Curso ID</td>
                                    <td rowSpan={2} align='center'>Curso</td>
                                    <td rowSpan={2} align='center'>#script</td>
                                    <td colSpan={2} align='center'>BlackBoard</td>
                                </tr>
                                    <tr>
                                        <td align='center'><i className="fas fa-user-check" title='Enrolamiento'></i></td>
                                        <td align='center'><i className="far fa-chalkboard-teacher" title='usuario visible'></i></td>
                                    </tr>
                            </thead>
                            <tbody>
                            { body}
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