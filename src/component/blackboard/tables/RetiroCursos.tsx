import React, { Component, Fragment } from 'react'
import { IRetirados } from '../../../models/retirados'


interface IProps{
    enrolamientos:IRetirados[]
}

interface IState{}

export default class RetiroCursos extends Component<IProps,IState> {
    render() {

        const htmlBody = this.props.enrolamientos.map((user: IRetirados, i: number) => {
            return (
                <tr key={user.id_alumno+'-'+user.course_id}>
                    <td align='center'>{user.id_alumno}</td>
                    <td align='center'>{user.course_id}</td>
                    <td align='justify'>
                        ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{user.course_id}  externalId:{user.id_alumno} No
                    </td>
                </tr>
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped w-100'>
                    <thead>
                        <tr className='font-weight-bold'>
                            <td align='center' width='15%'>Id </td>
                            <td align='center' width='25%'>Curso</td>
                            <td align='center' width='60%'>Script - {this.props.enrolamientos.length} </td>
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
