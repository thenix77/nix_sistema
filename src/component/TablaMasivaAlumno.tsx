import React, { Component, Fragment } from 'react'
import { AlumnoCorreo } from '../lib/source'
import { IEnrolamiento } from '../models/enrolamiento'
import { IVMatricula } from '../models/matricula.sinfo'

interface IProps{
    apexMatriculados: IVMatricula[]
    bbMatriculados: IEnrolamiento[]
}

interface IState{}

export default class TablaMasivaAlumno extends Component<IProps, IState> {
    
    render() {

        const tbodyHtml = this.props.apexMatriculados.filter(apex => apex.calificable === 'Y').map((apex: IVMatricula, index: number) => {
            return (
                this.props.bbMatriculados
                            .filter(bb => bb.batch_uid === apex.id_alumno && bb.course_id === apex.cursoid).length === 0 ?
                    <tr key={apex.id_alumno + '-' + index.toString()}>
                        <td align='center'>{apex.nrc} </td>
                        <td align='center'> {apex.cursoid}</td>
                        <td align='center'>{apex.id_alumno}</td>
                        <td>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{apex.cursoid} userName:{AlumnoCorreo(apex.id_alumno)} S
                        </td>
                    </tr>
                :
                <Fragment key={apex.id_alumno + '-' + index.toString()}>
                    
                </Fragment>
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped' width='100%' style={{fontSize:'x-small'}}>
                    <thead>
                        <tr>
                            <td width='10%' align='center'>Nrc </td>
                            <td width='15%' align='center'>Curso</td>
                            <td width='15%' align='center'>ID estudiante</td>
                            <td width='60%' align='center'>Script - Enrolar - Studiante</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyHtml}
                    </tbody>
                </table>
                
            </Fragment>
        )
    }
}
