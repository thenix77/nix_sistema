import React, { Component, Fragment } from 'react'
import { IEnrolamiento } from '../models/enrolamiento'
import { IVMatricula } from '../models/matricula.sinfo'

interface IProps {
    apexMatriculados: IVMatricula[]
    bbMatriculados: IEnrolamiento[]
}

interface IState {}

export default class TablaMasivaInstructor extends Component<IProps,IState> {
    render() {

        const tbodyHtml = this.props.apexMatriculados.filter(apex => apex.calificable === 'Y')
                                                    .map((apex: IVMatricula, index: number) => {
            return (
                this.props.bbMatriculados.filter(bb =>  bb.course_id === apex.cursoid).length === 0 ?
                    <tr key={apex.id_inst + '-' + apex.curso}>
                        <td align='center'> {apex.nrc}  - {this.props.bbMatriculados.filter(bb => bb.batch_uid === apex.id_inst && bb.course_id === apex.cursoid).length }  </td>
                        <td align='center'> {apex.cursoid}  </td>
                        <td align='center'> {apex.id_inst}  </td>
                        <td>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{apex.cursoid} externalId:{apex.id_inst} BB_FACILITATOR
                        </td>
                    </tr>
                    : 
                    <Fragment key={apex.id_inst + '-' + apex.curso}>
                        
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
                            <td width='15%' align='center'>ID INSTRUCTOR</td>
                            <td width='60%' align='center'>Script - Enrolar - Instructor</td>
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
