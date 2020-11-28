import React, { Component, Fragment } from 'react'
import { removeDuplicatesInstBBSinfo } from '../lib/source'
import { IEnrolamientoApex, IEnrolamientoBB } from '../models/enrolamiento'


interface IProps {
    matApex: IEnrolamientoApex[]
    matBB: IEnrolamientoBB[]
}

interface IState {}

export default class TablaMasivaInstructor extends Component<IProps,IState> {
    render() {
       
        const tbodyHtml = this.props.matApex.map((apex: IEnrolamientoApex, i: number) => {
            return (
                (this.props.matBB.filter(c => c.course_id === apex.cursoid && c.batch_uid === apex.id_inst)
                    .length === 0) ?    

                    <tr key={apex.id_inst+'-EI-'+i.toString()}>
                        <td align='center'>N</td>
                        <td align='center'>{apex.cursoid}</td>
                        <td align='center'>{apex.id_inst}</td>
                        {(apex.id_inst) ?
                        <td align='justify'>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{apex.cursoid} externalId:{apex.id_inst} BB_FACILITATOR
                        </td>
                            :
                        <td align='center'>
                                SIN INSTRUCTOR
                        </td>
                        }
                    </tr> :
                    <></>
                )                    
            })
        
        const tbodyHtmlEnr = this.props.matBB.map((bsm: IEnrolamientoBB, i: number) => {
                return (
                    <tr key={bsm.batch_uid+'-E-'+i.toString()}>
                        <td align='center'>{bsm.usuariovisiblecurso}</td>
                        <td align='center'>{bsm.course_id}</td>
                        <td align='center'>{bsm.batch_uid}</td>
                        <td align='center'>
                            {(bsm.batch_uid === '') ?
                                <span>SIN INSTRUCTOR</span>
                                :
                                <span>INSTRUCTOR ENROLADO - {bsm.usuario}</span>

                            }
                        </td>   
                    </tr>
                )                    
            })
        
        
        return (
            <Fragment>
                <table className='table table-bordered table-striped' width='100%' style={{fontSize:'x-small'}}>
                    <thead>
                        <tr>
                            <td width='10%' align='center'>Enrolado </td>
                            <td width='15%' align='center'>Curso</td>
                            <td width='15%' align='center'>ID Instructor</td>
                            <td width='60%' align='center'>Script - Enrolar - Instructor</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyHtml}
                        {tbodyHtmlEnr}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
