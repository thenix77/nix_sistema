import React, { Component } from 'react'
import { IVLstCruzada } from '../models/listacruzada.sinfo'

interface IProps {
    listaCruzada: IVLstCruzada[]
}

interface IState {}

export default class TablaListaCruzada extends Component<IProps,IState> {
    render() {

         const tableBoby = this.props.listaCruzada.map((dato, i) => {
            return (
                <tr key={i}>
                    <td width='5%' align='center'>
                         { dato.tipo.toUpperCase() === 'PADRE'? 'P':'H' } 
                    </td>
                    <td width='8%' align='center'>{dato.nrc}</td>
                    <td width='27%'>{dato.cursoid}</td>
                    <td width='60%' align='left'>  
                        LC_PUT-Crear $token $URL_sitio courseId:{dato.lc_curso} courseId:{dato.cursoid} <br />
                        CURSO_PATCH-Periodo $token $URL_sitio courseId:{dato.cursoid} externalId:202020
                    </td>
                </tr>
            )
        })

        return (
            <>
            <table className='table table-bordered table-striped' style={{ fontSize: 'x-small' }} width='100%'>
                <thead>
                    <tr >
                        <th align='center'>N</th>
                        <th align='center'>NRC</th>
                        <th align='center'>CursoID</th>
                        <th align='center'>Script - LISTA CRUZADA - CLONAR - Enlazar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align='center'>Clo</td>
                        <td align='center'>{ this.props.listaCruzada[0].lc }</td>
                        <td>{ this.props.listaCruzada[0].lc_curso }</td>
                        <td align='left'>
                            CLONAR_POST-Curso $token $URL_sitio courseId:{this.props.listaCruzada[0].patron} {this.props.listaCruzada[0].lc_curso} <br />
                            CURSO_PATCH-Periodo $token $URL_sitio courseId:{this.props.listaCruzada[0].lc_curso} externalId:202020
                        </td>
                    </tr>
                    {tableBoby}
                </tbody>
            </table>
        </>
        )
    }
}
