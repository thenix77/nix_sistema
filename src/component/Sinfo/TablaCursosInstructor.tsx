import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB, IVSEnrolamiento } from '../../models/enrolamiento'
import BBIndicadorInstructor from '../alert/BBIndicadorInstructor'

interface IState{
    status: boolean
    enrolamientoBB:IEnrolamientoBB[]
}


interface IProps{
    enrolamiento:IVSEnrolamiento[]
}

export default class TablaCursosInstructor extends Component<IProps, IState> {
   

    render() {

        const body = this.props.enrolamiento.map((matr: IVSEnrolamiento, index: number) => {
            return (
                <tr key={matr.id_curso +'-'+index}>
                    <td width='5%' align='center'
                        className={matr.calificable === 'N' ? 'bg-danger' : ''}    
                    >
                        {matr.calificable}
                    </td>
                    <td width='15%' align='center'>{ matr.id_curso} </td>
                    <td width='20%' align='justify'>{matr.id_alumno} </td>
                    <td>
                        {(matr.id_alumno) ?
                            <>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{matr.id_curso} externalId:{matr.id_alumno} BB_Facilitador
                            </>
                            : 
                            <></>

                        }
                        
                    </td>
                    <td width='5%' align='center'>
                        <BBIndicadorInstructor enrolamientoBB={[]} />
                    </td>
                </tr>
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped' style={{fontSize:'x-small'}}>
                    <thead>
                        <tr>
                            <td colSpan={5} align='center' className='bg-purple'>
                                Enrolamiento Instructores
                            </td>
                        </tr>
                        <tr>
                            <td align='center'>Calf.</td>
                            <td align='center'>Curso</td>
                            <td align='center'>Instructor</td>
                            <td></td>
                            <td align='center'>BB</td>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
