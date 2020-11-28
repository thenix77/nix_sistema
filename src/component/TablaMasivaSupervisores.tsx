import React, { Component, Fragment } from 'react'
import { IBbSinfo } from '../models/bbsinfo'
import { removeDuplicatesSupBBSinfo , removerDuplicadosSupervisores} from '../lib/source'
import { ISupervisores } from '../models/zonal.sinfo'

interface IProps{
    bbSinfoMatriculados: IBbSinfo[]
    supervisores:ISupervisores[]
}

interface IState { }

export default class TablaMasivaSupervisores extends Component<IProps,IState> {
    render() {
        let bbSinfoMatriculados: IBbSinfo[] = []
        bbSinfoMatriculados = removeDuplicatesSupBBSinfo(this.props.bbSinfoMatriculados)

        
        let tbodyHtml
        let cursoSupervisor: ISupervisores[] = []
        cursoSupervisor = this.props.supervisores.filter(sup => sup.zonal === bbSinfoMatriculados[0].zonal)
        
        bbSinfoMatriculados.filter(bsm => bsm.supregistrado === 'Y').map((c: IBbSinfo, i:number) => {
            return (
                 tbodyHtml = cursoSupervisor.map((sup: ISupervisores, i: number) => {
                return (
                    <tr key={cursoSupervisor[i].First +'-' + i.toString()}>
                            <td align='center'>{sup.zonal}</td>
                            <td align='center'>{bbSinfoMatriculados[0].cursoid}</td>
                            <td align='center'>{sup.First}</td>
                            <td align='justify'>
                                ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{c.cursoid} externalId:{sup.name} Sup
                            </td>
                    </tr>
                 )
            }) 
             )      
        })
               
           
        
        
        const tbodyHtmlEnr = bbSinfoMatriculados
            .filter(bsm => bsm.supregistrado === 'Y')
            .map((bsm: IBbSinfo, i: number) => {
                return (
                    <tr  key={bsm.supregistrado +'-E-' + i.toString()}>
                        <td align='center'>{bsm.supregistrado}</td>
                        <td align='center'>{bsm.cursoid}</td>
                        <td align='center'>SUPERVISOR0{(i+1).toString()}</td>
                        <td align='center'>
                            SUPERVISOR ENROLADO
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
                            <td width='15%' align='center'>Sup</td>
                            <td width='60%' align='center'>Script - Enrolar - Supervisor</td>
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
