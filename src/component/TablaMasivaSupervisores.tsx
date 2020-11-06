import React, { Component, Fragment } from 'react'
import { IEnrolamiento } from '../models/enrolamiento'
import { ICursoSupervisor} from '../models/zonal.sinfo'


interface IProps{
    supervisores: ICursoSupervisor[]
    bbMatriculados: IEnrolamiento[]
}

interface IState { }

export default class TablaMasivaSupervisores extends Component<IProps,IState> {
    render() {

         const tbodyHtml = this.props.supervisores.map((apex: ICursoSupervisor, index: number) => {
            return (
                
                this.props.bbMatriculados.filter(bb => bb.batch_uid === apex.correo  && bb.course_id === apex.curso).length === 0 ?
                    <tr key={apex.supervisor + '-' + apex.curso}>
                                <td align='center'>{apex.supervisor} </td>
                                <td align='center'> {apex.curso}</td>
                                <td align='center'>{apex.zonal}</td>
                                <td>
                                    ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{apex.curso} userName:{apex.correo} Sup
                        </td>
                    </tr>
                    :
                    <Fragment key={apex.supervisor + '-' + apex.curso} >
                        
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
