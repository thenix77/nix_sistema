import React, { Component } from 'react'
import { IVMatricula } from '../models/matricula.sinfo'
import { ITutoria } from '../models/tutoria.sinfo'
import { AlumnoCorreo} from '../lib/source'

interface IProps {
    cursos: IVMatricula[]
    tutoria:ITutoria[]
}

interface IState {}

export default class TablaAlumnos extends Component<IProps,IState> {
    render() {
        console.log(this.props.cursos);
         const tableBoby = this.props.cursos.map((curso, i) => {
            return (
                <tr key={i}  >
                    <td width='5%' align='center'>{i + 1}</td>
                    <td width='8%' align='center'>{ curso.id_alumno}</td>
                    <td width='27%' align='left'>
                        {this.props.tutoria.filter(tutor => tutor.id_alumno.includes(curso.id_alumno))[0].nombre || ''}
                    </td>
                    <td width='60%' align='left'>  
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
                        <th align='center'>ID Alumno</th>
                        <th align='center'>Alumno</th>
                        <th align='center'>#Script</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBoby}
                </tbody>
            </table>
        )
    }
}
