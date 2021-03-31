import React, { Component, Fragment } from 'react'
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
export default class TablaTutoriaEnrolamiento extends Component<IProps, IState> {
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
            <tr key={'alumno-' + i.toString()}
                className={ alumno.condicion_acad ==='Retirado' || alumno.deuda ==='Y' ? 'text-danger':''}
            >
                    <td align='center'>{alumno.nrc}</td>
                    <td align='center'>{ alumno.batch_uid }</td>
                    <td className='pl-3'>{alumno.alumno}</td>
                    <td align='center'>{alumno.ultimo_acceso}</td>
                    <td align='center'>{alumno.condicion_acad}</td>
                    <td align='center' title='deuda'>
                        <AlertXNo status={this.props.enrolamientos[0].deuda} />
                    </td>
                    <td align='center' title='Enrolado'>
                        <AlertYesNo status={ alumno.usuarioenrolado} />
                    </td>
                    <td align='center' title='visible'>
                         <AlertYesNo status={ alumno.usuariovisiblecurso} />
                    </td>
                    <td align='center' title='Lista Cruzada'>
                         { alumno.listacruzada.length > 0 ? 'Y': 'N' } 
                    </td>
                </tr>
            )
        })
        
        return (
            <Fragment>
               
                <table className='table table-bordered table-striped   table-sm table-responsive-sm' style={{fontSize:'small'}}>
                    <thead className='table-primary text-primary text-bold'>
                        <tr>
                            <td align='center' width='5%'>Nrc</td>
                            <td align='center' width='10%'>Curso ID</td>
                            <td align='center'>Curso</td>
                            <td align='center' width='16%'><i className="far fa-clock"></i></td>
                            <td align='center' width='8%'>Acad</td>
                            <td align='center' width='5%' title='deuda'>D</td>
                            <td align='center' width='5%' title='Enrolado'><i className="far fa-book-user"></i></td>
                            <td align='center' width='5%' title='Visible'><i className="fas fa-chalkboard-teacher"></i></td>
                            <td align='center' width='5%' title='Lista Cruzada'>LC</td>
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
