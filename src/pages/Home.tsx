import React, { Component, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Content from '../component/Content'

interface IProps extends RouteComponentProps{

}

export default class Home extends Component<IProps,{}> {
    render() {
        return (
            <Fragment>
                <Content  {...this.props}/>
            </Fragment>
        )
    }
}
