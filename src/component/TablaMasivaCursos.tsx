import React, { Component, Fragment } from 'react'
import { IBbSinfo } from '../models/bbsinfo'
import { removeDuplicatesCursoBBSinfo} from '../lib/source'

interface IProps {
    bbSinfoMatriculados:IBbSinfo[]
}

interface IState {}

export default class TablaMasivaCursos extends Component<IProps,IState> {
    render() {

        let bbSinfoMatriculados: IBbSinfo[] = []
        bbSinfoMatriculados = removeDuplicatesCursoBBSinfo(this.props.bbSinfoMatriculados)

        const tbodyHtml = bbSinfoMatriculados.filter(c => c.calificable === 'Y')
            .filter(curso => curso.supregistrado === 'N')
            .map((curso: IBbSinfo, i: number) => {
                return (
                    <tr key={curso.cursoid+'-'+i.toString()+'-C'}>
                        <td align='center'>{curso.calificable}</td>
                        <td align='center'>{curso.cursoid}</td>
                        <td align='center'>{curso.patron}</td>
                        <td>
                            CLONAR_POST-Curso $token $URL_sitio courseId:{curso.patron} {curso.cursoid}
                        </td>
                    </tr>
                )
            })
        
        const tbodyHtmlPer = bbSinfoMatriculados.filter(c => c.calificable === 'Y')
            .filter(curso => curso.userregistrado === 'N')
            .map((curso: IBbSinfo, i: number) => {
                return (
                    <tr key={curso.cursoid+'-'+i.toString()+'-P'}>
                        <td align='center'>{curso.instregistrado}</td>
                        <td align='center'>{curso.cursoid}</td>
                        <td align='center'>{curso.patron}</td>
                        <td align='justify'>
                            CURSO_PATCH-Periodo $token $URL_sitio courseId:{curso.cursoid} externalId:{curso.periodo}
                        </td>
                    </tr>
                )
            })
        
        const tbodyHtmlClo = bbSinfoMatriculados
            .filter(curso => curso.userregistrado === 'Y')
            .map((curso: IBbSinfo, i: number) => {
                return (
                    <tr key={curso.cursoid+'-'+i.toString()+'-P'}>
                        <td align='center'>{curso.cursoid}</td>
                        <td align='center'>{curso.cursoid}</td>
                        <td align='center'>{curso.patron}</td>
                        <td align='center'>
                            {
                                (curso.calificable === 'N')?
                                <span>NO CALIFICABLE</span>
                            :
                                <span>CURSO CLONADO</span>
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
                            <td width='6%' align='center'> clonado </td>
                            <td width='17%' align='center'> Curso</td>
                            <td width='17%' align='left'>   Patron</td>
                            <td width='50%' align='center'>Script - Clonar - Cursos</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyHtml}
                        {tbodyHtmlPer}
                        {tbodyHtmlClo}
                    </tbody>
                </table>
                
            </Fragment>
        )
    }
}
