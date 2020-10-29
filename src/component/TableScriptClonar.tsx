import React, { Component, Fragment } from 'react'
import { IVMatricula } from '../models/matricula.sinfo'

interface IProps {
    Lista:any
}

interface IState {

}

export default class TableScriptClonar extends Component<IProps, IState> {
    render(){
        return (
            <Fragment>
                <tr>
                    <td width='20%' align='center'>{this.props.Lista[0].cursoid}</td>
                    <td width='20%' align='center'>{this.props.Lista[0].patron}</td>
                    <td width='60%' align='left'>
                        CLONAR_POST-Curso $token $URL_sitio courseId:{this.props.Lista[0].patron} {this.props.Lista[0].cursoid}
                    </td>
            </tr>
            </Fragment>
        )
    }
}
