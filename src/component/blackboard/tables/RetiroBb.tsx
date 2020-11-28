import React, { Component } from 'react'
import { IEnrolamientoBB } from '../../../models/enrolamiento'
import {removerDuplicadosEstudiantesBB} from '../../../lib/source'

interface IProps{
    enrolamientos:IEnrolamientoBB[]
}

interface IState {}

export default class RetiroBb extends Component<IProps, IState> {
    
    render() {

        let users: IEnrolamientoBB[] = []
        users = removerDuplicadosEstudiantesBB(this.props.enrolamientos)

        const tbodyHtml = users.filter(c => c.role === 'S').map((user: IEnrolamientoBB, i: number) => {
            return (
                <tr key={user.batch_uid+'-'+i.toString()}>
                    <td align='center'>{user.batch_uid}</td>
                    <td align='justify'>{user.usuario}</td>
                    <td align='justify'>
                        USUARIO_PATCH-VisibleYN $token $URL_sitio externalId:{user.batch_uid} Yes
                    </td>
                </tr>
            )
        })

        return (
            <table className='table table-bordered table-striped table-sm w-100'>
                <thead>
                    <tr className='font-weight-bold'>
                        <td align='center' width='15%'>id</td>
                        <td align='center' width='35%'>studiantes</td>
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
