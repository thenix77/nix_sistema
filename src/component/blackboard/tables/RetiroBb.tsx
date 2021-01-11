import React, { Component } from 'react'
import { removerDuplicadosEstudiantesRetirados} from '../../../lib/source'
import { IRetirados } from '../../../models/retirados'

interface IProps{
    enrolamientos:IRetirados[]
}

interface IState {}

export default class RetiroBb extends Component<IProps, IState> {
    
    render() {

        let users: IRetirados[] = []
        users = removerDuplicadosEstudiantesRetirados(this.props.enrolamientos)

        const tbodyHtml = users.map((user: IRetirados, i: number) => {
            return (
                <tr key={user.id_alumno+'-'+i.toString()}>
                    <td align='center'>{user.id_alumno}</td>
                    <td align='justify'>{user.nombre}</td>
                    <td align='center'>{new Date(user.fretiro).getDate()+'/'+new Date(user.fretiro).getMonth()+'/'+new Date(user.fretiro).getFullYear()}</td>
                    <td align='justify'>
                        USUARIO_PATCH-VisibleYN $token $URL_sitio externalId:{user.id_alumno} No
                    </td>
                </tr>
            )
        })

        return (
            <table className='table table-bordered table-striped table-sm w-100'>
                <thead>
                    <tr className='font-weight-bold'>
                        <td align='center' width='10%'>id</td>
                        <td align='center' width='30%'>studiantes</td>
                        <td align='center' width='10%'>F Retiro</td>
                        <td align='center' width='50%'>script - {users.length}</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:'x-small'}}>
                    {tbodyHtml}
                </tbody>
            </table>
        )
    }
}
