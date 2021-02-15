import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB, IVSEnrolamiento } from '../../models/enrolamiento'
import ApiJson from '../../ApiJson.json'
import { IBBCursos } from '../../models/bbCursos'
import BbIndicadorCursoCreado from '../alert/BbIndicadorCursoCreado'
import '../css/app.css'

interface IState{
    enrolamientoBB: IEnrolamientoBB[]
    status: boolean
    cursosBB: IBBCursos[]
}

interface IProps{
    enrolamiento:IVSEnrolamiento[]
}
export default class TablaCursosCrear extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {
            enrolamientoBB: [],
            cursosBB:[],
            status:false
        }
    }

    async componentDidMount() {
        this.setState({
            status:false
        })

        await  fetch(`${ApiJson.Api}/BB/Cursos/periodo/${this.props.enrolamiento[0].periodo}/${this.props.enrolamiento[0].id_curso}`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type':'Application/json',
                        'token':localStorage.getItem('token') || ''
                    }
                })
                .then((db)=> db.json())
                .then((data)=>{
                    this.setState({
                       cursosBB: data.data
                    })
                })
        
        this.setState({
            status:true
        })
        
    }

    render() {

        return (
            <Fragment>
                { this.state.status ?
                    <Fragment>
                        <table className='table table-bordered table-striped' style={{fontSize:'x-small'}}>
                            <thead>
                                <tr>
                                    <td colSpan={5} align='center' className='bg-cyan'>
                                        CLONACION DE CURSOS
                                    </td>
                                </tr>
                                <tr>
                                    <td align='center'>Calif.</td>
                                    <td align='center'>Curso ID</td>
                                    <td align='center'>Curso</td>
                                    <td align='center'>#script</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td align='center' width='5%'>
                                        {this.props.enrolamiento[0].calificable}
                                    </td>
                                    <td align='center' width='15%'>
                                        {this.props.enrolamiento[0].id_curso}
                                    </td>
                                    <td align='left' width='25%'>
                                        {this.props.enrolamiento[0].curso}
                                    </td>
                                    <td>
                                        {
                                            this.state.cursosBB.length === 0 ?
                                                <span>
                                                    CLONAR_POST-Curso $token $URL_sitio courseId:{this.props.enrolamiento[0].patron} {this.props.enrolamiento[0].id_curso}
                                                </span>
                                            :''
                                        }
                                        
                                    </td>
                                    <td align='center' width='5%'>
                                        <BbIndicadorCursoCreado cursos={this.state.cursosBB} />
                                    </td>
                                </tr>
                                <tr>
                                    <td align='center' width='5%'>
                                        {this.props.enrolamiento[0].calificable}
                                    </td>
                                    <td align='center' width='15%'>
                                        {this.props.enrolamiento[0].id_curso}
                                    </td>
                                    <td align='left' width='25%'>
                                        {this.props.enrolamiento[0].curso}
                                    </td>
                                    <td>
                                        {
                                            this.state.cursosBB.length === 0 ?
                                                <span>
                                                    CURSO_PATCH-Periodo $token $URL_sitio courseId:{this.props.enrolamiento[0].id_curso} externalId:{this.props.enrolamiento[0].periodo}
                                                </span>
                                            :''
                                        }
                                        
                                    </td>
                                    <td align='center' width='5%'>
                                        <BbIndicadorCursoCreado cursos={this.state.cursosBB} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Fragment>
                :
                    <div className='reload' >
                        <img src={'/dist/img/reload.gif'}  alt=""/>
                    </div>
                }
            </Fragment>
        )
    }
}
