import React, { Component } from 'react'
import { IBBCursosMatriculados, IVMatricula } from '../models/matricula.sinfo'


interface IProps {
    Matriculados: IVMatricula[]
    BBMatriculados:IBBCursosMatriculados[]
}

interface IState {}

export default class TablaComandoAlumno extends Component<IProps,IState> {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
