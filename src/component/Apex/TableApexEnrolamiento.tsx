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
export default class TableApexEnrolamiento extends  Component<IProps, IState> {
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
            <tr key={alumno.curso + '-' + i} 
                 
            >
                <td align='center' className={alumno.deuda === 'N'? '': 'bg-danger'}> 
                    { alumno.batch_uid}
                </td>
                <td align='center'> { alumno.course_id}</td>
                <td align='justify' style={{}}>
                    {
                        ScriptAlumno(alumno).map((s,i) => {
                            return(
                                <div style={{fontSize:'x-small'}}>
                                    {s.script}
                                </div>
                            )
                        })
                            
                    
                    }    
                </td>
                <td align='center' title='Deuda'> { alumno.deuda}</td>
                <td align='center' title='Retirado'> 
                    <AlertXNo status={ alumno.condicion_acad} />
                </td>
                <td align='center' title='Visible BB'>
                    <AlertYesNo status={ alumno.usuariovisiblebb} />
                </td>
                <td align='center' title='Curso Creado'>
                    <AlertYesNo status={ alumno.usuariovisiblebb} />
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
                <table className='table table-bordered table-striped ' style={{fontSize:'small'}}>
                    <thead >
                        <tr className='table-secondary' >
                            <td rowSpan={2} align='center' width='8%'>Id Alumno</td>
                            <td rowSpan={2} align='center' width='20%'>IdCurso</td>
                            <td rowSpan={2} align='center' >Script</td>
                            <td colSpan={2} align='center' width='3%'>Sinfo</td>
                            <td colSpan={4} align='center' width='3%'>BB</td>
                        </tr>
                        <tr className='table-secondary'>
                            <td><span title='Deuda'>D</span></td>
                            <td><span title='Retirado'>R</span></td>
                            <td><i className="far fa-book-user" title='Visible BB'></i></td>
                            <td><i className="fas fa-book" title='Curso Creado'></i></td>
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
