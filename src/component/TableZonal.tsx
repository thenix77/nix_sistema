import React, { Component } from 'react'
import { IVMatricula } from '../models/matricula.sinfo'
import { IZonal } from '../models/zonal.sinfo'



interface IProps {
    zonal: IZonal[],
    curso:IVMatricula
}

interface IState {}

export default class TableZonal extends Component<IProps,IState> {
    render() {
        const tableBoby = this.props.zonal.filter(zonal => zonal.nrc.includes(this.props.curso.nrc)).map((dato, i) => {
            return (
                <tr key={i}>
                    <td width='5%'  align='center'>{i+1}</td>
                    <td width='8%' align='center'>{dato.supervisor.toLowerCase()}</td>
                    <td width='27%'>{dato.correo}</td>
                    <td width='60%' align='left'>  
                        ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{this.props.curso.cursoid} userName:{dato.correo} Sup
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
                                        <th align='center'>ZONAL</th>
                                        <th align='left'>CORREO</th>
                                        <th align='center'>#Script - Enrolar - Zonal:
                                            {this.props.zonal.filter(zonal => zonal.nrc.includes(this.props.curso.nrc))[0].zonal}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBoby}
                                </tbody>
                </table>

        </>
        )}
}
