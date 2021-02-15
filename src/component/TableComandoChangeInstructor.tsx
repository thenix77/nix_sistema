import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB } from '../models/enrolamiento'
import { IInstructor } from '../models/instructor'

interface IProps{
    enrolamiento: IEnrolamientoBB[]
    instructor: IInstructor[]
}

export default class TableComandoChangeInstructor extends Component<IProps> {
    render() {
        
        const tbodyHtml = this.props.enrolamiento.filter(enr => enr.batch_uid !== '').map((enr: IEnrolamientoBB, index: number) => {
            return (
                    <tr key={enr.batch_uid + '-' + index.toString()} >
                        <td align='center'>{enr.cursocerrado}</td>
                        <td align='center'>{enr.batch_uid}</td>
                        <td align='center'>{enr.course_id}</td>
                        <td align='justify'>
                            ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{enr.course_id} externalId:{enr.batch_uid} No
                        </td>
                    </tr>
            )
        })

      
        const tbodyInst = this.props.instructor.map((inst:IInstructor,index:number )=> {
            return (
                    <tr key={inst.id +'-' +index.toString()} >
                        <td align='center'>ENR</td>
                        <td align='justify'>{inst.apellido + ', ' + inst.nombre}</td>
                        <td align='center'>
                            {this.props.enrolamiento[0].course_id ? this.props.enrolamiento[0].course_id : ''}
                        </td>
                        <td align='justify'>
                            {(this.props.enrolamiento.filter(e => e.course_id !== '').length > 0)?
                            <span>
                                ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{this.props.enrolamiento[0].course_id} externalId:{inst.id} BB_FACILITATOR
                            </span>
                            :
                            <span>
                                NO EXISTE CURSO
                            </span>
                            }
                        </td>
                    </tr>
            )
        })


        return (
            <Fragment>
                <table className='table table-bordered table-striped ' style={{fontSize:'x-small'}}>
                    <thead className='bg-secondary text-white'>
                        <tr>
                            <td width='5%'  align='center'>N</td>
                            <td width='20%' align='center'>Instructor</td>
                            <td width='15%' align='center'>Curso</td>
                            <td width='50%' align='center'> #script-inhabilitar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyHtml}
                        {tbodyInst}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
