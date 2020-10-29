import React, { Component, Fragment } from 'react'

interface IProps {
    Lista: any
}

interface IState{}

export default class TablaScriptInstructor extends Component<IProps,IState> {
    render() {
        return (
            <Fragment>
                {this.props.Lista[0].instructor !== '' ?
                    <tr>
                        <td width='20%' align='center'>{this.props.Lista[0].cursoid}</td>
                        <td width='20%' align='center'>{this.props.Lista[0].instructor}</td>
                        <td width='60%' align='left'>
                            ENROLAMIENTO_PUT-crear $token $URL_sitio courseId:{this.props.Lista[0].cursoid} externalId:{this.props.Lista[0].id_inst} BB_FACILITATOR
                        </td>
                    </tr>
                    :
                    <></>
                }
            </Fragment>
        )
    }
}
