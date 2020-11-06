import React, { Component, Fragment } from 'react'
import { IEnrolamiento } from '../models/enrolamiento'
import { IVMatricula } from '../models/matricula.sinfo'

interface IProps {
    apexMatriculados: IVMatricula[]
    bbMatriculados: IEnrolamiento[]
}

interface IState {}

export default class TablaMasivaCursos extends Component<IProps,IState> {
    render() {

        const tbodyHtml = this.props.apexMatriculados.filter(apex => apex.calificable ==='Y').map((apex: IVMatricula, index: number) => {
            return (
                
                this.props.bbMatriculados.filter(bb => bb.course_id === apex.cursoid).length === 0 ?
                    <tr key={index.toString() + '-' + apex.cursoid}>
                        <td align='center'>{apex.cursoid} </td>
                        <td align='center'> {apex.curso}</td>
                        <td align='center'>{apex.zonal}</td>
                        <td>
                            CLONAR_POST-Curso $token $URL_sitio courseId:{apex.patron} {apex.cursoid}
                        </td>
                    </tr>
                    :
                    <Fragment key={index.toString() + '-' + apex.cursoid} >
                        
                    </Fragment>
                    
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped' width='100%' style={{fontSize:'x-small'}}>
                    <thead>
                        <tr>
                            <td width='15%' align='center'>Nrc </td>
                            <td width='15%' align='center'>Curso</td>
                            <td width='20%' align='left'>Zonal</td>
                            <td width='50%' align='center'>Script - Clonar - Cursos</td>
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
