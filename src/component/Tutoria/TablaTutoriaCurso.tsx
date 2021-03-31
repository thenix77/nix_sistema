import React, { Component, Fragment } from 'react'
import { IPublicCurso } from '../../models/public/cursos.model'
import AlertYesNo from '../alert/AlertYesNo'

interface IProps{
    cursos:IPublicCurso[]
}

interface IState{
    
}

export default class TablaTutoriaCurso extends Component<IProps,IState> {
    
    render() {

        const body = this.props.cursos.map((curso:IPublicCurso, i:number)=>{
            return (
                <Fragment key={i}>
                    <tr >
                        <td align='center' className='align-middle' width='20%' rowSpan={2}
                            style={{ borderTopColor: '#0275d8',borderLeftColor:'#0275d8' , background:'#d6ebfa'}}>
                            {curso.listacruzada}
                        </td>
                        <td align='center' className='align-middle' rowSpan={2} width='25%'
                            style={{ borderTopColor: '#0275d8' , background:'#d6ebfa'}}>
                            {curso.zonal}
                        </td>
                        <td align='center' className='align-middle' rowSpan={2}
                            style={{ borderTopColor: '#0275d8' , background:'#d6ebfa'}}>
                            {curso.campus}
                        </td>
                        <td align='center' width='8%' className='bg-primary'>Max</td>
                        <td align='center' width='8%' className='bg-primary'>Apex</td>
                        <td align='center' width='8%' className='bg-primary'>BB</td>
                    </tr>
                    <tr style={{  background:'#d6ebfa'}}>
                        <td align='center'>{curso.capacidad_nrc}</td>
                        <td align='center'>{curso.matriculadosapex}</td>
                        <td align='center'  style={{ borderRightColor:'#0275d8' }}> {curso.matriculadosbb}</td>
                    </tr>
                    <tr>
                        <td align='center' className='align-middle' rowSpan={2}
                            style={{ borderBottomColor: '#0275d8',borderLeftColor:'#0275d8' }}>                            
                            {curso.course_id}
                        </td>
                        <td align='center' className='align-middle' rowSpan={2} colSpan={2}
                            style={{ borderBottomColor: '#0275d8' }}
                        >
                            {curso.curso}
                        </td>
                        <td align='center' width='8%' title='Parte Periodo' className='bg-primary'>
                            <i className="fal fa-hourglass-end"></i>
                        </td>
                        <td align='center' width='8%' title='Curso Calificable' className='bg-primary'>
                            <i className="fal fa-file-certificate"></i>
                        </td>
                        <td align='center' width='8%' title='Curso Creado' className='bg-primary'>
                            <i className="far fa-book"></i>
                        </td>
                    </tr>
                    <tr>
                        <td align='center' title='Parte Periodo' style={{ borderBottomColor: '#0275d8' }}>{curso.parte_periodo}</td>
                        <td align='center' title='Curso Calificable' style={{ borderBottomColor: '#0275d8' }}>
                            <AlertYesNo status={curso.calificable} />
                        </td>
                        <td align='center' title='Curso Creado' style={{ borderBottomColor: '#0275d8' , borderRightColor:'#0275d8'}}>
                            <AlertYesNo status={curso.cursocreado}/>
                        </td>
                    </tr>
                </Fragment>
                
            )
        })

        return (
            <Fragment>
                <table className='table table-bordered  table-sm' style={{fontSize:'small'}}>
                    {/* <thead className='bg-primary'>
                        <tr>
                            <td rowSpan={2} align='center' width='20%'>IdCurso</td>
                            <td rowSpan={2} align='center'>Curso</td>
                            <td rowSpan={2} align='center' width='25%'>zonal</td>
                            <td rowSpan={2} align='center' width='3%'>Max</td>
                            <td colSpan={2} align='center'>sinfo</td>
                            <td colSpan={2} align='center'>BB</td>
                        </tr>
                        <tr>
                            <td align='center' width='3%' title='curso Matriculable'><i className="far fa-book-user"></i></td>
                            <td align='center' width='3%'><i className="far fa-users-class"></i></td>
                            <td align='center' width='3%'><i className="fas fa-book" ></i></td>
                            <td align='center' width='3%'><i className="fad fa-users-class"></i></td>
                        </tr>
                        
        </thead>*/}
                    <tbody>
                        {body}
                    </tbody>
                </table>
                
            </Fragment>
        )
    }
}
