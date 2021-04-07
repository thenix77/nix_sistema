import React, { Component, Fragment } from 'react'
import { ScriptCrearCursos, ScriptPeriodoCursos, ScriptSupervisorCursos } from '../../lib/scripts'
import { IPublicCurso } from '../../models/public/cursos.model'
import { ISupervisores } from '../../models/public/supervisores'
import AlertYesNo from '../alert/AlertYesNo'

interface IProps{
    cursos:IPublicCurso[]
    supervisores: ISupervisores[]
}

interface IState{
    cursos:IPublicCurso[]
    supervisores: ISupervisores[]
}
export default class TablaApexCurso extends Component<IProps,IState> {
    constructor(props:IProps){
        super(props)

        this.state ={
            cursos:[],
            supervisores:[]
        }
    }
    
    componentDidMount(){
        this.setState({
            cursos:Object.assign(this.state.cursos, this.props.cursos),
            supervisores:Object.assign(this.state.supervisores, this.props.supervisores),
        })
    }

    render() {

        const body = this.state.cursos.map((curso:IPublicCurso, i:number)=>{
            return(
                <tr key={'curso-' + i}>
                    <td align='left'> 
                        { ScriptCrearCursos(curso) }
                    </td>
                    <td align='center'> {curso.course_id} </td>
                    <td align='center' title='matriculable'> 
                        <AlertYesNo status={curso.calificable} />
                    </td>
                    <td align='center' title='inscritos en sinfo'> {curso.matriculadosapex} </td>
                    <td align='center' title='curso creado'>
                        <AlertYesNo status={curso.cursocreado} />
                    </td>
                    <td align='center' title='incritos en Bb'> {curso.matriculadosbb} </td>
                </tr>
            )
        })

        const pbody = this.state.cursos.map((curso: IPublicCurso, i: number) => {
            return (
                <tr key={'periodo-' + i}>
                    <td align='left' >
                        {ScriptPeriodoCursos(curso)}
                    </td>
                    <td align='center'> {curso.course_id} </td>
                    <td colSpan={4}></td>
                </tr>
            )
        })

        const sbody = this.state.cursos.map((curso:IPublicCurso, i:number)=>
                this.state.supervisores
                                .filter((sup:ISupervisores)=> sup.zonal === curso.zonal)
                                .map((supervisor:ISupervisores, s:number)=>{
                    return(
                            <tr key={'sup-'+i + s}>
                                <td align='left'> 
                                    { ScriptSupervisorCursos(curso,supervisor) }
                                </td>
                                <td align='center'> {curso.course_id} </td>
                                <td colSpan={4}></td>
                            </tr>

                    )
                })
            )

        return (
            <Fragment>
                <table className='table table-bordered table-striped table-sm' style={{fontSize:'small'}}>
                    <thead className='bg-primary text-primary text-bold'>
                        <tr>
                            <td rowSpan={2} align='center'>Script - Clonar Curso</td>
                            <td rowSpan={2} align='center' width='20%'>IdCurso</td>
                            <td colSpan={2} align='center'>sinfo</td>
                            <td colSpan={2} align='center'>BB</td>
                        </tr>
                        <tr>
                            <td align='center' width='3%'><i className="far fa-book-user"></i></td>
                            <td align='center' width='3%'><i className="far fa-users-class"></i></td>
                            <td align='center' width='3%'><i className="fas fa-book" title='curso creado'></i></td>
                            <td align='center' width='3%'><i className="fad fa-users-class"></i></td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {body}
                        {pbody}
                        {sbody}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}
