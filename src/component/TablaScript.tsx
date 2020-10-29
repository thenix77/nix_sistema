import React, { Component } from 'react'
import { AlumnoCorreo } from '../lib/source'
import { IVMatricula } from '../models/matricula.sinfo'


interface IProps {
    Lista: any
}

interface IState{}

export default class TablaScript extends Component<IProps,IState> {
    render() {

        const tablaBody = this.props.Lista.map((lst:IVMatricula, i: number) => {
            return (
                <tr key={(lst.id_alumno).toString()} >
                    <td width='20%' align='center'>{lst.id_alumno}</td>
                    <td width='20%' align='center'>{lst.cursoid}</td>
                    <td width='60%'>
                        ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{lst.cursoid} userName:{AlumnoCorreo(lst.id_alumno)} S
                    </td>
                </tr>
            )
        })


        return (
            <>
                {tablaBody}
            </>
        )
    }
}
