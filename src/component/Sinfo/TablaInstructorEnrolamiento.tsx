import React, { Component, Fragment } from 'react'
import { IEnrolamientoBB, IVInstEnrolamiento } from '../../models/enrolamiento'
import ApiJson from '../../ApiJson.json'
import BBIndicadorInstructor from '../alert/BBIndicadorInstructor'
import BbIndicadorInstructorVisible from '../alert/BbIndicadorInstructorVisible'

interface IProps{
    enrolamiento:IVInstEnrolamiento[]
}

interface IState{
    status: boolean
    enrolamientoBB: IEnrolamientoBB[]
}

export default class TablaInstructorEnrolamiento extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)

        this.state = {
            status:false,
            enrolamientoBB:[]
        }
    }

    async componentDidMount() {
        this.setState({
            status:false
        })

        let url:string = `periodo/${this.props.enrolamiento[0].periodo}/curso/${this.props.enrolamiento[0].id_curso}/alumno/${this.props.enrolamiento[0].id_inst}`

        await  fetch(`${ApiJson.Api}/BB/Enrolamiento/${url}`,
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
                       enrolamientoBB: data.data
                    })
                })
        console.log(this.state.enrolamientoBB);
        this.setState({
            status:true
        })
    }
    render() {

        const body = this.props.enrolamiento.map((e: IVInstEnrolamiento,index:number) => {
            return (
                <tr key={e.id_inst +'-'+index}>
                    <td align='center'>
                        {e.id_inst}
                    </td>
                    <td>
                        {e.instructor}
                    </td>
                    <td align='center'>
                        {e.id_curso}
                    </td>
                    <td>
                        {e.curso}
                    </td>
                    <td align='center'>
                        {e.inicio} - {e.fin}
                    </td> 
                    <td>
                        {
                            e.activo === 'Y' && this.state.enrolamientoBB.length === 0 ?
                                <span>
                                     ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{e.id_curso} externalId:{e.id_inst} BB_FACILITATOR
                                </span>
                            :
                                ''    
                        }
                        {
                            e.activo === 'Y' && this.state.enrolamientoBB
                                                        .filter((e:IEnrolamientoBB)=> e.usuariovisible === 'N')    
                                                        .length > 0 ?
                                <span>
                                     ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{e.id_curso} externalId:{e.id_inst} Yes
                                </span>
                            :
                                ''    
                        }
                        {
                            e.activo === 'N' && this.state.enrolamientoBB
                                                        .filter((e:IEnrolamientoBB)=> e.usuariovisible === 'Y')    
                                                        .length > 0 ?
                                <span>
                                     ENROLAMIENTO_PATCH-Visibilidad $token $URL_sitio courseId:{e.id_curso} externalId:{e.id_inst} No
                                </span>
                            :
                                ''    
                        }
                       
                    </td>
                    <td>
                        {
                            e.activo === 'Y' ?
                                <span className='text-success'>✓</span>
                            :
                                <span className='text-danger'>x</span>
                        }
                    </td>
                    <td>
                        <BBIndicadorInstructor enrolamientoBB={this.state.enrolamientoBB
                                                                    .filter((i:IEnrolamientoBB)=> e.id_inst === i.batch_uid)
                        } />
                    </td>
                    <td>
                        <BbIndicadorInstructorVisible enrolamientoBB={this.state.enrolamientoBB
                                                                    .filter((i:IEnrolamientoBB)=> e.id_inst === i.batch_uid)
                        } />
                    </td>
                </tr>
            )
        })

        return (

            <Fragment>
                { this.state.status ?
                    <Fragment>
                        <table className='table table-bordered table-striped' style={{ fontSize: 'xx-small' }}>
                            <thead className='table-success'>
                                <tr>
                                    <td rowSpan={2} align='center' width='5%'>IdInstructor</td>
                                    <td rowSpan={2} align='center' width='15%'>Instructor</td>
                                    <td rowSpan={2} align='center' width='12%'>IDcurso</td>
                                    <td rowSpan={2} align='center' width='15%'>Curso</td>
                                    <td rowSpan={2} align='center' width='10%'>Fecha</td>
                                    <td rowSpan={2} align='center' >#Script</td>
                                    <td rowSpan={2} align='center' width='3%' title='Activo'>A</td>
                                    <td colSpan={2} align='center' >BB</td>
                                </tr>
                                <tr>
                                    <td align='center' width='3%' title='enrolado'><i className="fas fa-chalkboard-teacher"></i></td>
                                    <td align='center' width='3%' title='visible'><i className="fas fa-users-class"></i></td>
                                </tr>
                            </thead>
                            <tbody>
                                {body}
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
