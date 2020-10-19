import React, { Component } from 'react'
import { IVMatricula } from '../models/matricula.sinfo'

import { AlumnoCorreo } from '../lib/source'

interface IProps {
    cursos:IVMatricula[] 
}

interface IState {

}

export default class TableCursos extends Component<IProps, IState> {
   
    render() {

        const tableBoby = this.props.cursos.map((curso, i) => {
            return (
                <tr key={i}>
                    <td width='5%'  align='center'>{i+1}</td>
                    <td width='13%' align='center'>{curso.cursoid}</td>
                    <td width='27'>{curso.curso}</td>
                    <td width='55%' align='center'>  
                        ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{curso.cursoid} userName:{AlumnoCorreo(curso.id_alumno)} S
                    </td>
                </tr>
            )
        })
 

        return (
            <table className='table table-bordered table-striped' style={{ fontSize: 'x-small' }} width='100%'>
                <thead>
                    <tr >
                        <th align='center'>N</th>
                        <th align='center'>ID Curso</th>
                        <th align='center'>Curso</th>
                        <th align='center'>Script - Enrolar alumno</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBoby}
                </tbody>
            </table>
        )
    }
}
