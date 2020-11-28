import React, { Component, Fragment } from 'react'
import { AlumnoCorreo } from '../lib/source'
import { IEnrolamientoApex, IEnrolamientoBB } from '../models/enrolamiento'


interface IProps{
    matApex: IEnrolamientoApex[]
    matBB: IEnrolamientoBB[]
}

interface IState{}

export default class TablaMasivaAlumno extends Component<IProps, IState> {
    
    render() {
     
        const tbodyHtml = this.props.matApex.map((apex: IEnrolamientoApex, i: number) => {
            return (
                
                    (this.props.matBB.filter(s => s.batch_uid === apex.id_alumno && s.course_id === apex.cursoid)
                            .length === 0 )?
                    <tr key={apex.id_alumno+'-'+ apex.cursoid+'-E-'+i.toString()}>
                        <td align='center'>N</td>
                        <td align='center'>{apex.cursoid}</td>
                        <td align='justify'>{ apex.id_alumno}</td>             
                        <td>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{apex.cursoid} userName:{AlumnoCorreo(apex.id_alumno)} S    
                        </td>  
                    </tr>
                    :
                    <></>
            )
        })
        
        const tbodyHtmlEnr = this.props.matBB.map((bsm: IEnrolamientoBB, i: number) => {
            return(
            <tr key={bsm.batch_uid+'-'+ bsm.course_id +'-NE-'+i.toString()}>
                <td align='center'>{ bsm.usuariovisiblecurso}</td>
                <td align='center'>{bsm.course_id}</td>
                <td align='center'>{ bsm.batch_uid}</td>                
                <td align='center'>
                    Enrolado
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
                            <td width='15%' align='center'>ID estudiante</td>
                            <td width='60%' align='center'>Script - Enrolar - Studiante</td>
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
