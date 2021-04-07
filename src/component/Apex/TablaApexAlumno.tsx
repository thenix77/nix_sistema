import React, { Component, Fragment } from 'react'
import { ScriptAlumno } from '../../lib/scripts'
import { IPublicAlumno } from '../../models/public/alumnos.model'
import AlertXNo from '../alert/AlertXNo'
import AlertYesNo from '../alert/AlertYesNo'


interface IProps {
    enrolamientos: IPublicAlumno[]
}

interface IState {
    status: boolean
    enrolamientos: IPublicAlumno[]
}

export default class TablaApexAlumno extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            status: false,
            enrolamientos:[],
        }
    }

    async componentDidMount() {

         this.setState({
             enrolamientos: Object.assign(this.state.enrolamientos, this.props.enrolamientos),
             status:false
         })
    }

    render() {
        const tbody = this.state.enrolamientos.map((alumno: IPublicAlumno, i: number) => {
        return (
            <tr key={'alumnocurso-' + i.toString()} 
                 
            >
                <td align='justify' style={{}}>
                    {
                        ScriptAlumno(alumno).map((s,i) => {
                            return(
                                <div style={{fontSize:'small'}}>
                                    {s.script}
                                </div>
                            )
                        })
                            
                    
                    }    
                </td>
                <td>
                    { alumno.course_id}
                </td>
                <td align='center' title='Deuda'> { alumno.deuda}</td>
                <td align='center' title='Retirado'> 
                    {
                        <AlertXNo status={alumno.condicion_acad === 'Retirado' ? 'Y':'N'} />
                     }
                </td>
                <td>
                    <AlertYesNo status={alumno.matriculable} />
                </td>
                <td align='center' title='Enrolado'> 
                    <AlertYesNo status={ alumno.usuarioenrolado} />
                </td>
                <td align='center' title='visible'>
                    <AlertYesNo status={ alumno.usuariovisiblecurso} />
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
                            <td rowSpan={2} align='center' width='20%' className='align-middle'>IdCurso</td>
                            <td colSpan={3} align='center' width='3%'>Sinfo</td>
                            <td colSpan={4} align='center' width='3%'>BB</td>
                        </tr>
                        <tr className='bg-primary text-white text-bold'>
                            <td><span title='Deuda'>D</span></td>
                            <td><span title='Retirado'>R</span></td>
                            <td><span title='Matriculable'>M</span></td>
                            <td><i className="fas fa-chalkboard" title='Usuario Enrolado'></i></td>
                            <td><i className="fal fa-chalkboard-teacher" title='Usuario Visible'></i></td>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
