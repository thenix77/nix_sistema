import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB } from '../../../models/enrolamiento'

interface IProps{
    enrolamientos:IEnrolamientoBB[]
}

interface IState{}

export default class RetiroCursos extends Component<IProps,IState> {
    render() {

        const htmlBody = this.props.enrolamientos.filter(c => c.role === 'S').filter(e => e.usuariovisiblecurso === 'Y')
            .map((user: IEnrolamientoBB, i: number) => {
            return (
                <tr key={user.batch_uid+'-'+user.course_id}>
                    <td align='center'>{user.batch_uid}</td>
                    <td align='center'>{user.course_id}</td>
                    <td align='justify'>
                        ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{user.course_id}  externalId:{user.batch_uid} No
                    </td>
                </tr>
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped w-100'>
                    <thead>
                        <tr className='font-weight-bold'>
                            <td align='center' width='15%'>ID</td>
                            <td align='center' width='25%'>Curso</td>
                            <td align='center' width='60%'>Script - {this.props.enrolamientos.filter(c => c.role === 'S').length} </td>
                        </tr>
                    </thead>
                    <tbody style={{fontSize:'x-small'}}>
                        {htmlBody}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
