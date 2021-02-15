import React, { Component, Fragment } from 'react'

import { AlumnoCorreo } from '../../lib/source'
import { IVSinfoMatricula } from '../../models/matricula.sinfo'


interface IState{
  
}

interface IProps{
    matriculas:IVSinfoMatricula[]
}
export default class TablaCursosEnrolamiento extends Component<IProps, IState> {
    render() {

        const body = this.props.matriculas.map((matr: IVSinfoMatricula, index: number) => {
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
                        ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{matr.id_curso} userName:{AlumnoCorreo(matr.id_alumno)} S
                    </td>
                    <td width='5%' align='center'>
                        
                    </td>
                </tr>
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped' style={{fontSize:'xx-small'}}>
                    <thead>
                        <tr>
                            <td colSpan={5} align='center' className='bg-secondary'>
                                Enrolamiento de Estudiantes
                            </td>
                        </tr>
                        <tr>
                            <td align='center'>Calif.</td>
                            <td align='center'>Curso ID</td>
                            <td align='center'>Curso</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
