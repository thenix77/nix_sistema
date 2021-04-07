import React, { Component, Fragment } from 'react'
import { ScriptInstructorEnrolar } from '../../lib/scripts'
import { IPublicInstructor } from '../../models/public/instructores.model'
import AlertYesNo from '../alert/AlertYesNo'

interface Props {
    instructores:IPublicInstructor[]
}
interface State {
    status: boolean
    instructores:IPublicInstructor[]
}

export default class TablaApexInstructor extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            status: false,
            instructores:[]
        }
    }

    async componentDidMount() {

         this.setState({
             instructores: Object.assign(this.state.instructores, this.props.instructores),
             status:false
         })
    }

    render() {

        const body = this.state.instructores.map((instructor: IPublicInstructor, i: number) => {
            return (
                <tr key={'instructor-'+instructor.id_inst+'-'+i}>
                    <td>
                        {ScriptInstructorEnrolar(instructor)}
                    </td>
                    <td align="center">
                        {instructor.nrc}
                    </td>
                    <td align="center">
                        {instructor.id_inst}
                    </td>
                    <td align="center">{ instructor.inicio}</td>
                    <td align="center">{instructor.fin}</td>
                    <td align="center" title='Curso Calificable'>
                        <AlertYesNo status={instructor.calificable} />
                    </td>
                    <td align="center" title='Instructor Asignable'>
                        <AlertYesNo status={instructor.matriculable} />
                    </td>
                    <td align="center" title='Instructor Enrolado'>
                        <AlertYesNo status={instructor.usuarioenrolado} />
                    </td>
                    <td align="center" title='Instructor Visible'>
                        <AlertYesNo status={instructor.usuariovisiblecurso} />
                    </td>
                </tr>
            )
        })


        return (
            <Fragment>
                <table className='table table-bordered table-striped tabla-sm' style={{fontSize:'small'}}>
                    <thead >
                        <tr className='bg-primary text-white text-bold' >
                            <td rowSpan={2} align='center' className='align-middle' >Script</td>
                            <td rowSpan={2} align='center' width='5%' className='align-middle' >nrc</td>
                            <td rowSpan={2} align='center' width='7%' className='align-middle'>Id Instructor</td>
                            <td rowSpan={2} align='center' width='7%' className='align-middle'>Inicio</td>
                            <td rowSpan={2} align='center' width='7%' className='align-middle'>Fin</td>
                            <td colSpan={2} align='center' width='3%'>APEX</td>
                            <td colSpan={2} align='center' width='3%'>BB</td>
                        </tr>
                        <tr className='bg-primary text-white text-bold'>
                            <td title='Curso Calificable'>C</td>
                            <td title='Instructor Asignable'>M</td>
                            <td><i className="fas fa-chalkboard" title='Usuario Enrolado'></i></td>
                            <td><i className="fal fa-chalkboard-teacher" title='Usuario Visible'></i></td>
                        </tr>
                    </thead>
                    <tbody>
                        { body}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
