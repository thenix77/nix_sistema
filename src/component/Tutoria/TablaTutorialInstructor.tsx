import React, { Component, Fragment } from 'react'
import { IPublicInstructor } from '../../models/public/instructores.model'
import AlertYesNo from '../alert/AlertYesNo'


interface IProps {
    instructores: IPublicInstructor[]
}

interface IState {
    instructores: IPublicInstructor[]
}

export default class TablaTutorialInstructor extends Component<IProps,IState> {

    constructor(props:IProps){
        super(props)

        this.state={
            instructores:[]
        }
    }

    componentDidMount(){
        this.setState({
            instructores:Object.assign(this.state.instructores, this.props.instructores)
        })
    }

    render() {

        const body = this.state.instructores.map((instructor:IPublicInstructor,i:number)=>{
            return(
                <tr key={i}>
                    <td align='center'> {instructor.course_id} </td>
                    <td align='center'> {instructor.id_inst} </td>
                    <td align='justify'> {instructor.instructor} </td>
                    <td align='center'> {instructor.inicio} </td>
                    <td align='center'> {instructor.fin} </td>
                    <td align='center' title='Enrolable'> 
                        <AlertYesNo status={instructor.matriculable} />
                    </td>
                    <td align='center' title='Curso Creado'> 
                        <AlertYesNo status={instructor.cursocreado} />
                    </td>
                    <td align='center' title='Enrolado'> 
                        <AlertYesNo status={instructor.usuarioenrolado} />
                    </td>
                    <td align='center' title='visible'>
                        <AlertYesNo status={instructor.usuariovisiblecurso} />    
                    </td>
                </tr>
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered table-striped table-sm ' style={{fontSize:'small'}}>
                    <thead className='table-primary text-primary text-bold' >
                        <tr>
                            <td rowSpan={2} align='center' width='20%' className='align-middle'>Curso</td>
                            <td rowSpan={2} align='center' width='10%' className='align-middle'>IdInst</td>
                            <td rowSpan={2} align='center' width=''    className='align-middle'>Instructor</td>
                            <td rowSpan={2} align='center' width='10%' className='align-middle'>Inicio</td>
                            <td rowSpan={2} align='center' width='10%' className='align-middle'>Fin</td>
                            <td align='center'>Sinfo</td>
                            <td colSpan={3} align='center'>BB</td>
                        </tr>
                        <tr>
                            <td align='center' width='3%'>E</td>
                            <td align='center'><i className="fas fa-book" title='curso creado'></i></td>
                            <td align='center'><i className="fas fa-chalkboard" title='Usuario Enrolado'></i></td>
                            <td align='center'><i className="fal fa-chalkboard-teacher" title='Usuario Visible'></i></td>
                        </tr>
                    </thead>
                    <tbody>
                        { body }
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
