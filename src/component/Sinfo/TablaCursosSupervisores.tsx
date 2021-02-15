import React, { Component, Fragment } from 'react'


import { IVSinfoMatricula } from '../../models/matricula.sinfo'
import { ISupervisores } from '../../models/zonal.sinfo'
import BBIndicadorSupervisor from '../alert/BBIndicadorSupervisor'

interface IState{
  
}

interface IProps{
    matriculas: IVSinfoMatricula[]
    supervisores:ISupervisores[]
}
export default class TablaCursosSupervisores extends Component<IProps, IState> {
    render() {
        const body = this.props.matriculas.map((matr: IVSinfoMatricula, index: number) => 
            this.props.supervisores.filter(s => s.zonal === matr.czonal).map((sup: ISupervisores, i: number) => {
                return (
                    <tr key={sup.First + '-' + matr.id_curso + '-' + index + '-' + i}>
                        <td width='5%' align='center'
                        className={matr.calificable === 'N' ? 'bg-danger' : ''}    
                        >
                            {matr.calificable}
                        </td>
                        <td width='15%' align='center'>{matr.id_curso} </td>
                        <td width='20%' align='justify'>{ matr.curso} </td>
                        <td>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{matr.id_curso} externalID:{sup.name} Sup
                        </td>
                        <td width='5%' align='center'>
                            <BBIndicadorSupervisor  periodo={matr.periodo}
                                                    idCurso={matr.id_curso}
                                                    idAlumno={matr.id_alumno}
                        />
                        </td>
                    </tr>
                )
            })
        )

        return (
            <Fragment>
                <table className='table table-bordered table-striped' style={{fontSize:'xx-small'}}>
                    <thead>
                        <tr>
                            <td colSpan={5} align='center' className='bg-orange text-light'>
                                Enrolamiento Supervisores
                            </td>
                        </tr>
                        <tr>
                            <td align='center'>Calf.</td>
                            <td align='center'>Curso ID.</td>
                            <td align='center'>Curso</td>
                            <td align='center'></td>
                            <td align='center'></td>
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

