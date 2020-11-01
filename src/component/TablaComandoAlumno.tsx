import React, { Component, Fragment } from 'react'
import { AlumnoCorreo } from '../lib/source'
import { IBBCursosMatriculados, IVMatricula } from '../models/matricula.sinfo'


interface IProps {
    Matriculados: IVMatricula[]
    BBMatriculados:any
}

interface IState {}

export default class TablaComandoAlumno extends Component<IProps, IState> {
    render() {

        const tbodyHtml = this.props.Matriculados.map((mat, index) => {
            return (
                <tr key={mat.id_alumno + '-' + index}>
                    <td align='center'>{mat.nrc}</td>
                    <td align='center'> {mat.cursoid}</td>
                    <td align='center'>{mat.id_alumno}</td>
                    <td>
                        ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{mat.cursoid} userName:{AlumnoCorreo(mat.id_alumno)} S
                    </td>
                </tr>
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
