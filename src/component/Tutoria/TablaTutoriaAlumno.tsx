import React, { Component, Fragment } from 'react'
import { IPublicAlumno } from '../../models/public/alumnos.model'
import AlertYesNo from '../alert/AlertYesNo'

interface IProps {
    enrolamientos: IPublicAlumno[]
}

interface IState {
    status: boolean
    enrolamientos: IPublicAlumno[]
}

export default class TablaTutoriaAlumno extends Component<IProps, IState> {
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
                <tr key={'alumno-'+i.toString()}>
                    <td align='center'>{ alumno.course_id }</td>
                    <td className='pl-3'>{alumno.curso}</td>
                    <td align='center'>{ alumno.ultimo_acceso}</td>
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
                <table className='table table-bordered table-sm' style={{fontSize:'small'}}>
                    <thead className='bg-primary'>
                        <tr>
                            <th colSpan={8} className='p-3' align='center'>
                                {this.props.enrolamientos[0].batch_uid +' - '} 
                                {this.props.enrolamientos[0].alumno}
                            </th>
                        </tr>
                        <tr>
                            <td width='22%' align='center'>Zonal </td>
                            <td align='center'>Campus</td>
                            <td width='15%'align='center'>Fecha</td>
                            <td width='5%' align='center'> Clase</td>
                            <td width='8%' align='center'> Acad</td>
                            <td width='8%' align='center'> Pago</td>
                            <td width='5%' align='center'> Deuda</td>
                            <td width='5%' align='center'> Apto</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td align='center'>{ this.props.enrolamientos[0].zonal }</td>
                            <td align='center'>{this.props.enrolamientos[0].campus}</td>
                            <td align='center'>{ this.props.enrolamientos[0].fecha_acad }</td>
                            <td align='center'>{ this.props.enrolamientos[0].semestre }</td>
                            <td align='center'
                                className={this.props.enrolamientos[0].condicion_acad === 'Retirado' ?
                                'text-danger' :''}
                            >
                                {this.props.enrolamientos[0].condicion_acad}
                            </td>
                            <td align='center'>{this.props.enrolamientos[0].pago}</td>
                            <td align='center'>{this.props.enrolamientos[0].deuda}</td>
                            <td align='center'>
                                <AlertYesNo  status={ this.props.enrolamientos[0].apto}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className='table table-bordered table-striped table-sm table-responsive-sm' style={{fontSize:'small'}}>
                    <thead className='bg-primary'>
                        <tr>
                            <td align='center' width='22%'>Curso ID</td>
                            <td align='center'>Curso</td>
                            <td align='center' width='16%'><i className="far fa-clock"></i></td>
                            <td align='center' width='5%' title='Enrolado'><i className="far fa-book-user"></i></td>
                            <td align='center' width='5%' title='Visible'><i className="fas fa-chalkboard-teacher"></i></td>
                        </tr>
                    </thead>
                    <tbody>
                        { tbody}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
