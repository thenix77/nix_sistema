import React, { Component } from 'react'
import { IVMatricula } from '../models/matricula.sinfo'

interface IProps {
    cursos:IVMatricula[] 
}

interface IState {

}


export default class TablaInstructor extends Component<IProps, IState> {
    render() {
        const tableBoby = this.props.cursos.map((curso, i) => {
            return (
                <tr key={i}>
                    <td width='5%'  align='center'>{i+1}</td>
                    <td width='8%' align='center'>{curso.id_inst}</td>
                    <td width='27%'>{ curso.instructor}</td>
                    <td width='60%' align='left'> 
                        {(curso.instructor !== '') ?
                            <>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{curso.cursoid}  externalId:{curso.id_inst} BB_FACILITATOR </>:
                            ''
                        }
                    </td>
                </tr>
            )
        })
 

        return (
            <table className='table table-bordered table-striped' style={{ fontSize: 'x-small' }} width='100%'>
                <thead>
                    <tr >
                        <th align='center'>N</th>
                        <th align='center'>ID Instructor</th>
                        <th align='left'>Instructor</th>
                        <th align='left'>Script - Enrolar - Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBoby}
                </tbody>
            </table>
        )
    }
}
